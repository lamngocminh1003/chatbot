import express from "express";
import viewEngine from "./config/viewEngine";
import bodyParser from "body-parser";
import initWebRoute from "./routes/web";
require("dotenv").config();
import chatbotService from "./services/chatbotService";
let app = express();

//config view engine
viewEngine(app);

//parse request to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init web routes
initWebRoute(app);

let port = process.env.PORT || 8080;
chatbotService.getSpecialtiesListTemplate();
app.listen(port, () => {
  console.log("chatbot is running: ", port);
});
