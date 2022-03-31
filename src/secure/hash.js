const util = require('util');
const crypto = require('crypto');
const strongHash = util.promisify(crypto.pbkdf2);

const hash = async (password, salt) => {
  salt = salt || crypto.randomBytes(16).toString('hex');
  let hashed = await strongHash(password, salt, 1000, 16, 'sha512');
  hashed = hashed.toString('hex');
  return {
    hashed,
    salt,
  };
};

module.exports = hash;
