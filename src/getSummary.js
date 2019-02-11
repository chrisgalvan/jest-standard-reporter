const chalk = require('chalk');
const { pluralize, renderTime } = require('./utils');

const getSummary = (aggregatedResults, options) => {
  let runTime = (Date.now() - aggregatedResults.startTime) / 1000;
  if (options && options.roundTime) {
    runTime = Math.floor(runTime);
  }

  const estimatedTime = (options && options.estimatedTime) || 0;
  const snapshotResults = aggregatedResults.snapshot;
  const snapshotsAdded = snapshotResults.added;
  const snapshotsFailed = snapshotResults.unmatched;
  const snapshotsOutdated = snapshotResults.unchecked;
  const snapshotsFilesRemoved = snapshotResults.filesRemoved;
  const snapshotsDidUpdate = snapshotResults.didUpdate;
  const snapshotsPassed = snapshotResults.matched;
  const snapshotsTotal = snapshotResults.total;
  const snapshotsUpdated = snapshotResults.updated;
  const suitesFailed = aggregatedResults.numFailedTestSuites;
  const suitesPassed = aggregatedResults.numPassedTestSuites;
  const suitesPending = aggregatedResults.numPendingTestSuites;
  const suitesRun = suitesFailed + suitesPassed;
  const suitesTotal = aggregatedResults.numTotalTestSuites;
  const testsFailed = aggregatedResults.numFailedTests;
  const testsPassed = aggregatedResults.numPassedTests;
  const testsPending = aggregatedResults.numPendingTests;
  const testsTodo = aggregatedResults.numTodoTests;
  const testsTotal = aggregatedResults.numTotalTests;
  const width = (options && options.width) || 0;

  const suites = `${chalk.bold('Test Suites: ') +
    (suitesFailed ? `${chalk.bold.red(`${suitesFailed} failed`)}, ` : '') +
    (suitesPending
      ? `${chalk.bold.yellow(`${suitesPending} skipped`)}, `
      : '') +
    (suitesPassed ? `${chalk.bold.green(`${suitesPassed} passed`)}, ` : '') +
    (suitesRun !== suitesTotal
      ? `${suitesRun} of ${suitesTotal}`
      : suitesTotal)} total`;

  const tests = `${chalk.bold('Tests:       ') +
    (testsFailed ? `${chalk.bold.red(`${testsFailed} failed`)}, ` : '') +
    (testsPending ? `${chalk.bold.yellow(`${testsPending} skipped`)}, ` : '') +
    (testsTodo ? `${chalk.bold.magenta(`${testsTodo} todo`)}, ` : '') +
    (testsPassed
      ? `${chalk.bold.green(`${testsPassed} passed`)}, `
      : '')}${testsTotal} total`;

  const snapshots = `${chalk.bold('Snapshots:   ') +
    (snapshotsFailed
      ? `${chalk.bold.red(`${snapshotsFailed} failed`)}, `
      : '') +
    (snapshotsOutdated && !snapshotsDidUpdate
      ? `${chalk.bold.yellow(`${snapshotsOutdated} obsolete`)}, `
      : '') +
    (snapshotsOutdated && snapshotsDidUpdate
      ? `${chalk.bold.green(`${snapshotsOutdated} removed`)}, `
      : '') +
    (snapshotsFilesRemoved && !snapshotsDidUpdate
      ? `${chalk.bold.yellow(
          `${pluralize('file', snapshotsFilesRemoved)} obsolete`
        )}, `
      : '') +
    (snapshotsFilesRemoved && snapshotsDidUpdate
      ? `${chalk.bold.green(
          `${pluralize('file', snapshotsFilesRemoved)} removed`
        )}, `
      : '') +
    (snapshotsUpdated
      ? `${chalk.bold.green(`${snapshotsUpdated} updated`)}, `
      : '') +
    (snapshotsAdded
      ? `${chalk.bold.green(`${snapshotsAdded} written`)}, `
      : '') +
    (snapshotsPassed
      ? `${chalk.bold.green(`${snapshotsPassed} passed`)}, `
      : '')}${snapshotsTotal} total`;

  const time = renderTime(runTime, estimatedTime, width);

  return [suites, tests, snapshots, time].join('\n');
};

module.exports = getSummary;
