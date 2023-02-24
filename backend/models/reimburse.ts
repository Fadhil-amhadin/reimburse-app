'use strict';
import {
  Model
} from 'sequelize';

interface ReimburseAttributes {
  id: string,
  employeeName: string,
  departement: string,
  bussinessPurpose: string,
  reimburseProof:string,
  totalCost:number,
  approverId: string,
  status: string,
  notes: string,
  dateFrom: Date,
  dateTo: Date,
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Reimburse extends Model<ReimburseAttributes> implements ReimburseAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
      id!: string
      employeeName!: string
      departement!: string
      bussinessPurpose!: string
      reimburseProof!:string
      totalCost!: number
      approverId!: string
      status!: string
      notes!: string
      dateFrom!: Date
      dateTo!: Date
      static associate(models: any) {
      // define association here
      Reimburse.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'User'
      })
      Reimburse.hasMany(models.Item, {
        foreignKey: 'reimburseId',
        as: 'items'
      })
    }
  }
  Reimburse.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    employeeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    departement: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bussinessPurpose: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reimburseProof: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalCost: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    approverId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateFrom: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dateTo: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Reimburse',
  });
  return Reimburse;
};