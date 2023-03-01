import Links from '@/src/components/Links'
import { IParsedPerson, IParsedUrl, IPerson } from '@/src/types'
import { fetchAll, parsePerson } from '@/src/utils'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface IProps {
  person: IParsedPerson;
}

const renderLinks = (links: IParsedUrl[]) => {
  const components = links.map((link: IParsedUrl) => {
    return (
      <p key={link.url}>
        <Link href={link.url}>{link.name}</Link>
      </p>
    )
  })

  return components
}


const PersonPage: NextPage<IProps> = ({ person }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{person.name}</h1>
      <p>Birth Year: {person.birth_year}</p>
      <p>Eye Color: {person.eye_color}</p>
      <p>Gender: {person.gender}</p>
      <p>Hair color: {person.hair_color}</p>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
      <p>Skin Color: {person.skin_color}</p>
      <Link href={person.homeworld.url}>{person.homeworld.name}</Link>
      <Links links={person.films} />
      {renderLinks(person.species)}
      {renderLinks(person.vehicles)}
      {renderLinks(person.starships)}
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
