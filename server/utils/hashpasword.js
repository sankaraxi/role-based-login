const bcrypt = require('bcrypt');

(async () => {
    const hashedPassword = await bcrypt.hash('admin1234', 10);
    console.log('Hashed Password:', hashedPassword);
})();