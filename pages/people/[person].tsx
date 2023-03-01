import FormattedLink from '@/src/components/FormattedLink'
import Links from '@/src/components/Links'
import { IParsedPerson, IPerson } from '@/src/types'
import { fetchAll, parsePerson } from '@/src/utils'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

interface IProps {
  person: IParsedPerson;
}

const PersonPage: NextPage<IProps> = ({ person }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className='container mx-auto px-2 mt-4'>
      <NextSeo 
        title={person.name}
        description={person.name}
      />
      <h1 className="text-4xl font-bold mb-4">{person.name}</h1>
      <p>Birth Year: {person.birth_year}</p>
      <p>Eye Color: {person.eye_color}</p>
      <p>Gender: {person.gender}</p>
      <p>Hair color: {person.hair_color}</p>
      <p>Height: {person.height} cm</p>
      <p>Mass: {person.mass} kg</p>
      <p>Skin Color: {person.skin_color}</p>
      <p>Homeworld: <FormattedLink name={person.homeworld.name} url={person.homeworld.url}/></p>
      <p>Films: <Links links={person.films} /></p>
      <p>Species: <Links links={person.species} /></p>
      <p>Vehicles: <Links links={person.vehicles} /></p>
      <p>Starships: <Links links={person.starships} /></p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchAll('people')

  const paths = data.map((person: IPerson) => ({
    params: { person: person.url.split('/').slice(-2)[0] },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const toFetch = params?.person
  const res = await fetch(`https://swapi.dev/api/people/${toFetch}`)
  const person = await res.json()
  const parsedPerson = await parsePerson(person)

  return { props: { person: parsedPerson } }
}

export default PersonPage
