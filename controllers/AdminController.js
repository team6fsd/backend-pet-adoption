import bcrypt from "bcrypt";
import Admin from "../models/AdminModel.js";
import db from "../config/Database.js";
import dotenv from "dotenv";
dotenv.config();

const createAdminUser = async () => {
  const email = process.env.ADMIN_EMAIL;
  const pw = process.env.ADMIN_PW;
  try {
    const existingAdmin = await Admin.findOne({
      where: {
        email: email,
      },
    });

    const hashedPassword = await bcrypt.hash(pw, 10);
    if (!existingAdmin) {
      await Admin.create({
        name: process.env.ADMIN_NAME,
        email: email,
        password: hashedPassword,
      });
      console.log("Admin user created successfully!");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

db.authenticate()
  .then(() => {
    console.log("Connected to the database.");
    return createAdminUser();
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

export const loginAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!admin) {
      return res.status(404).json({ msg: "Email tidak terdaftar" });
    }

    const match = await bcrypt.compare(req.body.password, admin.password);

    if (!match) {
      return res.status(400).json({ msg: "Password salah" });
    }

    res.status(200).json({ name: admin.name, email: admin.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
