import Links from '@/src/components/Links'
import { IFilm, IParsedFilm, IParsedPerson, IParsedUrl, IPerson } from '@/src/types'
import { fetchAll, parseFilm, parsePerson } from '@/src/utils'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
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
    <div className='container mx-auto mt-4'>
      <h1 className="text-4xl font-bold mb-4">{film.title}</h1>
      <p>Episode ID: {film.episode_id}</p>
      <div>Opening Crawl: <p className='p-4 text-yellow-500 italic'>{film.opening_crawl}</p></div>
      <p>Director: {film.director}</p>
      <p>Producer: {film.producer}</p>
      <p>Release Date: {film.release_date}</p>
      <p>Characters: <Links links={film.characters} /></p>
      <p>Planets: <Links links={film.planets} /></p>
      <p>Starships: <Links links={film.starships} /></p>
      <p>Vehicles: <Links links={film.vehicles} /></p>
      <p>Species: <Links links={film.species} /></p>
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
