const express = require("express")
const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectId
const cors = require("cors")

const app = express()
const port = process.env.PORT || 5000

//asi-11
//OPwwzvdaGg4C1SqE

app.use(express.json())
app.use(cors())


const uri = "mongodb+srv://asi-11:OPwwzvdaGg4C1SqE@cluster0.tgpgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {

    try {

        await client.connect();

        const database = client.db("assignment");

        const ServicesCollection = database.collection("services");
        const OrdersColletion = database.collection("orders");






        // create a document to insert

        const doc = {

            title: "Record of a Shriveled Datum",

            content: "No bytes, no problem. Just insert a document, in MongoDB",

        }
        app.get("/services", async (req, res) => {
            const services = ServicesCollection.find({})
            const query = await services.toArray()
            res.send(query)
        })
        app.post("/services", async (req, res) => {

            const data = req.body
            console.log(data)
            const result = await ServicesCollection.insertOne(data);
            res.send(result)

        })
        app.post("/orders", async (req, res) => {

            const data = req.body
            console.log(data)
            const result = await OrdersColletion.insertOne(data);
            res.send(result)

        })
        app.get("/orders/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            console.log(query)

            const result = await OrdersColletion.findOne(query)
            res.send(result)



        })

        app.get("/orders", async (req, res) => {
            const orders = OrdersColletion.find({})
            const query = await orders.toArray()
            res.send(query)
        })
        app.get("/orders/users/:email", async (req, res) => {
            const email = req.params.email
            const orders = OrdersColletion.find({ email: email })
            const query = await orders.toArray()
            res.send(query)
        })

        app.delete("/orders/:id", async (req, res) => {
            const id = req.params.id
            console.log(id)
            const query = { _id: ObjectId(id) }
            console.log(query)
            const result = await OrdersColletion.deleteOne(query);



            console.log("deleting user with id", result)
            res.json(result)
        })

        const result = await OrdersColletion.insertOne(doc);

        console.log(`A document was inserted with the _id: ${result.insertedId}`);

    } finally {

        // await client.close();

    }

}

run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("travelling server ready")
})
app.listen(port, () => {
    console.log("running port at", port)
})