import { DataTypes } from "sequelize";
import { sequelize } from "../../connectDb/dbPostgres.js";
import { Category } from "../schema/category.js";

export const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isUrl: true,
        }
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id',
        }
    },
}, {
    freezeTableName: true,
    timestamps: true,
});

Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

Category.hasMany(Product, {
    foreignKey: 'categoryId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

export default Product;