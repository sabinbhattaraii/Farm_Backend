import { DataTypes } from "sequelize";
import { sequelize } from "../../connectDb/dbPostgres.js";
import { genderEnum, roleEnum, statusEnum } from "../../constant/constant.js";

export const Users = sequelize.define('Users', {
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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM(Object.values(genderEnum)),
    defaultValue: genderEnum.MALE,
  },
  role: {
    type: DataTypes.ENUM(Object.values(roleEnum)),
    defaultValue: roleEnum.CUSTOMER,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM(Object.values(statusEnum)),
    defaultValue: statusEnum.ACTIVE,
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  freezeTableName: true,
  timestamps: true,
});