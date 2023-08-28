const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize ejecutandolo
module.exports = (sequelize) => {
  // Definimos 
  const Dog = sequelize.define('dog', {
    id: { // Id
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    name: { // Nombre
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: { // Altura 
      type: DataTypes.STRING, 
      allowNull: false,
    },
    weight: { // Peso
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false
  });

  Dog.beforeCreate(async (dog) => {
    const max = await Dog.max("id")
    if (max < 265 && !dog.id) {
      dog.id = 265;
    }
    if (max >= 265 && !dog.id) {
      dog.id = max + 1
    }
  })
  return Dog
};
// Para no confundir los ID's, los perros que se creen serán con un ID posterior a el maximo que trae la API (264). Por ende, todo perro nuevo que se cree, iniciará con el ID 265 en adelante. 
// Es posible usar BeforeCreate o el autoincremente con un inicio en 265

