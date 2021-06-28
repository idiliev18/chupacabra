/**
 * Class for management the logging system
 * @class
 */
class LoggerManager {
    /**
     * Initialise the logging system
     * @constructor
     */
    constructor() {
        this.#winston = require('winston');
        this.#LokiTransport = require('winston-loki');
        this.#DiscordLogger = require('winston3-discord');
        this.#logger = this.#winston.createLogger();

        this.#logger.add(new this.#winston.transports.Console({
            format: this.#winston.format.json(),
            level: 'silly'
        }));

        this.#logger.add(new this.#LokiTransport({
            host: process.env.LOKI_IP,
            json: true,
            labels: { job: 'Chupacabra-Test' },
            level: 'silly'
        }));

        this.#logger.add(new this.#DiscordLogger({
            webhooks: {
                id: process.env.DISCORD_ID,
                token: process.env.DISCORD_TOKEN
            },
            level: 'silly'
        }));
    }

    //public methods
    /**
     * Send error log
     * @public
     * @param {string} logMsg Message to be logged
     */
    logError(logMsg) {
        this.#logger.error(logMsg)
    }

    /**
     * Send warn log
     * @public
     * @param {string} logMsg Message to be logged
     */
    logWarn(logMsg) {
        this.#logger.warn(logMsg)
    }
    
    /**
     * Send info log
     * @public
     * @param {string} logMsg Message to be logged
     */
    logInfo(logMsg) {
        this.#logger.info(logMsg);
    }

    /**
     * Send http log
     * @public
     * @param {string} logMsg Message to be logged
     */
    logHttp(logMsg) {
        this.#logger.http(logMsg);
    }

    /**
     * Send verbose log
     * @public
     * @param {string} logMsg Message to be logged
     */
    logVerbose(logMsg) {
        this.#logger.verbose(logMsg);
    }

    /**
     * Send debug log
     * @public
     * @param {string} logMsg Message to be logged
     */
    logDebug(logMsg) {
        this.#logger.debug(logMsg);
    }

    /**
     * Send Silly log
     * @public
     * @param {string} logMsg Message to be logged
     */
    logSilly(logMsg) {
        this.#logger.silly(logMsg);
    }

    //private
    #winston;
    #LokiTransport;
    #DiscordLogger;
    #logger;
}

module.exports = LoggerManager;