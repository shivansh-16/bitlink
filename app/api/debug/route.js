import clientPromise from "@/lib/mongodb"

export async function GET(request) {
    try {
        // Test the exact scenario from the bug report
        const testShortUrl = "firebase";
        
        const client = await clientPromise;
        const db = client.db("bitlinks")
        const collection = db.collection("urls")
        
        // Check if the specific document exists
        const doc = await collection.findOne({ shorturl: testShortUrl })
        
        // Also get all documents to see what's in the database
        const allDocs = await collection.find({}).toArray()
        
        return Response.json({ 
            message: 'Debug info for firebase short URL',
            specificDoc: doc,
            allDocs: allDocs,
            docExists: !!doc,
            docUrl: doc ? doc.url : null
        })
    } catch (error) {
        console.error("Error in debug route:", error);
        return Response.json({ message: 'Error in debug', error: error.message }, { status: 500 })
    }
}