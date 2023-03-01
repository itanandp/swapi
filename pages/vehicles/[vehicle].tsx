import Links from '@/src/components/Links'
import { IParsedPlanet, IParsedSpecies, IParsedVehicle, IPlanet, ISpecies, IVehicle } from '@/src/types'
import { fetchAll, parsePlanet, parseSpecies, parseVehicle } from '@/src/utils'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface IProps {
  vehicle: IParsedVehicle;
}

const VehiclePage: NextPage<IProps> = ({ vehicle }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div>
        <h1 className="text-4xl font-bold mb-4">{vehicle.name}</h1>
        <p>Model: {vehicle.model}</p>
        <p>Vehicle Class: {vehicle.vehicle_class}</p>
        <p>Manufacturer: {vehicle.manufacturer}</p>
        <p>Length: {vehicle.length}</p>
        <p>Cost in Credits: {vehicle.cost_in_credits}</p>
        <p>Crew: {vehicle.crew}</p>
        <p>Passengers: {vehicle.passengers}</p>
        <p>Max Atmosphering Speed: {vehicle.max_atmosphering_speed}</p>
        <p>Cargo Capacity: {vehicle.cargo_capacity}</p>
        <p>Consumables: {vehicle.consumables}</p>
        <p>Pilots: <Links links={vehicle.pilots} /></p>
        <p>Films: <Links links={vehicle.films} /></p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchAll('vehicles')

  const paths = data.map((vehicle: IVehicle) => ({
    params: { vehicle: vehicle.url.split('/').slice(-2)[0] },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const toFetch = params?.vehicle
  const res = await fetch(`https://swapi.dev/api/vehicles/${toFetch}`)
  const vehicle = await res.json()
    const parsedVehicle = await parseVehicle(vehicle)

  return { props: { vehicle: parsedVehicle } }
}

export default VehiclePage
