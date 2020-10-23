const chalk = require('chalk');

const printDisplayName = (config) => {
  const { displayName } = config;

  if (!displayName) {
    return '';
  }

  const nameToUse =
    typeof displayName.name === 'string' ? displayName.name : displayName;
  const chosenColor =
    typeof displayName.color === 'string' ? displayName.color : 'white';

  const chalkPrint = chalk.reset.inverse[chosenColor]
    ? chalk.reset.inverse[chosenColor]
    : chalk.reset.inverse.white;

  return chalk.supportsColor ? chalkPrint(` ${nameToUse} `) : nameToUse;
};

module.exports = printDisplayName;
