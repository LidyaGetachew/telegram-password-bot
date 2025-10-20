const BotService = require('./services/botService');
const MessageHandlers = require('./handlers/messageHandlers');
const CommandHandlers = require('./handlers/commandHandlers');

class PasswordGeneratorBot {
    constructor() {
        this.botService = new BotService();
        this.bot = null;
    }

    start() {
        try {
            // Initialize bot
            this.bot = this.botService.initialize();
            
            // Setup message handlers
            MessageHandlers.setupMessageHandlers(this.bot, CommandHandlers);
            
            // Setup graceful shutdown
            this.botService.setupGracefulShutdown();
            
            console.log('✅ Password Generator Bot started successfully');
        } catch (error) {
            console.error('❌ Failed to start bot:', error);
            process.exit(1);
        }
    }
}

// Start the application
const app = new PasswordGeneratorBot();
app.start();