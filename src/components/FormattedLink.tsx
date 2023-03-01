import { IParsedUrl } from "../types"
import Link from "next/link"

export default function FormattedLink({ name, url}: IParsedUrl) {
  if (name === 'n/a') return <span>{name}</span>
    
  return (
    <Link className="text-blue-500 hover:text-blue-700" href={url}>{name}</Link>
  )
}