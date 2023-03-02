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
    <div className="container mx-auto px-2 mt-4 text-white">
      <NextSeo
        title={person.name}
        description={person.name}
      />
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">{person.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
        <div className="bg-gray-800 rounded-lg shadow-lg p-4">
          <p className="font-bold text-lg mb-2">General Information</p>
          <ul className="list-disc list-inside">
            <li>Birth Year: {person.birth_year}</li>
            <li>Eye Color: {person.eye_color}</li>
            <li>Gender: {person.gender}</li>
            <li>Hair color: {person.hair_color}</li>
            <li>Height: {person.height} cm</li>
            <li>Mass: {person.mass} kg</li>
            <li>Skin Color: {person.skin_color}</li>
          </ul>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg p-4">
          <p className="font-bold text-lg mb-2">Related Information</p>
          <div className="list-disc list-inside">
            <div>Homeworld: <FormattedLink name={person.homeworld.name} url={person.homeworld.url}/></div>
            <div>Films: <Links links={person.films} /></div>
            <div>Species: <Links links={person.species} /></div>
            <div>Vehicles: <Links links={person.vehicles} /></div>
            <div>Starships: <Links links={person.starships} /></div>
          </div>
        </div>
      </div>
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
