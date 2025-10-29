require('dotenv').config();
const os = require('os');

module.exports = {
    PORT: process.env.PORT || 80,
    IP: (function () {
        const interfaces = os.networkInterfaces();
        for (const name in interfaces) {
            for (const iface of interfaces[name]) {
                if (iface.family === "IPv4" && !iface.internal) {
                    return iface.address;
                }
            }
        }
        return "127.0.0.1";
    })()
}