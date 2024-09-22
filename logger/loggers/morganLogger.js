const morgan = require("morgan");
const { currentTime } = require("../../utils/timeHelper");
const chalk = require("chalk");

const morganLogger = morgan(function (tokens, req, res) {
    const { year, month, day, hours, minutes, seconds } = currentTime()
    const log = [
        `[${year}/${month}/${day} ${hours}:${minutes}:${seconds}]`,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ');
    
    return tokens.status(req, res) >= 400 ? chalk.redBright(log) : chalk.cyanBright(log);
});

module.exports = morganLogger