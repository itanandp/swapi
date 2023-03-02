import Links from '@/src/components/Links'
import { IParsedVehicle, IVehicle } from '@/src/types'
import { fetchAll, parseVehicle } from '@/src/utils'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
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
    <div className="container mx-auto px-2 mt-4 text-white">
      <NextSeo
        title={vehicle.name}
        description={vehicle.name}
      />
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">{vehicle.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
        <div className="bg-gray-800 rounded-lg shadow-lg p-4">
          <p className="font-bold text-lg mb-2">General Information</p>
          <ul className="list-disc list-inside">
            <li>Model: {vehicle.model}</li>
            <li>Vehicle Class: {vehicle.vehicle_class}</li>
            <li>Manufacturer: {vehicle.manufacturer}</li>
            <li>Length: {vehicle.length} meters</li>
            <li>Cost in Credits: {vehicle.cost_in_credits} Galactic Credits</li>
            <li>Crew: {vehicle.crew}</li>
            <li>Passengers: {vehicle.passengers}</li>
            <li>Max Atmosphering Speed: {vehicle.max_atmosphering_speed} km/hour</li>
            <li>Cargo Capacity: {vehicle.cargo_capacity} kg</li>
            <li>Consumables: {vehicle.consumables}</li>
          </ul>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg p-4">
          <p className="font-bold text-lg mb-2">Related Information</p>
          <div className="list-disc list-inside">
            <div>Pilots: <Links links={vehicle.pilots} /></div>
            <div>Films: <Links links={vehicle.films} /></div>
          </div>
        </div>
      </div>
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
