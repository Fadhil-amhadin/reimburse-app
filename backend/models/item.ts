'use strict';
import {
  Model
} from 'sequelize';

interface ItemAttributes {
  id: string,
  date: Date,
  description: string,
  category: string,
  cost: number,
  transactionProof: string,
  status: string
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Item extends Model<ItemAttributes> implements ItemAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string
    date!: Date
    description!: string
    category!: string
    cost!: number
    transactionProof!: string
    status!: string
    static associate(models: any) {
      // define association here
      Item.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Item.belongsTo(models.Reimburse, {
        foreignKey: 'reimburseId'
      })
    }
  }
  Item.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    transactionProof: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};