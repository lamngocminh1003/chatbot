import express from "express";
import chatbotController from "../controllers/chatbotController";
let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", chatbotController.getHomePage);
  //setup get started buttons, whitelisted domain
  router.post("/setup-profile", chatbotController.setupProfile);

  //setup persistent menu
  router.post("/setup-persistent-menu", chatbotController.setupPersistentMenu);

  router.get("/webhook", chatbotController.getWebhook);
  router.post("/webhook", chatbotController.postWebhook);

  router.get("/booking/:senderId", chatbotController.handelBooking);
  router.post("/reserve-table-ajax", chatbotController.handelPostBooking);

  return app.use("/", router);
};
module.exports = initWebRoutes;
