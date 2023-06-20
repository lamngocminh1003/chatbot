"use strict";
const IMAGE_LIST_DOCTORS =
  "https://cdn.bookingcare.vn/fr/w300/2020/12/09/100650-doctor-57101521920.jpg";
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
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Product",
      [
        {
          title: "Danh sách phòng khám & chuyên khoa phát triển và uy tín ",
          subtitle:
            "Chúng tôi hân hạnh mang đến cho bạn trải nghiệm khám bệnh một cách tuyệt vời",
          image_url: IMAGE_LIST_DOCTORS,
          payload: "SPECIALTIES_LIST",
        },
        {
          title: "Chuyên khoa thần kinh",
          subtitle:
            "Sở hữu danh sách các giáo sư, bác sĩ chuyên khoa Thần kinh giỏi",
          image_url: IMAGE_NEUROLOGY,
          payload: "VIEW_NEUROLOGY",
        },
        {
          title: "Chuyên khoa tiêu hóa",
          subtitle:
            "Sở hữu danh sách các bác sĩ Tiêu hóa uy tín đầu ngành tại Việt Nam",
          image_url: IMAGE_GASTROINTESTINAL,
          payload: "VIEW_GASTROINTESTINAL",
        },
        {
          title: "Chuyên khoa tai mũi họng",
          subtitle: "Sở hữu danh sách các bác sĩ uy tín đầu ngành tại Việt Nam",
          image_url: IMAGE_EAR_NOSE_THROAT,
          payload: "VIEW_EAR_NOSE_THROAT",
        },
        {
          title: "Chuyên khoa cơ xương khớp",
          subtitle:
            "Sở hữu danh sách các bác sĩ uy tín đầu ngành Cơ Xương Khớp tại Việt Nam",
          image_url: IMAGE_MUSCULOSKELETAL,
          payload: "VIEW_MUSCULOSKELETAL",
        },
        {
          title: "Chuyên khoa tim mạch",
          subtitle:
            "Sở hữu danh sách các bác sĩ tim mạch uy tín đầu ngành tại Việt Nam",
          image_url: IMAGE_CARDIOLOGY,
          payload: "VIEW_CARDIOLOGY",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
