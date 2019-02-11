const chalk = require('chalk');
const { getConsoleOutput } = require('jest-util');
const { formatTestPath, printDisplayName } = require('./utils');

const LONG_TEST_COLOR = chalk.reset.bold.bgRed;
const TITLE_BULLET = chalk.bold('\u25cf ');

// Explicitly reset for these messages since they can get written out in the
// middle of error logging
const FAIL_TEXT = 'FAIL';
const PASS_TEXT = 'PASS';

const FAIL = chalk.supportsColor
  ? chalk.reset.inverse.bold.red(` ${FAIL_TEXT} `)
  : FAIL_TEXT;

const PASS = chalk.supportsColor
  ? chalk.reset.inverse.bold.green(` ${PASS_TEXT} `)
  : PASS_TEXT;

const getResultHeader = (result, globalConfig, projectConfig) => {
  const testPath = result.testFilePath;
  const status =
    result.numFailingTests > 0 || result.testExecError ? FAIL : PASS;

  const runTime = result.perfStats
    ? (result.perfStats.end - result.perfStats.start) / 1000
    : null;

  const testDetail = [];
  if (runTime !== null && runTime > 5) {
    testDetail.push(LONG_TEST_COLOR(`${runTime}s`));
  }

  if (result.memoryUsage) {
    const toMB = bytes => Math.floor(bytes / 1024 / 1024);
    testDetail.push(`${toMB(result.memoryUsage)} MB heap size`);
  }

  const projectDisplayName =
    projectConfig && projectConfig.displayName
      ? `${printDisplayName(projectConfig)} `
      : '';

  const testPathDetails = formatTestPath(
    projectConfig || globalConfig,
    testPath
  );

  const testDetails = testDetail.length ? ` (${testDetail.join(', ')})` : '';

  let consoleResult = '';
  if (result.console && result.console.length) {
    consoleResult =
      '\n  ' +
      TITLE_BULLET +
      'Console\n\n' +
      getConsoleOutput(
        projectConfig.cwd,
        !!globalConfig.verbose,
        result.console
      );
  }

  return `${status} ${projectDisplayName}${testPathDetails}${testDetails}${consoleResult}`;
};

module.exports = getResultHeader;
