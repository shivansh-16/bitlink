import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb"

export default async function Page({ params }) {
    const { shorturl } = await params
    
    try {
        const client = await clientPromise;
        
        const db = client.db("bitlinks")
        
        const collection = db.collection("urls")
        
        // check if the short url exists
        const doc = await collection.findOne({ shorturl: shorturl })
        
        if (doc) {
            redirect(doc.url)
        }
        else{
            redirect(`/`)
        }
    } catch (error) {
        // NEXT_REDIRECT is expected behavior for redirects in Next.js
        if (error.digest && error.digest.includes('NEXT_REDIRECT')) {
            // Re-throw the redirect error as it's expected
            throw error;
        }
        redirect(`/`)
    }
}