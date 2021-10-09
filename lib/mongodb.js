import { MongoClient } from 'mongodb'

const MONGODB_URI=`mongodb+srv://plotnetworkuser:HaDXynz0VaH2qBoe@cluster0.bdyvp.mongodb.net/plotnetwork`
const MONGODB_DB='plotnetwork';

// const uri = process.env.MONGODB_URI
const uri = MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise
let db

export async function connectToDatabase(){
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = await client.connect()
    }
    clientPromise = global._mongoClientPromise
    db = clientPromise.db(MONGODB_DB)
  
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = await client.connect()
    db = clientPromise.db(MONGODB_DB)
  }
  
  
  
  // Export a module-scoped MongoClient promise. By doing this in a
  // separate module, the client can be shared across functions.
  return {
    client: clientPromise,
    db: db,
  };
}

