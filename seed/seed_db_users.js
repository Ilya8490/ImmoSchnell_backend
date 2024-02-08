import mongoose from "mongoose";
import User from "../models/userModel.js";
import { users } from "../seed/users.js";
import bcrypt from "bcryptjs";
import "dotenv/config";

(async () => {
    try {
      await mongoose.connect(process.env.DB_URI);
  
      await User.deleteMany();
      console.log("Users purged");
  
      for (let user of users) {
        user.password = await bcrypt.hash(user.password, 8);
      }
  
      await User.create(users);
      console.log("Users data seeded successfully!");
    } catch (error) {
      console.error("Error while seeding data:", error);
    } finally {
      mongoose.connection.close();
    }
  })();