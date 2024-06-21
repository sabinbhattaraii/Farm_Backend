import { DataTypes } from "sequelize";
import { sequelize } from "../../connectDb/dbPostgres.js";

export const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        unique: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isUrl: true,
        }
    },
}, {
    freezeTableName: true,
    timestamps: true,
});

export default Category;