class LoggerManager {
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
    logError(logMsg) {
        this.#logger.error(logMsg)
    }

    logWarn(logMsg) {
        this.#logger.warn(logMsg)
    }

    logInfo(logMsg) {
        this.#logger.info(logMsg);
    }

    logHttp(logMsg) {
        this.#logger.http(logMsg);
    }

    logVerbose(logMsg) {
        this.#logger.verbose(logMsg);
    }

    logDebug(logMsg) {
        this.#logger.debug(logMsg);
    }

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