import Link from "next/link"
import { IParsedUrl } from "../types"

interface Props {
    links: IParsedUrl[]
}

export default function Links({ links }: Props) {
  if (!links.length) return (<span>None</span>)

  return (
    <div className="flex flex-col">
      {links.map((link: IParsedUrl) => {
        return (
          <div key={link.url}>
            <Link href={link.url} className="text-blue-500 hover:text-blue-700">{link.name}</Link>
          </div>
        )
      })}
    </div>
  )
}
