const { MongoClient } = require("mongodb");

DATABASE_URL = " " //Enter database URL
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
