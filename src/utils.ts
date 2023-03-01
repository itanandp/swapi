export const parseLink = async (link: string) => {
    const data = await fetch(link).then((res) => res.json());
    const parts = link.split('https://swapi.dev/api');

    const name = data.name || data.title;
    const url = parts[1]

    return ({ name, url })
}

export const parseLinks = async (links: string[]) => {
    const promises = links.map((link) => parseLink(link));
    const data = await Promise.all(promises);

    return data;
}

export const parsePlanet = async (planet: any) => {
    const films = await parseLinks(planet.films);
    const residents = await parseLinks(planet.residents);

    return {
        ...planet,
        films,
        residents
    }
}