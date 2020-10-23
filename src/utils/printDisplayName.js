const chalk = require('chalk');

const printDisplayName = (config) => {
  const { displayName } = config;

  if (displayName) {
    const nameToUse =
      typeof displayName.name === 'string' ? displayName.name : displayName;

    return chalk.supportsColor
      ? chalk.reset.inverse.white(` ${nameToUse} `)
      : nameToUse;
  }

  return '';
};

module.exports = printDisplayName;
