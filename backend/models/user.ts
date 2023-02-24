'use strict';
import {
  Model
} from 'sequelize';

interface UserAttributes {
  userId: string,
  name: string,
  role: string,
  password: string,
  bankAccount: string

}
module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    userId!: string
    name!: string
    role!: string
    password!: string
    bankAccount!: string
    static associate(models: any) {
      // define association here
      User.hasMany(models.Reimburse, {
        foreignKey: 'userId',
        as: 'reimbursements'
      })
      User.hasMany(models.Item, {
        foreignKey: "userId",
        as: 'items'
      })
    }
  }
  User.init({
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankAccount: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};