'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')

const images = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKK5QEj0yba3eNq2BMXbPtJthoNVQhkwiZf4nCz9MN2_ZhkecA'
];

const getRandomImage = () => images[Math.floor(Math.random() * images.length)];


module.exports = db.define('campus', {

  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: function () {
      return images[0];
    }
  }
},
{

}
)
