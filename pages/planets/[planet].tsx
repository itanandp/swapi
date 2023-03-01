import Links from '@/src/components/Links';
import { IParsedPlanet, IParsedUrl, IPlanet } from '@/src/types';
import { fetchAll, parsePlanet } from '@/src/utils';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IProps {
  planet: IParsedPlanet;
}

const PlanetPage: NextPage<IProps> = ({ planet }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4">{planet.name}</h1>
      <p>Diameter: {planet.diameter}</p>
      <p>Rotation period: {planet.rotation_period}</p>
      <p>Orbital period: {planet.orbital_period}</p>
      <p>Gravity: {planet.gravity}</p>
      <p>Population: {planet.population}</p>
      <p>Climate: {planet.climate}</p>
      <p>Terrain: {planet.terrain}</p>
      <p>Surface Water: {planet.surface_water}</p>
      <Links links={planet.residents} />
      <Links links={planet.films} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchAll('planets')

  const paths = data.map((planet: IPlanet) => ({
    params: { planet: planet.url.split('/').slice(-2)[0] },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const toFetch = params?.planet;
  const res = await fetch(`https://swapi.dev/api/planets/${toFetch}`);
  const planet = await res.json();
  const parsedPlanet = await parsePlanet(planet)

  return { props: { planet: parsedPlanet } };
};

export default PlanetPage;
