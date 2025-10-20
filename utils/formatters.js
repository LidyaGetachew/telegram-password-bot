class Formatters {
    static escapeMarkdown(text) {
        if (!text || typeof text !== 'string') {
            return text || '';
        }
        return text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, '\\$1');
    }

    static formatPasswordResponse(type, password, options = {}) {
        // Ensure password is a string
        const safePassword = password || '';
        const escapedPassword = this.escapeMarkdown(safePassword);
        
        const baseMessage = {
            parse_mode: 'MarkdownV2',
            text: ''
        };

        const templates = {
            password: `
🔐 *Generated Password*

📏 Length: ${options.length || 12} characters
🔑 Password: \`${escapedPassword}\`

💡 *Security Tips:*
• Don't share this password
• Use a password manager
• Enable 2FA when available
            `,
            memorable: `
📝 *Memorable Password*

📊 Words: ${options.wordCount || 4}
🔗 Separator: "${this.escapeMarkdown(options.separator || '-')}"
🔑 Password: \`${escapedPassword}\`

💡 *Perfect for:*
• Easy\\-to\\-remember passwords
• Wi\\-Fi passwords
• Less critical accounts
            `,
            pin: `
🔢 *Generated PIN*

📏 Length: ${options.length || 6} digits
🔑 PIN: \`${safePassword}\`

💡 *Common uses:*
• Phone unlock codes
• Bank card PINs
• Simple device locks
            `,
            strong: `
💪 *Strong Password*

📏 Length: ${options.length || 16} characters
🔑 Password: \`${escapedPassword}\`

✅ *Features:*
• Upper & lowercase letters
• Numbers
• Special symbols
• High entropy

🔒 *Ideal for:*
• Email accounts
• Banking websites
• Important services
            `,
            custom: `
🎛️ *Custom Password*

📏 Length: ${options.length || 12} characters
📋 Types: ${(options.typeDescription || []).join(', ')}
🔑 Password: \`${escapedPassword}\`

⚙️ *Configuration:*
${options.configuration || 'No configuration provided'}
            `
        };

        baseMessage.text = templates[type]?.trim() || 'An error occurred while generating the password.';
        return baseMessage;
    }

    static formatSimpleResponse(password, length) {
        const safePassword = password || '';
        const safeLength = length || 12;
        return `🔐 Password Generated\n\nLength: ${safeLength} characters\nPassword: ${safePassword}\n\n💡 Don't share this password and consider using a password manager!`;
    }
}

module.exports = Formatters;