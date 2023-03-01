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
      <h1 className="text-4xl font-bold mb-4">{species.name}</h1>
      <p>Classification: {species.classification}</p>
      <p>Designation: {species.designation}</p>
      <p>Average Height: {species.average_height} cm</p>
      <p>Average Lifespan: {species.average_lifespan} std. years</p>
      <p>Eye Colors: {species.eye_colors}</p>
      <p>Hair Colors: {species.hair_colors}</p>
      <p>Skin Colors: {species.skin_colors}</p>
      <p>Language: {species.language}</p>
      <p>Homeworld: <FormattedLink url={species.homeworld.url} name={species.homeworld.name} /></p>
      <p>People: <Links links={species.people} /></p>
      <p>Films: <Links links={species.films} /></p>
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
