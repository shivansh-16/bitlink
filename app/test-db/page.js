import clientPromise from "@/lib/mongodb"

export default async function TestDB() {
    try {
        const client = await clientPromise;
        const db = client.db("bitlinks")
        const collection = db.collection("urls")
        
        // Get all documents
        const docs = await collection.find({}).toArray()
        
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Database Test</h1>
                <p className="mb-4">Current documents in the database:</p>
                <pre className="bg-gray-100 p-4 rounded">
                    {JSON.stringify(docs, null, 2)}
                </pre>
            </div>
        )
    } catch (error) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Database Test - Error</h1>
                <p className="text-red-500">Error: {error.message}</p>
            </div>
        )
    }
}