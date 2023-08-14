const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize ejecutandolo
module.exports = (sequelize) => {
  // Definimos 
  sequelize.define('dog', {
    id: { // Id
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
      initialAutoIncrement: 265, // Los que no tienen id (agregados), se creen desde el 265 en adelante
    },
    image: {
      type: DataTypes.STRING, // Image en la api es un objeto, se debe extraer la info de la URL 
      allowNull: true, // Cuando se crean perros nuevos, no se adjunta imagenes, por eso no debe ser obligatoria en la DB. 
    },
    name: { // Nombre
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: { // Altura 
      type: DataTypes.STRING, // Altura en la api es un objeto con los datos para sistema imperial y metrico, se debe extraer
      allowNull: false,
    },
    weight: { // Peso
      type: DataTypes.STRING, // Peso en la api es un objeto con los datos para sistema imperial y metrico, se debe extraer
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: false
  });
};

// Para no confundir los ID's, los perros que se creen serán con un ID posterior a el maximo que trae la API (264). Por ende, todo perro nuevo que se cree, iniciará con el ID 265 en adelante. 
// Es posible usar BeforeCreate o el autoincremente con un inicio en 265


