import Links from '@/src/components/Links'
import { IParsedPerson, IParsedStarship, IParsedUrl, IPerson, IStarship } from '@/src/types'
import { fetchAll, parsePerson, parseStarship } from '@/src/utils'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface IProps {
  starship: IParsedStarship;
}

const StarshipPage: NextPage<IProps> = ({ starship }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className='container mx-auto mt-4'>
      <h1 className="text-4xl font-bold mb-4">{starship.name}</h1>
        <p>Model: {starship.model}</p>
        <p>Starship Class: {starship.starship_class}</p>
        <p>Manufacturer: {starship.manufacturer}</p>
        <p>Cost in Credits: {starship.cost_in_credits}</p>
        <p>Length: {starship.length}</p>
        <p>Crew: {starship.crew}</p>
        <p>Passengers: {starship.passengers}</p>
        <p>Max Atmosphering Speed: {starship.max_atmosphering_speed}</p>
        <p>Hyperdrive Rating: {starship.hyperdrive_rating}</p>
        <p>MGLT: {starship.MGLT}</p>
        <p>Cargo Capacity: {starship.cargo_capacity}</p>
        <p>Consumables: {starship.consumables}</p>
        <p>Pilots: <Links links={starship.pilots} /></p>
        <p>Films: <Links links={starship.films} /></p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchAll('starships')

  const paths = data.map((starship: IStarship) => ({
    params: { starship: starship.url.split('/').slice(-2)[0] },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const toFetch = params?.starship
  const res = await fetch(`https://swapi.dev/api/starships/${toFetch}`)
  const starship = await res.json()
  const parsedStarship = await parseStarship(starship)

  return { props: { starship: parsedStarship } }
}

export default StarshipPage
