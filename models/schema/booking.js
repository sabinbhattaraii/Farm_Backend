import { DataTypes } from "sequelize";
import { sequelize } from "../../connectDb/dbPostgres.js";
import { Product } from "../schema/product.js";

export const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    contact_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        }
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id',
        }
    },
    seen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    freezeTableName: true,
    timestamps: true,
});

Booking.belongsTo(Product, {
    foreignKey: 'productId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

Product.hasMany(Booking, {
    foreignKey: 'productId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

export default Booking;