import { IPlanet } from '@/src/types'
import { fetchAll } from '@/src/utils'
import { NextPage } from 'next'
import Link from 'next/link'

interface IPage {
  planets: IPlanet[];
}

export const getStaticProps = async () => {
  const planets = await fetchAll('planets')
  return { props: { planets } }
}

const Home: NextPage<IPage> = ({ planets }) => {
  if (!planets) return <div>Loading...</div>

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-4xl font-bold text-yellow-400 mb-10">Planets of Star Wars</h1>
      <ul>
        {planets.map((planet: IPlanet) => (
          <li key={planet.url}>
            <div>
              <Link className="text-blue-500 hover:text-blue-700" href={`${planet.url.split('https://swapi.dev/api')[1]}`}>{planet.name}</Link>
            </div>         
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
