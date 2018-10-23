module.exports = (sequelize, DataTypes) => {
  let Auth = sequelize.define('Auth', {
    id: {
      type: DataTypes.BIGINT, //All bigint should be here as int
      primaryKey: true,
      autoIncrement: true
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Auth
}
