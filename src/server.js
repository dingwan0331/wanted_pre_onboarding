const http = require("http");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

const PORT = process.env.SERVER_PORT || 8000;
const server = http.createServer(app);

const serverStart = () => {
  try {
    server.listen(PORT, () => {
      console.log(`listening on ${PORT}!`);
    });
  } catch (err) {
    console.error(err);
  }
};

serverStart();
