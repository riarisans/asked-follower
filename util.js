const source = "1234567890qwertyuiopasdfghjklzxcvbnm";

function randomString(len) {
    let res = "";

    for (let i = 0; i < len; i++) {
        res += source[random(0, source.length)];
    }
    return res;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    randomString,
};
