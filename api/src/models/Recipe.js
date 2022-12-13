const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,//para que no se repita con el que viene de la API (identificador específico) formato textual canónico
      defaultValue: DataTypes.UUIDV4,//se ponen estos porque no es auto incrementable entonces asigna un valor texto y numero 
      allowNull: false,//no permite que este vacio 
      unique : true,
      primaryKey: true,
      validate : {
        isUUID: 4,
      }  
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate : {
        notEmpty : true,
      },
    
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate : {
        notEmpty: true,
        }
      },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        isNumeric : true, 
        min : 0, 
        max : 100, 
        notEmpty : true 
      },
    },
    steps: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
    },
  },
  createdInDB : {
    type: DataTypes.BOOLEAN,
    allowNull : false,
    defaultValue : true,
  },

   image: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        isUrl: true,
    }
    },
  
  });
};
