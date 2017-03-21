'use strict';

const plugin = require('./plugin');
const icon = require('./icon.png');

let passwordStoreDir = process.env.PASSWORD_STORE || `${process.env.HOME}/.password-store`;

const handler = ({term, display, actions}) => {
  const query = plugin.parse(term);
  if (query) {
    plugin.search(passwordStoreDir, query, (err, files) => {
      if (!err) {
        const results = files.map(file => plugin.render(file, icon));
        display(results);
      }
    });
  }
};

module.exports = {
  fn: handler
};
