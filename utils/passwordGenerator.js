const config = require('../config');

class PasswordGenerator {
    static generatePassword(length = 12, options = {
        lowercase: true,
        uppercase: true,
        numbers: true,
        symbols: true
    }) {
        try {
            let charset = '';
            
            if (options.lowercase) charset += config.passwordOptions.lowercase;
            if (options.uppercase) charset += config.passwordOptions.uppercase;
            if (options.numbers) charset += config.passwordOptions.numbers;
            if (options.symbols) charset += config.passwordOptions.symbols;
            
            // If no character types selected, use all
            if (charset === '') {
                charset = config.passwordOptions.lowercase + config.passwordOptions.uppercase + 
                         config.passwordOptions.numbers + config.passwordOptions.symbols;
            }
            
            let password = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
            
            return password;
        } catch (error) {
            console.error('Error in generatePassword:', error);
            return 'Error generating password';
        }
    }

    static generateMemorablePassword(wordCount = 4, separator = '-', capitalize = true) {
        try {
            let selectedWords = [];
            for (let i = 0; i < wordCount; i++) {
                const randomWord = config.memorableWords[Math.floor(Math.random() * config.memorableWords.length)];
                selectedWords.push(capitalize ? 
                    randomWord.charAt(0).toUpperCase() + randomWord.slice(1) : 
                    randomWord
                );
            }
            
            return selectedWords.join(separator);
        } catch (error) {
            console.error('Error in generateMemorablePassword:', error);
            return 'Error generating memorable password';
        }
    }

    static generatePIN(length = 6) {
        try {
            let pin = '';
            for (let i = 0; i < length; i++) {
                pin += Math.floor(Math.random() * 10);
            }
            return pin;
        } catch (error) {
            console.error('Error in generatePIN:', error);
            return '000000';
        }
    }

    static validatePasswordLength(length, min = 4, max = 50) {
        return length >= min && length <= max;
    }

    static validateWordCount(wordCount, min = 2, max = 8) {
        return wordCount >= min && wordCount <= max;
    }

    static validatePINLength(length, min = 4, max = 12) {
        return length >= min && length <= max;
    }
}

module.exports = PasswordGenerator;