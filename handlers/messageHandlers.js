class MessageHandlers {
    static handlePollingError(error) {
        console.log('Polling error:', error);
    }

    static handleBotError(error) {
        console.log('Bot error:', error);
    }

    static setupMessageHandlers(bot, commandHandlers) {
        // Start command
        bot.onText(/\/start/, (msg) => commandHandlers.handleStart(msg, bot));

        // Help command
        bot.onText(/\/help/, (msg) => commandHandlers.handleHelp(msg, bot));

        // Generate random password
        bot.onText(/\/password(?:\s+(\d+))?/, (msg, match) => 
            commandHandlers.handlePassword(msg, match, bot));

        // Generate memorable password
        bot.onText(/\/memorable(?:\s+(\d+))?(?:\s+([^\\s]+))?/, (msg, match) => 
            commandHandlers.handleMemorable(msg, match, bot));

        // Generate PIN
        bot.onText(/\/pin(?:\s+(\d+))?/, (msg, match) => 
            commandHandlers.handlePIN(msg, match, bot));

        // Generate strong password
        bot.onText(/\/strong(?:\s+(\d+))?/, (msg, match) => 
            commandHandlers.handleStrong(msg, match, bot));

        // Custom password generation
        bot.onText(/\/custom(?:\s+(\d+))?(?:\s+(.+))?/, (msg, match) => 
            commandHandlers.handleCustom(msg, match, bot));

        // Alternative version without Markdown
        bot.onText(/\/simple(?:\s+(\d+))?/, (msg, match) => 
            commandHandlers.handleSimple(msg, match, bot));

        // Error handlers
        bot.on('polling_error', this.handlePollingError);
        bot.on('error', this.handleBotError);
    }
}

module.exports = MessageHandlers;