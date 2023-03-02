import FormattedLink from '@/src/components/FormattedLink'
import Links from '@/src/components/Links'
import { IParsedSpecies, ISpecies } from '@/src/types'
import { fetchAll, parseSpecies } from '@/src/utils'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

interface IProps {
  species: IParsedSpecies;
}

const SpeciesPage: NextPage<IProps> = ({ species }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className='container mx-auto px-2 mt-4'>
      <NextSeo
        title={species.name}
        description={species.name}
      />
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">{species.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
        <div className="bg-gray-800 rounded-lg shadow-lg p-4">
          <p className="font-bold text-lg mb-2">General Information</p>
          <ul className="list-disc list-inside">
            <li>Classification: {species.classification}</li>
            <li>Designation: {species.designation}</li>
            <li>Average Height: {species.average_height} cm</li>
            <li>Average Lifespan: {species.average_lifespan} std. years</li>
            <li>Eye Colors: {species.eye_colors}</li>
            <li>Hair Colors: {species.hair_colors}</li>
            <li>Skin Colors: {species.skin_colors}</li>
            <li>Language: {species.language}</li>
          </ul>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg p-4">
          <p className="font-bold text-lg mb-2">Related Information</p>
          <div className="list-disc list-inside">
            <div>Homeworld: <FormattedLink url={species.homeworld.url} name={species.homeworld.name} /></div>
            <div>People: <Links links={species.people} /></div>
            <div>Films: <Links links={species.films} /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchAll('species')

  const paths = data.map((species: ISpecies) => ({
    params: { species: species.url.split('/').slice(-2)[0] },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const toFetch = params?.species
  const res = await fetch(`https://swapi.dev/api/species/${toFetch}`)
  const species = await res.json()
  const parsedSpecies = await parseSpecies(species)

  return { props: { species: parsedSpecies } }
}

export default SpeciesPage
