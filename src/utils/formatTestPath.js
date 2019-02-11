const path = require('path');
const chalk = require('chalk');
const slash = require('slash');
const relativePath = require('./relativePath');

const formatTestPath = (config, testPath) => {
  const { dirname, basename } = relativePath(config, testPath);

  return slash(chalk.dim(dirname + path.sep) + chalk.bold(basename));
};

module.exports = formatTestPath;
