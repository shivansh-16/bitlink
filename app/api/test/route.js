import clientPromise from "@/lib/mongodb"

export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db("bitlinks")
        const collection = db.collection("urls")
        
        // Get all documents
        const docs = await collection.find({}).toArray()
        console.log("All documents in database:", docs);
        
        return Response.json({ message: 'Check console for database contents', docs: docs })
    } catch (error) {
        console.error("Error in test route:", error);
        return Response.json({ message: 'Error fetching documents', error: error.message }, { status: 500 })
    }
}