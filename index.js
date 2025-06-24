require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-adminsdk-Service-key.json");

// middleware
app.use(cors());
app.use(express.json());

//routes

app.get('/', (req, res) => {
    res.send("Welcome to Vouch Vault API");
})

//mongodb connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pv5o1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const verifyFirebaseToken = async (req, res, next) => {
    const authHeader = req.headers?.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).send({ message: "unauthorized access" });
    }

    const token = authHeader.split(" ")[1];
    try {
        // to verify access token from the backend with the firebase to get user info
        const decoded = await admin.auth().verifyIdToken(token);
        console.log("token in the middleware", decoded);
        req.decoded = decoded;
        next();
    }
    catch (error) {
        res.status(401).send({ message: "unauthorized access" });
    }
}

const verfiyTokenEmail = (req, res, next) => {
    if (req.query.email != req.decoded.email) {
        return res.status(403).send({ message: "Forbidden Access" });
    }
    next();
};
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const service = client.db("VouchVault").collection("ServiceCollection");
        const review = client.db("VouchVault").collection("ReviewCollection");

        // Service API get
        app.get('/services', async (req, res) => {
            const cursor = service.find().limit(6);
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/allservices', async (req, res) => {
            const cursor = service.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/myservices',verifyFirebaseToken, verfiyTokenEmail, async (req, res) => {
            const email = req.query.email;
            const query = {
                userEmail: email
            }
            const cursor = service.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/allservices/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await service.findOne(query);
            res.send(result);
        })

        app.get('/searchservices', async (req, res) => {
            const searchTerm = req.query.search || ''; // Get the search term from the query parameters
            const regex = new RegExp(searchTerm, 'i'); // Create a case-insensitive regex pattern
            const query = {
                $or: [
                    { serviceTitle: { $regex: regex } },
                    { category: { $regex: regex } },
                    { companyName: { $regex: regex } },
                    { description: { $regex: regex } }
                ]
            };

            const cursor = service.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });
        // Service API and PUT post Delete

        app.post('/services',verifyFirebaseToken, async (req, res) => {
            const serviceData = req.body;
            const result = await service.insertOne(serviceData);
            res.send(result);
        })

        app.delete('/allservices/:id',verifyFirebaseToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await service.deleteOne(query);
            res.send(result);
        })

        app.put('/allservices/:id',verifyFirebaseToken, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            newDoc = req.body;
            const updateDoc = {
                $set: {
                    serviceImage: newDoc.serviceImage,
                    serviceTitle: newDoc.serviceTitle,
                    companyName: newDoc.companyName,
                    website: newDoc.website,
                    description: newDoc.description,
                    category: newDoc.category,
                    price: newDoc.price,
                    userEmail: newDoc.userEmail,
                }
            }
            console.log("this is updated document", updateDoc);
            const result = await service.updateOne(filter, updateDoc, options);
            res.send(result);
        })



        // Review API get
        app.get('/reviews', async (req, res) => {
            const cursor = review.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/reviews',verifyFirebaseToken, verfiyTokenEmail, async (req, res) => {
            const email = req.query.email;
            const query = {
                userEmail: email
            }
            const cursor = review.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        // Review API post delete put
        app.post('/reviews',verifyFirebaseToken, async (req, res) => {
            const reviewData = req.body;
            const result = await review.insertOne(reviewData);
            res.send(result);
        })


        app.delete('/reviews/:id',verifyFirebaseToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await review.deleteOne(query);
            res.send(result);
        })

        app.put('/reviews/:id',verifyFirebaseToken, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            newDoc = req.body;
            const updateDoc = {
                $set: {
                    addedDate: newDoc.addedDate,
                    image: newDoc.image,
                    review: newDoc.review,
                    rating: newDoc.rating,
                    serviceId: newDoc.serviceId,
                    serviceTitle: newDoc.serviceTitle,
                    userEmail: newDoc.userEmail,
                }
            }
            const result = await review.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})