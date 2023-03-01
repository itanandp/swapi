import Links from '@/src/components/Links'
import { IParsedPerson, IParsedUrl, IPerson } from '@/src/types'
import { fetchAll, parsePerson } from '@/src/utils'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
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
    <div className='container mx-auto mt-4'>
      <h1 className="text-4xl font-bold mb-4">{person.name}</h1>
      <p>Birth Year: {person.birth_year}</p>
      <p>Eye Color: {person.eye_color}</p>
      <p>Gender: {person.gender}</p>
      <p>Hair color: {person.hair_color}</p>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
      <p>Skin Color: {person.skin_color}</p>
      <p>Homeworld: <Link className="text-blue-500 hover:text-blue-700" href={person.homeworld.url}>{person.homeworld.name}</Link></p>
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
