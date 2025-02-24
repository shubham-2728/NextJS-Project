const { MongoClient } = require("mongodb");

DATABASE_URL = "mongodb+srv://Shubham:ReE1g8NxASuf8vn3@nextcluster.1rb0f.mongodb.net/NextJSApp"
const uri = process.env.DATABASE_URL; // Using the .env value
const client = new MongoClient(uri);

async function testDB() {
    try {
        await client.connect();
        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
    } finally {
        await client.close();
    }
}

testDB();
