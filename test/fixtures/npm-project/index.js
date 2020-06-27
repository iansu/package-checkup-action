const createDebug = require('debug');
const { min } = require('lodash');

const debug = createDebug('npm-project');
const value = min([1, 2]);

debug('Hello World!');
debug('value', value);
