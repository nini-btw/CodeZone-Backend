const {MongoClient} = require("mongodb");
const url ="mongodb+srv://nini_btw:justme2002@learn-mongo-db.tck39.mongodb.net/?retryWrites=true&w=majority&appName=learn-mongo-db"
const client = new MongoClient(url);

const main = async()=>{ 
    //connecting to server
    await client.connect();
    console.log("connected");

    // choose database
    const db = client.db('codeZone');

    //choose collection
    const collection = db.collection('courses');

    //Create Query
    await collection.insertOne({
        title:"new Course",
        price:5000
    })


    //Get Query
    const data = await collection.find().toArray();
    console.log("data ",data);
}

main();



