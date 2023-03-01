import { IParsedPerson, IParsedPlanet, IPerson, IPlanet } from "./types"

const parseLink = async (link: string) => {
    const data = await fetch(link).then((res) => res.json())
    const parts = link.split('https://swapi.dev/api')

    const name = data.name || data.title
    const url = parts[1]

    return ({ name, url })
}

const parseLinks = async (links: string[]) => {
    const promises = links.map((link) => parseLink(link))
    const data = await Promise.all(promises)

    return data
}

export const parsePlanet = async (planet: IPlanet): Promise<IParsedPlanet> => {
    const films = await parseLinks(planet.films)
    const residents = await parseLinks(planet.residents)

    return {
        ...planet,
        films,
        residents
    }
}

export const parsePerson = async (person: IPerson): Promise<IParsedPerson> => {
    const homeworld = await parseLink(person.homeworld)
    const films = await parseLinks(person.films)
    const species = await parseLinks(person.species)
    const vehicles = await parseLinks(person.vehicles)
    const starships = await parseLinks(person.starships)

    return {
        ...person,
        homeworld,
        films,
        species,
        vehicles,
        starships
    }
}

export const fetchAll = async (type: string) => {
  let planets: any = []
  let url = `https://swapi.dev/api/${type}/`

  while (url) {
    const res = await fetch(url).then((res) => res.json())
    planets = planets.concat(res.results)
    url = res.next
  }
  return planets
}