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
      <ul>
        {planets.map((planet: IPlanet) => (
          <li key={planet.url}>
            <Link href={`${planet.url.split('https://swapi.dev/api')[1]}`}>
              <p className="text-blue-500 hover:text-blue-700">{planet.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
