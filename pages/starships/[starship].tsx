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
    <div className="container mx-auto px-2 mt-4 text-white">
      <NextSeo
        title={starship.name}
        description={starship.name}
      />
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">{starship.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
        <div className="bg-gray-800 rounded-lg shadow-lg p-4">
          <p className="font-bold text-lg mb-2">General Information</p>
          <ul className="list-disc list-inside">
            <li>Model: {starship.model}</li>
            <li>Starship Class: {starship.starship_class}</li>
            <li>Manufacturer: {starship.manufacturer}</li>
            <li>Cost in Credits: {starship.cost_in_credits} Galactic Credits</li>
            <li>Length: {starship.length} meters</li>
            <li>Crew: {starship.crew}</li>
            <li>Passengers: {starship.passengers}</li>
            <li>Max Atmosphering Speed: {starship.max_atmosphering_speed} km/hour</li>
            <li>Hyperdrive Rating: {starship.hyperdrive_rating} class</li>
            <li>MGLT: {starship.MGLT} megalights/hour</li>
            <li>Cargo Capacity: {starship.cargo_capacity} kg</li>
            <li>Consumables: {starship.consumables}</li>
          </ul>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg p-4">
          <p className="font-bold text-lg mb-2">Related Information</p>
          <div className="list-disc list-inside">
            <div>Pilots: <Links links={starship.pilots} /></div>
            <div>Films: <Links links={starship.films} /></div>
          </div>
        </div>
      </div>
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
