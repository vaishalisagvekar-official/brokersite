import { MongoClient } from 'mongodb';

const connectionString = 'mongodb+srv://plotnetworkuser:HaDXynz0VaH2qBoe@cluster0.bdyvp.mongodb.net/plotnetwork';
const dbName = 'plotnetwork';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    // check the cached.
    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    // set the connection options
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    // Connect to cluster
    let client = new MongoClient(connectionString);
    await client.connect();
    let db = client.db(dbName);

    // set cache
    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}

  
