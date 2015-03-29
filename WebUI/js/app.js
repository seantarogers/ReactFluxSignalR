var React = require('react/addons');
var AppController = require('./components/AppController.react');

//first entry point...
React.render(

  AppController({history: true, useHistory: true}),
  document.getElementById('react')
);
