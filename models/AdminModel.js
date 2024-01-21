import { Sequelize } from "sequelize";
import bcrypt from 'bcrypt';
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Admin = db.define('admins', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    hooks: {
        beforeCreate: async (admin) => {
            const hashedPassword = await bcrypt.hash(admin.password, 10);
            admin.password = hashedPassword;
        },
    }
});

export default Admin;

(async () => {
    try {
        await db.sync();
        console.log('Admin model synced successfully.');
    } catch (error) {
        console.error('Error syncing Admin model:', error);
    }
})();