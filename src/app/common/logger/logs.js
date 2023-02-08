const colors = require('colors');
module.exports = {
  error: (path, message, err) => console.log(colors.red(`Error: ${path} | ${message} \n ${err}`)),
  warn: (path, message) => console.log(colors.yellow(`Warning:${message}`)),
  info: (path, message, data) => console.log(colors.blue(`${path} | ${message} | ${data}`))
};