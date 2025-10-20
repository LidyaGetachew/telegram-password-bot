require('dotenv').config();

const config = {
    botToken: process.env.BOT_TOKEN,
    passwordOptions: {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    },
    memorableWords: [
        'apple', 'brave', 'cloud', 'dance', 'eagle', 'flame', 'globe', 'heart',
        'ivory', 'jolly', 'kite', 'light', 'music', 'night', 'ocean', 'peace',
        'quiet', 'river', 'star', 'tree', 'unity', 'vivid', 'water', 'xenon',
        'young', 'zesty', 'amber', 'blaze', 'crisp', 'dream', 'ember', 'frost',
        'glow', 'haven', 'ice', 'jade', 'keen', 'lush', 'mint', 'nova'
    ]
};

module.exports = config;