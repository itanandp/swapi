export interface IParsedUrl {
    name: string;
    url: string;
}

export interface IPlanet {
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

export interface IParsedPlanet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: IParsedUrl[];
    films: IParsedUrl[];
    created: string;
    edited: string;
    url: string;
}

export interface IPerson {
    name: string;
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    mass: string;
    skin_color: string;
    homeworld: string;
    films: string[];
    species: string[];
    starships: string[];
    vehicles: string[];
    url: string;
    created: string;
    edited: string;
}

export interface IParsedPerson {
    name: string;
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    mass: string;
    skin_color: string;
    homeworld: IParsedUrl;
    films: IParsedUrl[];
    species: IParsedUrl[];
    starships: IParsedUrl[];
    vehicles: IParsedUrl[];
    url: string;
    created: string;
    edited: string;
}

export interface ISpecies {
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    average_lifespan: string;
    eye_colors: string;
    hair_colors: string;
    skin_colors: string;
    language: string;
    homeworld: string;
    people: string[];
    films: string[];
    url: string;
    created: string;
    edited: string;
}
export interface IParsedSpecies {
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    average_lifespan: string;
    eye_colors: string;
    hair_colors: string;
    skin_colors: string;
    language: string;
    homeworld: IParsedUrl;
    people: IParsedUrl[];
    films: IParsedUrl[];
    url: string;
    created: string;
    edited: string;
}


export interface IVehicle {
    name: string;
    model: string;
    vehicle_class: string;
    manufacturer: string;
    length: string;
    cost_in_credits: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    cargo_capacity: string;
    consumables?: string;
    films: string[];
    pilots: string[];
    url: string;
    created: string;
    edited: string;
  }

export interface IParsedVehicle {
    name: string;
    model: string;
    vehicle_class: string;
    manufacturer: string;
    length: string;
    cost_in_credits: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    cargo_capacity: string;
    consumables?: string;
    films: IParsedUrl[];
    pilots: IParsedUrl[];
    url: string;
    created: string;
    edited: string;
  }
  
  export interface IStarship {
    name: string;
    model: string;
    starship_class: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    hyperdrive_rating: string;
    MGLT: string;
    cargo_capacity: string;
    consumables?: string;
    films: string[];
    pilots: string[];
    url: string;
    created: string;
    edited: string;
  }
  export interface IParsedStarship {
    name: string;
    model: string;
    starship_class: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    hyperdrive_rating: string;
    MGLT: string;
    cargo_capacity: string;
    consumables?: string;
    films: IParsedUrl[];
    pilots: IParsedUrl[];
    url: string;
    created: string;
    edited: string;
  }
  
  export interface IFilm {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    species: string[];
    starships: string[];
    vehicles: string[];
    characters: string[];
    planets: string[];
    url: string;
    created: string;
    edited: string;
  }
  export interface IParsedFilm {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    species: IParsedUrl[];
    starships: IParsedUrl[];
    vehicles: IParsedUrl[];
    characters: IParsedUrl[];
    planets: IParsedUrl[];
    url: string;
    created: string;
    edited: string;
  }
  