import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Epired() {
    return (
        <>
        <h1 className="text-4-xl mb-4">Download link expired</h1>
        <Button size="lg" asChild>
            <Link href="/orders">Get new link</Link>
        </Button>
        </>
    )
}