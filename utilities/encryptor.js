const crypto = require("crypto")
require("dotenv").config();

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.ENCRYPTION_KEY, "base64")
const ivLength = 16;

function encrypt(text) {
    const iv = crypto.randomBytes(ivLength)
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
    return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text) {
    const [ivHex, encryptedHex] = text.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encryptedText = Buffer.from(encryptedHex, "hex");
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decrypted.toString();
}

module.exports = {encrypt, decrypt}