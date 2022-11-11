const { DataTypes, Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DATABASE_URL);

const Patent = sequelize.define('Patent', {
    patentNo: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    vector: { type: DataTypes.TSVECTOR },

}, { sequelize, modelName: 'Patent' });

(async () => {
    await sequelize.sync({ alter: true });
})();

console.log('All models were synchronized successfully.');

module.exports.Patent = Patent;
module.exports.sequelize = sequelize;
