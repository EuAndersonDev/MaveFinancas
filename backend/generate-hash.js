const bcrypt = require('bcrypt');

// Gerar hash para a senha "teste123"
const senha = 'teste123';
const saltRounds = 10;

bcrypt.hash(senha, saltRounds, (err, hash) => {
    if (err) {
        console.error('Erro ao gerar hash:', err);
        return;
    }
    console.log('=================================');
    console.log('Hash gerado para senha "teste123":');
    console.log(hash);
    console.log('=================================');
    console.log('\nAtualize o seed-test-data.sql com este hash!');
});
