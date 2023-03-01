import { NextPage } from 'next';
import Link from 'next/link';

interface IPlanet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
}

interface IPage {
  planets: IPlanet[];
}

const fetchAllPlanets = async () => {
  let planets: any = [];
  let url = 'https://swapi.dev/api/planets';

  while (url) {
    const res = await fetch(url).then((res) => res.json());
    planets = planets.concat(res.results);
    url = res.next;
  }
  return planets
};

export const getStaticProps = async () => {
  const planets = await fetchAllPlanets()
  return { props: { planets } }
}

const Home: NextPage<IPage> = ({ planets }) => {
  if (!planets) return <div>Loading...</div>;

  return (
    <div className="container mx-auto">
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
  );
};

export default Home;
