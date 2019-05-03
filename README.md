![npm](https://img.shields.io/npm/v/jest-standard-reporter.svg)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/jest-standard-reporter.svg)

# Jest Standard Reporter

Jest reporter that uses `stdout` for messages and `stderr` for errors

## Installation

```
npm i -D jest-standard-reporter
yarn add -D jest-standard-reporter
```

## Usage

Jest CLI:

```
jest --reporters jest-standard-reporter
```

Jest Config:

```
{
    "reporters": ["jest-standard-reporter"],
}
```

Supports the following Jest configurations

| Option    | Supported | Info                                    |
| --------- | --------- | --------------------------------------- |
| useStderr | :check:   | https://jestjs.io/docs/en/cli#usestderr |
| verbose   | :check:   | https://jestjs.io/docs/en/cli#verbose   |

## Inspiration

Jest uses `stderr` to print the results of the tests (as opposed to `stdout` [see issue #5064](https://github.com/facebook/jest/issues/5064)), many CI tools mark any output coming from `stderr` as a failure making builds to fail even when the tests pass (false positive).

This reporter uses `stdout` to print messages an only uses `stderr` when an error is thrown.

If you chose to, you could override this behavior using `useStderr` flag.

## License

MIT
