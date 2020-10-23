const chalk = require('chalk');
const { formatTime } = require('jest-util');

const PROGRESS_BAR_WIDTH = 40;

const renderTime = (runTime, estimatedTime, width) => {
  // If we are more than one second over the estimated time, highlight it.
  const renderedTime =
    estimatedTime && runTime >= estimatedTime + 1
      ? chalk.bold.yellow(formatTime(runTime, 0))
      : formatTime(runTime, 0);

  let time = `${chalk.bold('Time:')}        ${renderedTime}`;

  if (runTime < estimatedTime) {
    time += `, estimated ${formatTime(estimatedTime, 0)}`;
  }

  // Only show a progress bar if the test run is actually going to take
  // some time.
  if (estimatedTime > 2 && runTime < estimatedTime && width) {
    const availableWidth = Math.min(PROGRESS_BAR_WIDTH, width);
    const length = Math.min(
      Math.floor((runTime / estimatedTime) * availableWidth),
      availableWidth
    );

    if (availableWidth >= 2) {
      time += `\n${chalk.green('█').repeat(length)}${chalk
        .white('█')
        .repeat(availableWidth - length)}`;
    }
  }

  return time;
};

module.exports = renderTime;
