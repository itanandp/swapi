import Link from "next/link"
import { IParsedPlanet } from "../types"
import { parseNumber } from "../utils"
import { parsePercent } from "../utils"

export default function Table({ planets, columns }: any) {
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
        <thead>
          <tr>
            {columns.map((column: any) => (
              <th
                key={column}
                className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-100"
              >
                {column}
              </th>    
            ))
            }
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {planets.map((planet: IParsedPlanet) => {
            const localUrl = planet.url.split('https://swapi.dev/api')[1]
            return (
              <tr key={planet.name}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-100">
                  <Link className="text-blue-500 hover:text-blue-700" href={localUrl}>{planet.name}</Link>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-200">{parseNumber(planet.population)}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-200">{parseNumber(planet.diameter)}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-200">{parsePercent(planet.surface_water)}</td>
                <td className="whitespace-nowrap px-4 py-2">
                  <Link
                    href={localUrl}
                    className="inline-block rounded bg-gray-600 px-4 py-2 text-xs font-medium text-white hover:bg-gray-700"
                  >
                  View
                  </Link>
                </td>
              </tr> 
            )})
          }                   
        </tbody>
      </table>
    </div>

  )
}