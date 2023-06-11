require("dotenv").config();
import request from "request";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
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
const IMAGE_CHO_RAY =
  "https://cdn.bookingcare.vn/fr/w500/2019/03/11/152704logo-bvcr-moi.jpg";
const IMAGE_MEDLATEC =
  "https://cdn.bookingcare.vn/fr/w500/2022/08/29/104922-logo-med-tai-ha-noi--01.png";
const IMAGE_THU_CUC =
  "https://cdn.bookingcare.vn/fr/w500/2021/04/07/103904-logo-thucuc.png";
const IMAGE_EXSON =
  "https://cdn.bookingcare.vn/fr/w500/2018/12/12/112054logo-phong-kham-da-khoa-quoc-te-exson1.jpg";
const IMAGE_AN_VIET =
  "https://cdn.bookingcare.vn/fr/w500/2020/02/18/170749-benh-vien-an-viet.jpg";
const IMAGE_DOCTOR1 =
  "https://cdn.bookingcare.vn/fr/w200/2022/05/05/104945-nguyen-van-quynh-pgs.jpg";
const IMAGE_DOCTOR2 =
  "https://cdn.bookingcare.vn/fr/w200/2019/12/31/160952-pgs-nguyen-ngoc-tuoc.jpg";
const IMAGE_DOCTOR3 =
  "https://cdn.bookingcare.vn/fr/w200/2022/12/08/092836-bsi-hang-hong-ngoc.png";
const IMAGE_DOCTOR4 =
  "https://cdn.bookingcare.vn/fr/w200/2017/12/22/155419nguyen-thi-kim-loan.jpg";
const IMAGE_DOCTOR5 =
  "https://cdn.bookingcare.vn/fr/w200/2019/12/31/161632-pgs-nguyen-vinh-ngoc.jpg";
const IMAGE_DOCTOR6 =
  "https://cdn.bookingcare.vn/fr/w200/2022/09/21/110559-bs-kim-dung.jpg";
const IMAGE_DOCTOR7 =
  "https://cdn.bookingcare.vn/fr/w200/2020/01/03/090559-pgs-nguyen-thi-hoai-an.jpg";
const IMAGE_DOCTOR8 =
  "https://cdn.bookingcare.vn/fr/w200/2021/06/26/121515-bs-nguyen-van-ly.jpg";
const IMAGE_DOCTOR9 =
  "https://cdn.bookingcare.vn/fr/w200/2019/06/25/165749bs-nguyen-ngoc-phan.jpg";
const IMAGE_DOCTOR10 =
  "https://cdn.bookingcare.vn/fr/w200/2019/12/31/155650-gs-ha-van-quyet.jpg";
const IMAGE_DOCTOR11 =
  "https://cdn.bookingcare.vn/fr/w200/2020/01/03/084535-bsckii-le-tuyet-anh.jpg";
const IMAGE_DOCTOR12 =
  "https://cdn.bookingcare.vn/fr/w200/2019/10/03/105755bs-bui-minh-ha.jpg";
const IMAGE_DOCTOR13 =
  "https://cdn.bookingcare.vn/fr/w200/2017/12/23/170155nguyen-van-doanh.jpg";
const IMAGE_DOCTOR14 =
  "https://cdn.bookingcare.vn/fr/w200/2020/01/03/084302-pgs-nguyen-trong-hung.jpg";
const IMAGE_DOCTOR15 =
  "https://cdn.bookingcare.vn/fr/w200/2022/07/29/181442-6f0641e81e0ddc53851c.jpg";
let callSendAPI = async (sender_psid, response) => {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };
  await sendTypingOn(sender_psid);
  await sendMarkReadMessage(sender_psid);
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
let sendTypingOn = (sender_psid) => {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    sender_action: "typing_on",
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
        console.log("sendTypingOn sent!");
      } else {
        console.error("Unable to send sendTypingOn:" + err);
      }
    }
  );
};
let sendMarkReadMessage = (sender_psid) => {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    sender_action: "mark_seen",
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
        console.log("sendMarkReadMessage sent!");
      } else {
        console.error("Unable to send sendMarkReadMessage:" + err);
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

let getStartedTemplate = (senderID) => {
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
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
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
      let response1 = getListDoctorTemplate(sender_psid);
      await callSendAPI(sender_psid, response1);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};
let getListDoctorTemplate = (senderID) => {
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
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
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
      let response1 = getSpecialtiesListTemplate(sender_psid);
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
          {
            title: "Chuyên khoa tim mạch",
            subtitle:
              "Sở hữu danh sách các bác sĩ tim mạch uy tín đầu ngành tại Việt Nam",
            image_url: IMAGE_CARDIOLOGY,
            buttons: [
              {
                type: "postback",
                title: "Xem chi tiết",
                payload: "VIEW_CARDIOLOGY",
              },
            ],
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại danh sách bác sĩ",
            image_url: IMAGE_LIST_DOCTORS,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ LẠI",
                payload: "BACK_TO_LIST_DOCTORS",
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
      let response1 = getClinicsListTemplate(sender_psid);
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
            title: "Bệnh viện Chợ Rẫy",
            subtitle:
              "Bệnh viện Chợ Rẫy với lịch sử thành lập trên 100 năm, là bệnh viện hạng đặc biệt tuyến Trung ương lớn nhất cả nước với trên 1.800 giường và trên 3.000 kỹ thuật y tế được thực hiện.",
            image_url: IMAGE_CHO_RAY,
            buttons: [
              {
                type: "postback",
                title: "Xem chi tiết",
                payload: "VIEW_DETAIL_CHO_RAY",
              },
            ],
          },
          {
            title: "Hệ thống y tế MEDLATEC ",
            subtitle: "Đội ngũ bác sĩ giàu kinh nghiệm",
            image_url: IMAGE_MEDLATEC,
            buttons: [
              {
                type: "postback",
                title: "Xem chi tiết",
                payload: "VIEW_DETAIL_MEDLATEC",
              },
            ],
          },
          {
            title: "Hệ thống Y tế Thu Cúc TCI",
            subtitle:
              "Hệ thống Y tế Thu Cúc TCI tự hào là đơn vị y tế được hàng triệu người dân tin tưởng và Sở Y tế công nhận",
            image_url: IMAGE_THU_CUC,
            buttons: [
              {
                type: "postback",
                title: "Xem chi tiết",
                payload: "VIEW_DETAIL_THU_CUC",
              },
            ],
          },
          {
            title: "Bệnh viện Đa khoa An Việt",
            subtitle:
              "Bệnh viện An Việt là bệnh viện đa khoa tư nhân đã hoạt động được trên 10 năm.",
            image_url: IMAGE_AN_VIET,
            buttons: [
              {
                type: "postback",
                title: "Xem chi tiết",
                payload: "VIEW_DETAIL_AN_VIET",
              },
            ],
          },
          {
            title: "Phòng khám Quốc tế EXSON",
            subtitle:
              "Phòng khám Quốc tế EXSON là phòng khám đa khoa tư nhân chuyên sâu về điều trị các bệnh lý cột sống và tủy sống.",
            image_url: IMAGE_EXSON,
            buttons: [
              {
                type: "postback",
                title: "Xem chi tiết",
                payload: "VIEW_DETAIL_EXSON",
              },
            ],
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại danh sách bác sĩ",
            image_url: IMAGE_LIST_DOCTORS,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ LẠI",
                payload: "BACK_TO_LIST_DOCTORS",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
let handleBackToDoctorsList = async (sender_psid) => {
  await handleSendListDoctor(sender_psid);
};
let handleDetailViewCardiology = async (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDetailViewCardiology(sender_psid);
      await callSendAPI(sender_psid, response1);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailViewCardiology = (senderID) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Phó giáo sư Nguyễn Văn Quýnh",
            subtitle:
              "Chuyên gia hàng đầu về nội tim mạch với hơn 30 năm kinh nghiệm",
            image_url: IMAGE_DOCTOR1,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "PGs.Ts Nguyễn Ngọc Tước",
            subtitle: "Chuyên gia đầu ngành về bệnh lý Nội tim mạch",
            image_url: IMAGE_DOCTOR2,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Bác sĩ Lê Thị Thanh Hằng",
            subtitle: "Gần 40 năm kinh nghiệm trong lĩnh vực Tim mạch",
            image_url: IMAGE_DOCTOR3,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại danh sách bác sĩ",
            image_url: IMAGE_LIST_DOCTORS,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ LẠI",
                payload: "BACK_TO_LIST_DOCTORS",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
let handleDetailViewMusculoskeletal = async (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDetailViewMusculoskeletal(sender_psid);
      await callSendAPI(sender_psid, response1);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailViewMusculoskeletal = (senderID) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Bác sĩ Nguyễn Thị Kim Loan",
            subtitle: "Nguyên Trưởng khoa Cơ xương khớp, Bệnh viện E Hà Nội",
            image_url: IMAGE_DOCTOR4,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Bác sĩ Nguyễn Vĩnh Ngọc",
            subtitle: "Trưởng phân môn khớp, Đại học Y Hà Nội",
            image_url: IMAGE_DOCTOR5,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Bác sĩ Võ Thị Kim Dung",
            subtitle:
              "Hơn 30 năm kinh nghiệm khám và điều trị chuyên khoa Nội Cơ xương khớp",
            image_url: IMAGE_DOCTOR6,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại danh sách bác sĩ",
            image_url: IMAGE_LIST_DOCTORS,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ LẠI",
                payload: "BACK_TO_LIST_DOCTORS",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
let handleDetailViewEarNoseThroat = async (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDetailViewEarNoseThroat(sender_psid);
      await callSendAPI(sender_psid, response1);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailViewEarNoseThroat = (senderID) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Bác sĩ Nguyễn Thị Hoài An",
            subtitle: "Nguyên Trưởng khoa Tai mũi họng trẻ em",
            image_url: IMAGE_DOCTOR7,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Bác sĩ Nguyễn Văn Lý",
            subtitle: "Nguyên Trưởng khoa Tai mũi họng",
            image_url: IMAGE_DOCTOR8,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Bác sĩ Nguyễn Ngọc Phấn",
            subtitle: "Nguyên bác sĩ Tai Mũi Họng Bệnh viện Đa khoa Hồng Ngọc",
            image_url: IMAGE_DOCTOR9,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại danh sách bác sĩ",
            image_url: IMAGE_LIST_DOCTORS,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ LẠI",
                payload: "BACK_TO_LIST_DOCTORS",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
let handleDetailViewGastrointestinal = async (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDetailViewGastrointestinal(sender_psid);
      await callSendAPI(sender_psid, response1);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailViewGastrointestinal = (senderID) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Giáo sư, Tiến sĩ Hà Văn Quyết",
            subtitle:
              "Chuyên gia trên 35 năm kinh nghiệm trong lĩnh vực bệnh lý Tiêu hóa",
            image_url: IMAGE_DOCTOR10,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Bác sĩ Lê Tuyết Anh",
            subtitle:
              "Nguyên bác sĩ Chuyên khoa II chuyên ngành Tiêu hóa, Bệnh viện Bạch Mai",
            image_url: IMAGE_DOCTOR11,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Bác sĩ Chuyên khoa I Bùi Minh Hà",
            subtitle: "Bác sĩ Chuyên khoa Nội Tiêu hóa",
            image_url: IMAGE_DOCTOR12,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại danh sách bác sĩ",
            image_url: IMAGE_LIST_DOCTORS,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ LẠI",
                payload: "BACK_TO_LIST_DOCTORS",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
let handleDetailViewNeurology = async (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDetailViewNeurology(sender_psid);
      await callSendAPI(sender_psid, response1);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailViewNeurology = (senderID) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Tiến sĩ, Bác sĩ Nguyễn Văn Doanh",
            subtitle:
              "Bác sĩ có 40 năm kinh nghiệm làm việc chuyên khoa Nội Thần kinh",
            image_url: IMAGE_DOCTOR13,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Bác sĩ Nguyễn Trọng Hưng",
            subtitle:
              "Nguyên Trưởng khoa Tâm Thần kinh - Bệnh viện Lão Khoa Trung ương - Nguyên Bác sỹ Khoa Thần kinh - Bệnh viện Bạch Mai",
            image_url: IMAGE_DOCTOR14,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Tiến sĩ Kiều Đình Hùng",
            subtitle:
              "Trên 20 năm kinh nghiệm công tác ở khoa Phẫu thuật thần kinh - Bệnh viện Việt Đức",
            image_url: IMAGE_DOCTOR15,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại danh sách bác sĩ",
            image_url: IMAGE_LIST_DOCTORS,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ LẠI",
                payload: "BACK_TO_LIST_DOCTORS",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
let handleDetailViewChoRay = async (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDetailViewChoRay(sender_psid);
      await callSendAPI(sender_psid, response1);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailViewChoRay = (senderID) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Bác sĩ Nguyễn Thị Hoài An",
            subtitle: "Nguyên Trưởng khoa Tai mũi họng trẻ em",
            image_url: IMAGE_DOCTOR7,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Giáo sư, Tiến sĩ Hà Văn Quyết",
            subtitle:
              "Chuyên gia trên 35 năm kinh nghiệm trong lĩnh vực bệnh lý Tiêu hóa",
            image_url: IMAGE_DOCTOR10,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Tiến sĩ, Bác sĩ Nguyễn Văn Doanh",
            subtitle:
              "Bác sĩ có 40 năm kinh nghiệm làm việc chuyên khoa Nội Thần kinh",
            image_url: IMAGE_DOCTOR13,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại danh sách bác sĩ",
            image_url: IMAGE_LIST_DOCTORS,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ LẠI",
                payload: "BACK_TO_LIST_DOCTORS",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
let handleDetailViewMedlatec = async (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDetailViewMedlatec(sender_psid);
      await callSendAPI(sender_psid, response1);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailViewMedlatec = (senderID) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Bác sĩ Nguyễn Văn Lý",
            subtitle: "Nguyên Trưởng khoa Tai mũi họng",
            image_url: IMAGE_DOCTOR8,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Bác sĩ Lê Tuyết Anh",
            subtitle:
              "Nguyên bác sĩ Chuyên khoa II chuyên ngành Tiêu hóa, Bệnh viện Bạch Mai",
            image_url: IMAGE_DOCTOR11,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Bác sĩ Nguyễn Trọng Hưng",
            subtitle:
              "Nguyên Trưởng khoa Tâm Thần kinh - Bệnh viện Lão Khoa Trung ương - Nguyên Bác sỹ Khoa Thần kinh - Bệnh viện Bạch Mai",
            image_url: IMAGE_DOCTOR14,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại danh sách bác sĩ",
            image_url: IMAGE_LIST_DOCTORS,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ LẠI",
                payload: "BACK_TO_LIST_DOCTORS",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
let handleDetailViewThuCuc = async (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDetailViewThuCuc(sender_psid);
      await callSendAPI(sender_psid, response1);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailViewThuCuc = (senderID) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Bác sĩ Nguyễn Ngọc Phấn",
            subtitle: "Nguyên bác sĩ Tai Mũi Họng Bệnh viện Đa khoa Hồng Ngọc",
            image_url: IMAGE_DOCTOR9,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Bác sĩ Chuyên khoa I Bùi Minh Hà",
            subtitle: "Bác sĩ Chuyên khoa Nội Tiêu hóa",
            image_url: IMAGE_DOCTOR12,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Tiến sĩ Kiều Đình Hùng",
            subtitle:
              "Trên 20 năm kinh nghiệm công tác ở khoa Phẫu thuật thần kinh - Bệnh viện Việt Đức",
            image_url: IMAGE_DOCTOR15,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại danh sách bác sĩ",
            image_url: IMAGE_LIST_DOCTORS,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ LẠI",
                payload: "BACK_TO_LIST_DOCTORS",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
let handleDetailViewAnViet = async (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDetailViewAnViet(sender_psid);
      await callSendAPI(sender_psid, response1);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailViewAnViet = (senderID) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Phó giáo sư Nguyễn Văn Quýnh",
            subtitle:
              "Chuyên gia hàng đầu về nội tim mạch với hơn 30 năm kinh nghiệm",
            image_url: IMAGE_DOCTOR1,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Bác sĩ Nguyễn Thị Kim Loan",
            subtitle: "Nguyên Trưởng khoa Cơ xương khớp, Bệnh viện E Hà Nội",
            image_url: IMAGE_DOCTOR4,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Bác sĩ Nguyễn Ngọc Phấn",
            subtitle: "Nguyên bác sĩ Tai Mũi Họng Bệnh viện Đa khoa Hồng Ngọc",
            image_url: IMAGE_DOCTOR9,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại danh sách bác sĩ",
            image_url: IMAGE_LIST_DOCTORS,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ LẠI",
                payload: "BACK_TO_LIST_DOCTORS",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
let handleDetailViewExson = async (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDetailViewExson(sender_psid);
      await callSendAPI(sender_psid, response1);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailViewExson = (senderID) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Bác sĩ Võ Thị Kim Dung",
            subtitle:
              "Hơn 30 năm kinh nghiệm khám và điều trị chuyên khoa Nội Cơ xương khớp",
            image_url: IMAGE_DOCTOR6,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Bác sĩ Lê Thị Thanh Hằng",
            subtitle: "Gần 40 năm kinh nghiệm trong lĩnh vực Tim mạch",
            image_url: IMAGE_DOCTOR3,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "PGs.Ts Nguyễn Ngọc Tước",
            subtitle: "Chuyên gia đầu ngành về bệnh lý Nội tim mạch",
            image_url: IMAGE_DOCTOR2,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Bác sĩ Nguyễn Vĩnh Ngọc",
            subtitle: "Trưởng phân môn khớp, Đại học Y Hà Nội",
            image_url: IMAGE_DOCTOR5,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_BOOKING}/${senderID}`,
                title: "ĐẶT LỊCH KHÁM",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại danh sách bác sĩ",
            image_url: IMAGE_LIST_DOCTORS,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ LẠI",
                payload: "BACK_TO_LIST_DOCTORS",
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
  handleBackToDoctorsList: handleBackToDoctorsList,
  handleDetailViewCardiology: handleDetailViewCardiology,
  handleDetailViewMusculoskeletal: handleDetailViewMusculoskeletal,
  handleDetailViewEarNoseThroat: handleDetailViewEarNoseThroat,
  handleDetailViewGastrointestinal: handleDetailViewGastrointestinal,
  handleDetailViewNeurology: handleDetailViewNeurology,
  handleDetailViewMedlatec: handleDetailViewMedlatec,
  handleDetailViewThuCuc: handleDetailViewThuCuc,
  handleDetailViewAnViet: handleDetailViewAnViet,
  handleDetailViewExson: handleDetailViewExson,
  handleDetailViewChoRay: handleDetailViewChoRay,
};
