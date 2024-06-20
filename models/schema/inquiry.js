import { DataTypes } from "sequelize";
import { sequelize } from "../../connectDb/dbPostgres.js";

export const Inquiry = sequelize.define('Inquiry', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
            is: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        },
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    seen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    freezeTableName: true,
    timestamps: true,
});

export default Inquiry;