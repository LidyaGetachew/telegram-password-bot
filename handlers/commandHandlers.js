const PasswordGenerator = require('../utils/passwordGenerator');
const Formatters = require('../utils/formatters');

class CommandHandlers {
    static handleStart(msg, bot) {
        const chatId = msg.chat.id;
        const welcomeMessage = `
🔐 Password Generator Bot

I can generate secure passwords for you! Here are the available commands:

/password - Generate a random password
/memorable - Generate a memorable password
/pin - Generate a numeric PIN
/strong - Generate a strong password
/custom - Generate custom password

Examples:
• /password 16
• /memorable 5 _
• /pin 8
• /strong 20
• /custom 12 letters numbers

Use /help for more information!
        `;
        
        bot.sendMessage(chatId, welcomeMessage.trim());
    }

    static handleHelp(msg, bot) {
        const chatId = msg.chat.id;
        const helpMessage = `
🤖 Password Generator Help

Available Commands:

🔐 /password [length] - Generate random password
   Example: /password 16

📝 /memorable [words] [separator] - Generate memorable password
   Example: /memorable 4 _

🔢 /pin [length] - Generate numeric PIN
   Example: /pin 6

💪 /strong [length] - Generate strong password with all character types
   Example: /strong 20

🎛️ /custom [length] [types] - Custom password generation
   Types: letters, numbers, symbols, lowercase, uppercase
   Example: /custom 12 letters numbers symbols

Security Tips:
• Use at least 12 characters for important accounts
• Include uppercase, lowercase, numbers, and symbols
• Use a unique password for each service
• Consider using a password manager
        `;
        
        bot.sendMessage(chatId, helpMessage.trim());
    }

    static handlePassword(msg, match, bot) {
        const chatId = msg.chat.id;
        const length = match && match[1] ? parseInt(match[1]) : 12;
        
        if (!PasswordGenerator.validatePasswordLength(length)) {
            bot.sendMessage(chatId, '❌ Password length must be between 4 and 50 characters.');
            return;
        }
        
        try {
            const password = PasswordGenerator.generatePassword(length, {
                lowercase: true,
                uppercase: true,
                numbers: true,
                symbols: true
            });
            
            const response = Formatters.formatPasswordResponse('password', password, { length });
            bot.sendMessage(chatId, response.text, { parse_mode: response.parse_mode });
        } catch (error) {
            console.error('Error generating password:', error);
            bot.sendMessage(chatId, '❌ An error occurred while generating the password. Please try again.');
        }
    }

    static handleMemorable(msg, match, bot) {
        const chatId = msg.chat.id;
        const wordCount = match && match[1] ? parseInt(match[1]) : 4;
        const separator = match && match[2] ? match[2] : '-';
        
        if (!PasswordGenerator.validateWordCount(wordCount)) {
            bot.sendMessage(chatId, '❌ Word count must be between 2 and 8.');
            return;
        }
        
        try {
            const password = PasswordGenerator.generateMemorablePassword(wordCount, separator, true);
            const response = Formatters.formatPasswordResponse('memorable', password, {
                wordCount,
                separator
            });
            
            bot.sendMessage(chatId, response.text, { parse_mode: response.parse_mode });
        } catch (error) {
            console.error('Error generating memorable password:', error);
            bot.sendMessage(chatId, '❌ An error occurred while generating the memorable password. Please try again.');
        }
    }

    static handlePIN(msg, match, bot) {
        const chatId = msg.chat.id;
        const length = match && match[1] ? parseInt(match[1]) : 6;
        
        if (!PasswordGenerator.validatePINLength(length)) {
            bot.sendMessage(chatId, '❌ PIN length must be between 4 and 12 digits.');
            return;
        }
        
        try {
            const pin = PasswordGenerator.generatePIN(length);
            const response = Formatters.formatPasswordResponse('pin', pin, { length });
            
            bot.sendMessage(chatId, response.text, { parse_mode: response.parse_mode });
        } catch (error) {
            console.error('Error generating PIN:', error);
            bot.sendMessage(chatId, '❌ An error occurred while generating the PIN. Please try again.');
        }
    }

    static handleStrong(msg, match, bot) {
        const chatId = msg.chat.id;
        const length = match && match[1] ? parseInt(match[1]) : 16;
        
        if (!PasswordGenerator.validatePasswordLength(length, 8, 50)) {
            bot.sendMessage(chatId, '❌ Password length must be between 8 and 50 characters.');
            return;
        }
        
        try {
            const password = PasswordGenerator.generatePassword(length, {
                lowercase: true,
                uppercase: true,
                numbers: true,
                symbols: true
            });
            
            const response = Formatters.formatPasswordResponse('strong', password, { length });
            bot.sendMessage(chatId, response.text, { parse_mode: response.parse_mode });
        } catch (error) {
            console.error('Error generating strong password:', error);
            bot.sendMessage(chatId, '❌ An error occurred while generating the strong password. Please try again.');
        }
    }

    static handleCustom(msg, match, bot) {
        const chatId = msg.chat.id;
        const length = match && match[1] ? parseInt(match[1]) : 12;
        const types = match && match[2] ? match[2].toLowerCase().split(' ') : ['letters', 'numbers'];
        
        if (!PasswordGenerator.validatePasswordLength(length)) {
            bot.sendMessage(chatId, '❌ Password length must be between 4 and 50 characters.');
            return;
        }
        
        try {
            const options = {
                lowercase: types.includes('letters') || types.includes('lowercase') || 
                           types.includes('all') || types.length === 0,
                uppercase: types.includes('letters') || types.includes('uppercase') || 
                           types.includes('all') || types.length === 0,
                numbers: types.includes('numbers') || types.includes('all') || types.length === 0,
                symbols: types.includes('symbols') || types.includes('all')
            };
            
            // If specific types mentioned, be more precise
            if (types.includes('lowercase')) {
                options.uppercase = false;
                options.lowercase = true;
            }
            if (types.includes('uppercase')) {
                options.lowercase = false;
                options.uppercase = true;
            }
            
            const password = PasswordGenerator.generatePassword(length, options);
            
            const typeDescription = [];
            if (options.lowercase) typeDescription.push('lowercase');
            if (options.uppercase) typeDescription.push('uppercase');
            if (options.numbers) typeDescription.push('numbers');
            if (options.symbols) typeDescription.push('symbols');
            
            const configuration = Object.entries(options).map(([key, value]) => 
                `• ${key}: ${value ? '✅' : '❌'}`).join('\n');
            
            const response = Formatters.formatPasswordResponse('custom', password, {
                length,
                typeDescription,
                configuration
            });
            
            bot.sendMessage(chatId, response.text, { parse_mode: response.parse_mode });
        } catch (error) {
            console.error('Error generating custom password:', error);
            bot.sendMessage(chatId, '❌ An error occurred while generating the custom password. Please try again.');
        }
    }

    static handleSimple(msg, match, bot) {
        const chatId = msg.chat.id;
        const length = match && match[1] ? parseInt(match[1]) : 12;
        
        if (!PasswordGenerator.validatePasswordLength(length)) {
            bot.sendMessage(chatId, '❌ Password length must be between 4 and 50 characters.');
            return;
        }
        
        try {
            const password = PasswordGenerator.generatePassword(length, {
                lowercase: true,
                uppercase: true,
                numbers: true,
                symbols: true
            });
            
            const message = Formatters.formatSimpleResponse(password, length);
            bot.sendMessage(chatId, message);
        } catch (error) {
            console.error('Error generating simple password:', error);
            bot.sendMessage(chatId, '❌ An error occurred while generating the password. Please try again.');
        }
    }
}

module.exports = CommandHandlers;