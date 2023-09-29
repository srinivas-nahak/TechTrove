import Orders from "../models/orderModel.js";
import Users from "../models/userModel.js";
import Products from "../models/productModel.js";
import connectDB from "../config/db.js";
import usersList from "../data/usersList.js";
import productsData from "../data/products.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

//Connecting to the Database
connectDB();

async function importData() {
  try {
    await Orders.deleteMany();
    await Products.deleteMany();
    await Users.deleteMany();

    const createdUsers = await Users.insertMany(usersList);

    console.log("Created Users: " + createdUsers);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = productsData.map((product) => {
      return { ...product, user: adminUser };
    });

    await Products.insertMany(sampleProducts);

    console.log("Data Imported!!");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

async function destroyData() {
  try {
    await Orders.deleteMany();
    await Products.deleteMany();
    await Users.deleteMany();

    console.log("Data destroyed!");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

importData();

//node seeder -d    //We're referring to the -d here
if (process.argv.includes("-del")) {
  destroyData();
} else {
  importData();
}
