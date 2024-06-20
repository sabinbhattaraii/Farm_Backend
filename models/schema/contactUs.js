import { DataTypes } from "sequelize";
import { sequelize } from "../../connectDb/dbPostgres.js";

export const Contact = sequelize.define('Contact', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
            is: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        required: false,
    },
}, {
    freezeTableName: true,
    timestamps: true,
});

export default Contact;