"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("./api/index");
const { PORT = 9090 } = process.env;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}!`);
});
