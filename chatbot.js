const Bot = require("node-telegram-bot-api");
const fs = require("fs");

const token = "661513500:AAFDUIJLOV3WXtg5Qcm5R8Y-gEmkXnNIRZw";
const bot = new Bot(token, { polling: true });

const apis = JSON.parse(fs.readFileSync("apis.json", "utf8"));

bot.on("message", msg => {
  const inputText = msg.text.toString();

  const category = respondByDifferentInputs(inputText);

  if (category) {
    bot.sendMessage(msg.chat.id, category);
  } else {
    bot.sendMessage(msg.chat.id, "wrong");
  }
});

function respondByDifferentInputs(inputText) {
  for (let category in apis) {
    if (apis[category].includes(inputText)) {
      return category;
    }
  }

  return null;
}
