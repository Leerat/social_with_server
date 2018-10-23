module.exports = (sequelize, DataTypes) => {
  let Post = sequelize.define('Post', {
    id: {
      type: DataTypes.BIGINT, //All bigint should be here as int
      primaryKey: true,
      autoIncrement: true
    },
    author: DataTypes.BIGINT, //All bigint should be here as int
    text: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Post
}

