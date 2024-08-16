import mongoose from "mongoose";
import { clearDb } from "./clearDb.js"
import { User, Pet } from "../models/index.js"
import { readFile } from "fs/promises"
import "dotenv/config"

async function seed() {
    const db = await mongoose.connect(process.env.MONGODB_URI)

    try {
        await clearDb(db,'Pet', 'pets');
        await clearDb(db, 'User', 'users');
    
        await User.create(JSON.parse(await readFile("seeders/users.json", "utf-8")));
        await Pet.create(JSON.parse(await readFile("seeders/pets.json", "utf-8")))

        //populate owners
        // await Pet.find({ name: "Pete" }).

    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
}
  
seed()