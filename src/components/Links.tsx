import Link from "next/link"
import { IParsedUrl } from "../types"

interface Props {
    links: IParsedUrl[]
}

export default function Links ({ links }: Props) {
    if (!links.length) return (<span>None</span>)
    
    return (
        <span>
            {links.map((link: IParsedUrl) => (<Link key={link.url} href={link.url}>{link.name}</Link>))}
        </span>
    )
}
