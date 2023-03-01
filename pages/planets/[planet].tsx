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
    <div className="container mx-auto px-2 mt-4">
      <NextSeo
        title={planet.name}
        description={planet.name}
      />
      <h1 className="text-4xl font-bold mb-4">{planet.name}</h1>
      <p>Diameter: {planet.diameter} km</p>
      <p>Rotation period: {planet.rotation_period} std. hours</p>
      <p>Orbital period: {planet.orbital_period} std. days</p>
      <p>Gravity: {planet.gravity} Gs</p>
      <p>Population: {planet.population} sentient lifeforms</p>
      <p>Climate: {planet.climate}</p>
      <p>Terrain: {planet.terrain}</p>
      <p>Surface Water: {planet.surface_water}%</p>
      <p>Residents: <Links links={planet.residents} /></p>
      <p>Films: <Links links={planet.films} /></p>
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
