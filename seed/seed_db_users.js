import mongoose from "mongoose";
import User from "../models/userModel.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import "dotenv/config";

(async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    await User.deleteMany();
    console.log("Users purged");

    const users = Array.from({ length: 5 }, async () => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.exampleEmail(),
      password: await bcrypt.hash(faker.internet.password(), 8),
      dateOfBirth: faker.date.between('1950-01-01', '2003-12-31'),
      phone: faker.phone.phoneNumber(),
    }));

    const resolvedUsers = await Promise.all(users);

    await User.create(resolvedUsers);
    console.log("Users data seeded successfully!");
  } catch (error) {
    console.error("Error while seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
})();
