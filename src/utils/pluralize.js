const pluralize = (word, count) => `${count} ${word}${count === 1 ? '' : 's'}`;

module.exports = pluralize;
