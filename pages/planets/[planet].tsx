import Links from '@/src/components/Links'
import { IParsedPlanet, IPlanet } from '@/src/types'
import { fetchAll, parsePlanet } from '@/src/utils'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

interface IProps {
  planet: IParsedPlanet;
}

const PlanetPage: NextPage<IProps> = ({ planet }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-2 mt-4 text-white">
      <NextSeo
        title={planet.name}
        description={planet.name}
      />
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">{planet.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
        <div className="bg-gray-800 rounded-lg shadow-lg p-4">
          <p className="font-bold text-lg mb-2">General Information</p>
          <ul className="list-disc list-inside">
            <li>Diameter: {planet.diameter} km</li>
            <li>Rotation period: {planet.rotation_period} std. hours</li>
            <li>Orbital period: {planet.orbital_period} std. days</li>
            <li>Gravity: {planet.gravity} Gs</li>
            <li>Population: {planet.population} sentient lifeforms</li>
            <li>Climate: {planet.climate}</li>
            <li>Terrain: {planet.terrain}</li>
            <li>Surface Water: {planet.surface_water}</li>
          </ul>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg p-4">
          <p className="font-bold text-lg mb-2">Related Information</p>
          <div className="list-disc list-inside">
            <div>Residents: <Links links={planet.residents} /></div>
            <div>Films: <Links links={planet.films} /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchAll('planets')

  const paths = data.map((planet: IPlanet) => ({
    params: { planet: planet.url.split('/').slice(-2)[0] },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const toFetch = params?.planet
  const res = await fetch(`https://swapi.dev/api/planets/${toFetch}`)
  const planet = await res.json()
  const parsedPlanet = await parsePlanet(planet)

  return { props: { planet: parsedPlanet } }
}

export default PlanetPage
