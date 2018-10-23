module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    img: DataTypes.STRING,
    requestFromYou: DataTypes.ARRAY(DataTypes.BIGINT), //All bigint should be here as int
    requestToYou: DataTypes.ARRAY(DataTypes.BIGINT), //All bigint should be here as int
    rejectedRequests: DataTypes.ARRAY(DataTypes.BIGINT), //All bigint should be here as int coz they now storing in db as strings coz of that
    postsCreated: DataTypes.ARRAY(DataTypes.BIGINT)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User
}
