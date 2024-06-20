import { DataTypes } from "sequelize";
import { sequelize } from "../../connectDb/dbPostgres.js";

export const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 50],
        },
    },
    review_message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Review message cannot be empty",
            },
        },
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true,
        }
    },
}, {
    freezeTableName: true,
    timestamps: true,
});

export default Review;