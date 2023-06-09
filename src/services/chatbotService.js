require("dotenv").config();
import request from "request";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const IMAGE_GET_STARTED =
  "https://bookingcare.vn/assets/anh/bookingcare-cover-4.jpg";
const IMAGE_LIST_DOCTORS =
  "https://cdn.bookingcare.vn/fr/w300/2020/12/09/100650-doctor-57101521920.jpg";
const HOURS_OPEN =
  "https://cdn.bookingcare.vn/fr/w300/2020/07/17/085420-dia-chi-kham-san-phu-khoa-ha-noi.jpg";
const BACKGROUND_CLINIC =
  "https://images2.thanhnien.vn/Uploaded/hongky-qc/2022_06_24/image2-6316.jpeg";
const IMAGE_NEUROLOGY =
  "https://cdn.bookingcare.vn/fr/w300/2019/12/13/121042-than-kinh.jpg";
const IMAGE_GASTROINTESTINAL =
  "https://cdn.bookingcare.vn/fr/w300/2019/12/13/120933-tieu-hoa.jpg";
const IMAGE_EAR_NOSE_THROAT =
  "https://cdn.bookingcare.vn/fr/w300/2019/12/13/121146-tai-mui-hong.jpg";
const IMAGE_MUSCULOSKELETAL =
  "https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg";
const IMAGE_CARDIOLOGY =
  "https://cdn.bookingcare.vn/fr/w300/2019/12/13/120741-tim-mach.jpg";
let callSendAPI = (sender_psid, response) => {
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
};

let getUserName = (sender_psid) => {
  // Send the HTTP request to the Messenger Platform
  return new Promise((resolve, reject) => {
    request(
      {
        uri: `https://graph.facebook.com/${sender_psid}?fields=last_name,first_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
        method: "GET",
      },
      (err, res, body) => {
        if (!err) {
          body = JSON.parse(body);
          let username = `${body.last_name} ${body.first_name}`;
          resolve(username);
        } else {
          console.error("Unable to send message:" + err);
          reject(err);
        }
      }
    );
  });
};

let handleGetStarted = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let username = await getUserName(sender_psid);
      let response1 = {
        text: `Xin chào ${username} đến với đặt lịch khám bệnh trực tuyến!`,
      };
      let response2 = getStartedTemplate();
      //send text message
      await callSendAPI(sender_psid, response1);
      //send generic template message
      await callSendAPI(sender_psid, response2);

      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};

let getStartedTemplate = () => {
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
};
let handleSendListDoctor = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getListDoctorTemplate();
      await callSendAPI(sender_psid, response1);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};
let getListDoctorTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Danh sách phòng khám & chuyên khoa phát triển và uy tín ",
            subtitle:
              "Chúng tôi hân hạnh mang đến cho bạn trải nghiệm khám bệnh một cách tuyệt vời",
            image_url: IMAGE_LIST_DOCTORS,
            buttons: [
              {
                type: "postback",
                title: "DANH SÁCH CHUYÊN KHOA PHÁT TRIỂN",
                payload: "SPECIALTIES_LIST",
              },
              {
                type: "postback",
                title: "DANH SÁCH PHÒNG KHÁM UY TÍN",
                payload: "CLINICS_LIST",
              },
            ],
          },
          {
            title: "Các khung giờ khám bệnh",
            subtitle: "24/7",
            image_url: HOURS_OPEN,
            buttons: [
              {
                type: "postback",
                title: "ĐẶT LỊCH KHÁM",
                payload: "BOOKING",
              },
            ],
          },
          {
            title: "Không gian các phòng khám",
            subtitle:
              "Các phòng khám đều có sức chứa lên đến 500 bệnh nhân và sở hữu đa dạng các chuyên khoa ",
            image_url: BACKGROUND_CLINIC,
            buttons: [
              {
                type: "postback",
                title: "CHI TIẾT PHÒNG KHÁM",
                payload: "SHOW_CLINICS",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
let handleSendSpecialtiesList = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getSpecialtiesListTemplate();
      await callSendAPI(sender_psid, response1);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};
let getSpecialtiesListTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Chuyên khoa thần kinh",
            subtitle:
              "Sở hữu danh sách các giáo sư, bác sĩ chuyên khoa Thần kinh giỏi",
            image_url: IMAGE_NEUROLOGY,
            buttons: [
              {
                type: "postback",
                title: "Xem chi tiết",
                payload: "VIEW_NEUROLOGY",
              },
            ],
          },
          {
            title: "Chuyên khoa tiêu hóa",
            subtitle:
              "Sở hữu danh sách các bác sĩ Tiêu hóa uy tín đầu ngành tại Việt Nam",
            image_url: IMAGE_GASTROINTESTINAL,
            buttons: [
              {
                type: "postback",
                title: "Xem chi tiết",
                payload: "VIEW_GASTROINTESTINAL",
              },
            ],
          },
          {
            title: "Chuyên khoa tai mũi họng",
            subtitle:
              "Sở hữu danh sách các bác sĩ uy tín đầu ngành tại Việt Nam",
            image_url: IMAGE_EAR_NOSE_THROAT,
            buttons: [
              {
                type: "postback",
                title: "Xem chi tiết",
                payload: "VIEW_EAR_NOSE_THROAT",
              },
            ],
          },
          {
            title: "Chuyên khoa cơ xương khớp",
            subtitle:
              "Sở hữu danh sách các bác sĩ uy tín đầu ngành Cơ Xương Khớp tại Việt Nam",
            image_url: IMAGE_MUSCULOSKELETAL,
            buttons: [
              {
                type: "postback",
                title: "Xem chi tiết",
                payload: "VIEW_MUSCULOSKELETAL",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
let handleSendClinicsList = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getClinicsListTemplate();
      await callSendAPI(sender_psid, response1);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};
let getClinicsListTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Danh sách phòng khám & bác sĩ uy tín và lành nghề",
            subtitle:
              "Chúng tôi hân hạnh mang đến cho bạn trải nghiệm khám bệnh một cách tuyệt vời",
            image_url: IMAGE_LIST_DOCTORS,
            buttons: [
              {
                type: "postback",
                title: "DANH SÁCH BÁC SĨ GIỎI",
                payload: "DOCTORS_LIST",
              },
              {
                type: "postback",
                title: "DANH SÁCH PHÒNG KHÁM UY TÍN",
                payload: "CLINICS_LIST",
              },
            ],
          },
          {
            title: "Các khung giờ khám bệnh",
            subtitle: "24/7",
            image_url: HOURS_OPEN,
            buttons: [
              {
                type: "postback",
                title: "ĐẶT LỊCH KHÁM",
                payload: "BOOKING",
              },
            ],
          },
          {
            title: "Không gian các phòng khám",
            subtitle:
              "Các phòng khám đều có sức chứa lên đến 500 bệnh nhân và sở hữu đa dạng các chuyên khoa ",
            image_url: BACKGROUND_CLINIC,
            buttons: [
              {
                type: "postback",
                title: "CHI TIẾT PHÒNG KHÁM",
                payload: "SHOW_CLINICS",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
module.exports = {
  callSendAPI: callSendAPI,
  handleGetStarted: handleGetStarted,
  getUserName: getUserName,
  getStartedTemplate: getStartedTemplate,
  handleSendListDoctor: handleSendListDoctor,
  handleSendSpecialtiesList: handleSendSpecialtiesList,
  handleSendClinicsList: handleSendClinicsList,
};
