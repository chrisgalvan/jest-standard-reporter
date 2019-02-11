const chalk = require('chalk');

const printDisplayName = config => {
  const { displayName } = config;

  if (displayName) {
    return chalk.supportsColor
      ? chalk.reset.inverse.white(` ${displayName} `)
      : displayName;
  }

  return '';
};

module.exports = printDisplayName;
