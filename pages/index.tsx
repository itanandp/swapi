import Table from '@/src/components/Table'
import { IPlanet } from '@/src/types'
import { fetchAll } from '@/src/utils'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

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
    <div className="container mx-auto px-2 mt-4">
      <NextSeo 
        title="Planets of Star Wars"
        description="A list of planets in the Star Wars universe"
      />
      <h1 className="text-4xl font-bold text-yellow-400 mb-10">Planets of Star Wars</h1>
      <Table columns={['Name', 'Population', 'Diameter', 'Surface Water']} planets={planets}/>
    </div>
  )
}

export default Home
