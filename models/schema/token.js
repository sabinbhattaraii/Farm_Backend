import { DataTypes } from "sequelize";
import { sequelize } from "../../connectDb/dbPostgres.js";
import { Users } from "./user.js"; // Ensure this path is correct

export const TokenDatas = sequelize.define(
  "TokenData",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      validate: {
        notNull: { msg: "Please enter your userId" },
      },
    },
    type: {
      type: DataTypes.ENUM("ACCESS", "RESET_PASSWORD", "VERIFY_EMAIL"),
      allowNull: false,
      defaultValue: "ACCESS",
      validate: {
        notNull: { msg: "Please specify the token type" },
        isIn: {
          args: [["ACCESS", "RESET_PASSWORD", "VERIFY_EMAIL"]],
          msg: "Invalid token type",
        },
      },
    },
    expiration: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "Expiration date is required" },
        isDate: { msg: "Must be a valid date" },
      },
    },
  },
  {
    freezeTableName: true,
    tableName: "TokenData",
    timestamps: true,
  }
);

TokenDatas.belongsTo(Users, {
  foreignKey: "userId",
  as: "user",
});