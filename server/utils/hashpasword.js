const bcrypt = require('bcrypt');

(async () => {
    const hashedPassword = await bcrypt.hash('mainadmin1', 10);
    console.log('Hashed Password:', hashedPassword);
})();