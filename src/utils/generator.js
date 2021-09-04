let generateShortURL = async () => {
    var result = '';

    let currentYear = new Date();
    currentYear = currentYear.getFullYear().toString();
    result = result + currentYear.substr(currentYear.length - 2);

    var characters = 'ABCDEFGHJKMNPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < 6; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

module.exports = {
    generateShortURL
}