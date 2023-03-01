import Link from "next/link"
import { IParsedUrl } from "../types"

interface Props {
    links: IParsedUrl[]
}

export default function Links ({ links }: Props) {
    return (
        <div>
            {links.map((link: IParsedUrl) => (<Link href={link.url}>{link.name}</Link>))}
        </div>
    )
}
