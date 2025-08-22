import clientPromise from "@/lib/mongodb"

export async function POST(request) {
    try {
        const body = await request.json()
        console.log("=== API GENERATE DEBUG INFO ===")
        console.log("Request body received:", body)
        console.log("URL to shorten:", body.url)
        console.log("Short URL requested:", body.shorturl)
        
        const client = await clientPromise;
        console.log("MongoDB client connected successfully")
        
        const db = client.db("bitlinks")
        console.log("Database connected:", "bitlinks")
        
        const collection = db.collection("urls")
        console.log("Collection accessed:", "urls")

        // check if the short url exists
        const doc = await collection.findOne({ shorturl: body.shorturl })
        console.log("Check for existing short URL result:", doc)
        
        if (doc) {
            console.log("Short URL already exists:", doc.shorturl)
            return Response.json({ message: 'short url already exists', success: false, error:true }, { status: 400 })
        }

        const result = await collection.insertOne({
            url: body.url,
            shorturl: body.shorturl
        })
        
        console.log("Document inserted successfully")
        console.log("Insert result:", result)
        console.log("Inserted document ID:", result.insertedId)
        
        // Verify the document was inserted correctly
        const insertedDoc = await collection.findOne({ _id: result.insertedId })
        console.log("Retrieved inserted document:", insertedDoc)

        return Response.json({ message: 'generated short url', success: true })

    } catch (error) {
        console.error("=== API ERROR ===")
        console.error("Error in generate route:", error);
        return Response.json({ message: 'Error generating short url', error: error.message, success: false }, { status: 500 })
    }
}