const TelegramBot = require('node-telegram-bot-api');
const config = require('../config');

class BotService {
    constructor() {
        this.bot = null;
    }

    initialize() {
        this.bot = new TelegramBot(config.botToken, { polling: true });
        console.log('Bot is running...');
        return this.bot;
    }

    setupGracefulShutdown() {
        process.on('SIGINT', () => {
            console.log('Shutting down bot...');
            this.bot.stopPolling();
            process.exit(0);
        });
    }

    getBot() {
        return this.bot;
    }
}

module.exports = BotService;