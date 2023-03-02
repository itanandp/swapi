import Links from '@/src/components/Links'
import { IFilm, IParsedFilm } from '@/src/types'
import { fetchAll, parseFilm } from '@/src/utils'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

interface IProps {
  film: IParsedFilm;
}

const FilmPage: NextPage<IProps> = ({ film }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-2 mt-4 text-white">
      <NextSeo
        title={film.title}
        description={film.opening_crawl}
      />
      <div className="p-4 mb-4">
        <h1 className="text-4xl font-bold text-yellow-400 mb-2">{film.title}</h1>
        <p className='italic text-yellow-400'>{film.opening_crawl}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
        <div className="bg-gray-800 rounded-lg shadow-lg p-4">
          <p className="font-bold text-lg mb-2">General Information</p>
          <ul className="list-disc list-inside">
            <li>Episode ID: {film.episode_id}</li>
            <li>Director: {film.director}</li>
            <li>Producer: {film.producer}</li>
            <li>Release Date: {film.release_date}</li>
          </ul>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg p-4">
          <p className="font-bold text-lg mb-2">Related Information</p>
          <div className="list-disc list-inside">
            <div>Characters: <Links links={film.characters} /></div>
            <div>Planets: <Links links={film.planets} /></div>
            <div>Starships: <Links links={film.starships} /></div>
            <div>Vehicles: <Links links={film.vehicles} /></div>
            <div>Species: <Links links={film.species} /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchAll('films')

  const paths = data.map((film: IFilm) => ({
    params: { film: film.url.split('/').slice(-2)[0] },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const toFetch = params?.film
  const res = await fetch(`https://swapi.dev/api/films/${toFetch}`)
  const film = await res.json()
  const parsedFilm = await parseFilm(film)

  return { props: { film: parsedFilm } }
}

export default FilmPage
