const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize ejectuandolo
module.exports = (sequelize) => {
    sequelize.define("temperaments", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        temperament: {
            type: DataTypes.STRING,
            allowNull: false,
        }},
        {
        timestamps: false
    })  
}