import { IFilm, IParsedFilm, IParsedPerson, IParsedPlanet, IParsedSpecies, IParsedStarship, IParsedVehicle, IPerson, IPlanet, ISpecies, IStarship, IVehicle } from "./types"

const parseLink = async (link: string) => {
  if (!link) return ({ name: 'n/a', url: '/' })
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

const parseNumber = (number: string) => {
  if (number === 'unknown') return 'n/a'
  return Number(number).toLocaleString()
}

export const parsePlanet = async (planet: IPlanet): Promise<IParsedPlanet> => {
  const films = await parseLinks(planet.films)
  const residents = await parseLinks(planet.residents)
  const diameter = parseNumber(planet.diameter)
  const population = parseNumber(planet.population)

  return {
    ...planet,
    films,
    residents,
    diameter,
    population
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

export const parseSpecies = async (species: ISpecies): Promise<IParsedSpecies> => {
  const homeworld = await parseLink(species.homeworld)
  const films = await parseLinks(species.films)
  const people = await parseLinks(species.people)
        
  return {
    ...species,
    homeworld,
    films,
    people
  }
}

export const parseVehicle = async (vehicle: IVehicle): Promise<IParsedVehicle> => {
  const films = await parseLinks(vehicle.films)
  const pilots = await parseLinks(vehicle.pilots)
  const cost_in_credits = parseNumber(vehicle.cost_in_credits)
  const cargo_capacity = parseNumber(vehicle.cargo_capacity)
  const max_atmosphering_speed = parseNumber(vehicle.max_atmosphering_speed)

  return {
    ...vehicle,
    films,
    pilots,
    cost_in_credits,
    cargo_capacity,
    max_atmosphering_speed
  }
}

export const parseStarship = async (starship: IStarship): Promise<IParsedStarship> => {
  const films = await parseLinks(starship.films)
  const pilots = await parseLinks(starship.pilots)
  const cost_in_credits = parseNumber(starship.cost_in_credits)
  const cargo_capacity = parseNumber(starship.cargo_capacity)
  const max_atmosphering_speed = parseNumber(starship.max_atmosphering_speed)

  return {
    ...starship,
    films,
    pilots,
    cost_in_credits,
    cargo_capacity,
    max_atmosphering_speed
  }
}

export const parseFilm = async (film: IFilm): Promise<IParsedFilm> => {
  const characters = await parseLinks(film.characters)
  const planets = await parseLinks(film.planets)
  const species = await parseLinks(film.species)
  const starships = await parseLinks(film.starships)
  const vehicles = await parseLinks(film.vehicles)

  return {
    ...film,
    characters,
    planets,
    species,
    starships,
    vehicles
  }
}

export const fetchAll = async (type: string) => {
  let items: any = []
  let url = `https://swapi.dev/api/${type}/`

  while (url) {
    const res = await fetch(url).then((res) => res.json())
    items = items.concat(res.results)
    url = res.next
  }
  return items
}