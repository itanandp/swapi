import SwapiLink from '@/src/components/SwapiLink';
import { parseLink, parseLinks, parsePlanet } from '@/src/utils';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

interface IPlanet {
  name: string;
  climate: string;
  population: string;
  residents: string[];
}

interface IProps {
  planet: IPlanet;
}

const PlanetPage: NextPage<IProps> = ({ planet }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4">{planet.name}</h1>
      <p>Climate: {planet.climate}</p>
      <p>Population: {planet.population}</p>
      {planet.residents.map((r: string) => (
        <SwapiLink url={r} key={r}/>
      ))}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://swapi.dev/api/planets');
  const data = await res.json();

  const paths = data.results.map((planet: any) => ({
    params: { planet: planet.url.split('/').slice(-2)[0] },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const toFetch = params?.planet;
  const res = await fetch(`https://swapi.dev/api/planets/${toFetch}`);
  const planet = await res.json();

  console.log(await parsePlanet(planet))


  return { props: { planet } };
};

export default PlanetPage;
