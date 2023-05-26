require("dotenv").config();
import request from "request"

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const IMAGE_GET_STARTED = 'https://bookingcare.vn/assets/anh/bookingcare-cover-4.jpg'
let callSendAPI = (sender_psid, response)=>{
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
      uri: "https://graph.facebook.com/v9.0/me/messages",
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

let getUserName = (sender_psid) => {
  // Send the HTTP request to the Messenger Platform
  return new Promise ((resolve,reject)=>{
      request(
       {
         "uri": `https://graph.facebook.com/${sender_psid}?fields=last_name,first_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
         "method": "GET",
       },
       (err, res, body) => {
         if (!err) {
           body = JSON.parse(body);
           let username = `${body.last_name} ${body.first_name}`;
           resolve(username)
         } else {
           console.error("Unable to send message:" + err);
           reject(err);
         }
       }
     );
  })
}

let handleGetStarted = (sender_psid)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let username = await getUserName(sender_psid);
            let response1 = { "text": `Xin chào ${username} đến với đặt lịch khám bệnh trực tuyến!` };
            let response2 = sendGetStartedTemplate();
            //send text message
            await callSendAPI(sender_psid, response1)
            //send generic template message
            await callSendAPI(sender_psid, response2)

            resolve('done')
        } catch (error) {
            reject(error)
        }
    })
}

let sendGetStartedTemplate =() =>{
    let response = {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [
              {
                title: "Xin chào bạn đến với đặt lịch khám bệnh trực tuyến",
                subtitle: "Dưới đây là các lựa chọn của chúng tôi",
                image_url: IMAGE_GET_STARTED,
                buttons: [
                  {
                    type: "postback",
                    title: "DANH SÁCH BÁC SĨ GIỎI",
                    payload: "DOCTORS_LIST",
                  },
                  {
                    type: "postback",
                    title: "ĐẶT LỊCH KHÁM",
                    payload: "BOOKING",
                  },
                  {
                    type: "postback",
                    title: "HƯỚNG DẪN SỬ DỤNG BOT",
                    payload: "GUIDE_TO_USE",
                  },
                ],
              },
            ],
          },
        },
      };
    return response;
}

module.exports={
    callSendAPI:callSendAPI,
    handleGetStarted:handleGetStarted,
    getUserName:getUserName,
    sendGetStartedTemplate:sendGetStartedTemplate
}