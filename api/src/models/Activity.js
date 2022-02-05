const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Activity",{
      // id: {
      //   type: DataTypes.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true,
      // },
      name: {
        type: DataTypes.STRING,
          allowNull: false,  
      },
      dificultad: {
        type: DataTypes.ENUM('1','2','3','4','5'),
          allowNull: false,  
      },
      duracion: {
        type: DataTypes.STRING,
          allowNull: false,  
      },
      descripcion:{
        type: DataTypes.STRING,
        allowNull: false
      },
      temporada:{
        type: DataTypes.ENUM('Verano','Invierno','Otoño','Primavera'),

      }
    },
    {
      tableName: "Activity",
      timestamps: true,
    }
  );
};