const chalk = require('chalk');
const { pluralize } = require('jest-util');

const ARROW = ' \u203A ';
const DOT = ' \u2022 ';
const FAIL_COLOR = chalk.bold.red;
const SNAPSHOT_ADDED = chalk.bold.green;
const SNAPSHOT_UPDATED = chalk.bold.green;
const SNAPSHOT_OUTDATED = chalk.bold.yellow;

const getSnapshotStatus = (snapshot, afterUpdate) => {
  const statuses = [];

  if (snapshot.added) {
    statuses.push(
      SNAPSHOT_ADDED(
        `${ARROW + pluralize('snapshot', snapshot.added)} written.`
      )
    );
  }

  if (snapshot.updated) {
    statuses.push(
      SNAPSHOT_UPDATED(
        `${ARROW + pluralize('snapshot', snapshot.updated)} updated.`
      )
    );
  }

  if (snapshot.unmatched) {
    statuses.push(
      FAIL_COLOR(`${ARROW + pluralize('snapshot', snapshot.unmatched)} failed.`)
    );
  }

  if (snapshot.unchecked) {
    if (afterUpdate) {
      statuses.push(
        SNAPSHOT_UPDATED(
          `${ARROW + pluralize('snapshot', snapshot.unchecked)} removed.`
        )
      );
    } else {
      statuses.push(
        `${SNAPSHOT_OUTDATED(
          `${ARROW + pluralize('snapshot', snapshot.unchecked)} obsolete`
        )}.`
      );
    }

    snapshot.uncheckedKeys.forEach((key) => {
      statuses.push(`  ${DOT}${key}`);
    });
  }

  if (snapshot.fileDeleted) {
    statuses.push(SNAPSHOT_UPDATED(`${ARROW}snapshot file removed.`));
  }

  return statuses;
};

module.exports = getSnapshotStatus;
