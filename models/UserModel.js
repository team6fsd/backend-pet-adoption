import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    gender: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    hooks: {
      beforeCreate: async (user) => {
        const saltRounds = 10;
        if (user.password) {
          const hashedPassword = await bcrypt.hash(user.password, saltRounds);
          user.password = hashedPassword;
        }
      },
    },
  }
);

export default User;

(async () => {
  try {
    await db.sync();
    console.log("User model synced successfully.");
  } catch (error) {
    console.error("Error syncing User model:", error);
  }
})();
