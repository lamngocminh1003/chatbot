require("dotenv").config();
import request from "request";
import chatbotService from "../services/chatbotService";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

let getHomePage = (req, res) => {
  return res.render("homepage.ejs");
};
let getWebhook = (req, res) => {
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};

let postWebhook = (req, res) => {
  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === "page") {
    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Return a '200 OK' response to all events
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

async function handleMessage(sender_psid, received_message) {
  let response;

  // Checks if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      text: `You sent the message: "${received_message.text}". Now send me an attachment!`,
    };
  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Đây có phải ảnh của bạn không?",
              subtitle: "Nhấn nút ở dưới để trả lời.",
              image_url: attachment_url,
              buttons: [
                {
                  type: "postback",
                  title: "Có!",
                  payload: "yes",
                },
                {
                  type: "postback",
                  title: "Không!",
                  payload: "no",
                },
              ],
            },
          ],
        },
      },
    };
  }

  // Send the response message
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
async function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;
  switch (payload) {
    case "yes":
      response = { text: "Thanks!" };
      break;
    case "no":
      response = { text: "Oops, try sending another image." };
      break;
    case "DOCTORS_LIST":
      await chatbotService.handleSendListDoctor(sender_psid);
      break;
    case "RESTART_BOT":
    case "GET_STARTED":
      await chatbotService.handleGetStarted(sender_psid);
      break;
    case "SPECIALTIES_LIST":
      await chatbotService.handleSendSpecialtiesList(sender_psid);
      break;
    case "CLINICS_LIST":
      await chatbotService.handleSendClinicsList(sender_psid);
      break;
    case "VIEW_NEUROLOGY":
      await chatbotService.handleDetailViewNeurology(sender_psid);
      break;
    case "VIEW_GASTROINTESTINAL":
      await chatbotService.handleDetailViewGastrointestinal(sender_psid);
      break;
    case "VIEW_EAR_NOSE_THROAT":
      await chatbotService.handleDetailViewEarNoseThroat(sender_psid);
      break;
    case "VIEW_MUSCULOSKELETAL":
      await chatbotService.handleDetailViewMusculoskeletal(sender_psid);
      break;
    case "VIEW_CARDIOLOGY":
      await chatbotService.handleDetailViewCardiology(sender_psid);
      break;
    case "BACK_TO_LIST_DOCTORS":
      await chatbotService.handleBackToDoctorsList(sender_psid);
      break;
    case "VIEW_DETAIL_EXSON":
      await chatbotService.handleDetailViewExson(sender_psid);
      break;
    case "VIEW_DETAIL_AN_VIET":
      await chatbotService.handleDetailViewAnViet(sender_psid);
      break;
    case "VIEW_DETAIL_THU_CUC":
      await chatbotService.handleDetailViewThuCuc(sender_psid);
      break;
    case "VIEW_DETAIL_MEDLATEC":
      await chatbotService.handleDetailViewMedlatec(sender_psid);
      break;
    case "VIEW_DETAIL_CHO_RAY":
      await chatbotService.handleDetailViewChoRay(sender_psid);
      break;
    case "SHOW_CLINICS":
      await chatbotService.handleSendClinicsList(sender_psid);
      break;
    default:
      response = {
        text: `Oh no! i don't know response with postback ${payload}`,
      };
  }
  // // Send the message to acknowledge the postback
  // callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}
let setupProfile = async (req, res) => {
  // Construct the message body
  let request_body = {
    get_started: { payload: "GET_STARTED" },
    whitelisted_domains: ["https://chatbot-i019.onrender.com/"],
  };

  // Send the HTTP request to the Messenger Platform
  await request(
    {
      uri: `https://graph.facebook.com/v17.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      console.log(body);
      if (!err) {
        console.log("setup user profile succeed !");
      } else {
        console.error("Unable to setup user profile:" + err);
      }
    }
  );
  return res.send("setup user profile succeed !");
};

let setupPersistentMenu = async (req, res) => {
  // Construct the message body
  let request_body = {
    persistent_menu: [
      {
        locale: "default",
        composer_input_disabled: false,
        call_to_actions: [
          {
            type: "postback",
            title: "Khởi động lại bot",
            payload: "RESTART_BOT",
          },
          {
            type: "web_url",
            title: "Facebook BookingCare",
            url: "https://www.facebook.com/%C4%90%E1%BA%B7t-l%E1%BB%8Bch-kh%C3%A1m-b%E1%BB%87nh-tr%E1%BB%B1c-tuy%E1%BA%BFn-114423351658634",
            webview_height_ratio: "full",
          },
          {
            type: "web_url",
            title: "Website BookingCare",
            url: "https://chatbot-i019.onrender.com/",
            webview_height_ratio: "full",
          },
        ],
      },
    ],
  };

  // Send the HTTP request to the Messenger Platform
  await request(
    {
      uri: `https://graph.facebook.com/v17.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      console.log(body);
      if (!err) {
        console.log("setup persistent menu succeed !");
      } else {
        console.error("Unable to setup persistent menu profile:" + err);
      }
    }
  );
  return res.send("setup persistent menu  succeed !");
};
let handelBooking = (req, res) => {
  return res.render("booking.ejs");
};
module.exports = {
  getHomePage: getHomePage,
  postWebhook: postWebhook,
  getWebhook: getWebhook,
  setupProfile: setupProfile,
  setupPersistentMenu: setupPersistentMenu,
  handelBooking: handelBooking,
};
