import Links from '@/src/components/Links'
import { IParsedStarship, IStarship } from '@/src/types'
import { fetchAll, parseStarship } from '@/src/utils'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
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
    <div className='container mx-auto px-2 mt-4'>
      <NextSeo
        title={starship.name}
        description={starship.name}
      />
      <h1 className="text-4xl font-bold mb-4">{starship.name}</h1>
      <p>Model: {starship.model}</p>
      <p>Starship Class: {starship.starship_class}</p>
      <p>Manufacturer: {starship.manufacturer}</p>
      <p>Cost in Credits: {starship.cost_in_credits} Galactic Credits</p>
      <p>Length: {starship.length} meters</p>
      <p>Crew: {starship.crew}</p>
      <p>Passengers: {starship.passengers}</p>
      <p>Max Atmosphering Speed: {starship.max_atmosphering_speed} km/hour</p>
      <p>Hyperdrive Rating: {starship.hyperdrive_rating} class</p>
      <p>MGLT: {starship.MGLT} megalights/hour</p>
      <p>Cargo Capacity: {starship.cargo_capacity} kg</p>
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
