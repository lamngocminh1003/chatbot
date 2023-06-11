(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "Messenger");

window.extAsyncInit = function () {
  // the Messenger Extensions JS SDK is done loading

  MessengerExtensions.getContext(
    "101750909607466",
    function success(thread_context) {
      // success
      //set psid to input
      $("#psid").val(thread_context.psid);
      handleClickButtonReserveTable();
    },
    function error(err) {
      // error
      console.log(
        "Lỗi đặt lịch khám bệnh bot with MessengerExtensions.getContext",
        err
      );
      //run fallback get userId from URL
      $("#psid").val(senderId);
      handleClickButtonReserveTable();
    }
  );
};

//validate inputs
function validateInputFields() {
  const EMAIL_REG =
    /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;

  let email = $("#email");
  let phoneNumber = $("#phoneNumber");
  let customerReason = $("#customerReason");
  let customerAddress = $("#customerAddress");
  if (!email.val().match(EMAIL_REG)) {
    email.addClass("is-invalid");
    return true;
  } else {
    email.removeClass("is-invalid");
  }
  if (phoneNumber.val() === "") {
    phoneNumber.addClass("is-invalid");
    return true;
  } else {
    phoneNumber.removeClass("is-invalid");
  }
  if (customerReason.val() === "") {
    customerReason.addClass("is-invalid");
    return true;
  } else {
    customerReason.removeClass("is-invalid");
  }
  if (customerAddress.val() === "") {
    customerAddress.addClass("is-invalid");
    return true;
  } else {
    customerAddress.removeClass("is-invalid");
  }
  return false;
}

function handleClickButtonReserveTable() {
  $("#btnReserveTable").on("click", function (e) {
    let check = validateInputFields(); //return true or false

    let data = {
      psid: $("#psid").val(),
      customerName: $("#customerName").val(),
      customerAddress: $("#customerAddress").val(),
      customerReason: $("#customerReason").val(),
      email: $("#email").val(),
      phoneNumber: $("#phoneNumber").val(),
    };

    if (!check) {
      //close webview
      MessengerExtensions.requestCloseBrowser(
        function success() {
          // webview closed
          callAjax();
        },
        function error(err) {
          // an error occurred
          console.log("MessengerExtensions.requestCloseBrowser", err);
          callAjax();
          $("#customerInfo").css("display", "none");
          $("#handleError").css("display", "block");
        }
      );

      //send data to node.js server
      $.ajax({
        url: `${window.location.origin}/reserve-table-ajax`,
        method: "POST",
        data: data,
        success: function (data) {
          console.log(data);
        },
        error: function (error) {
          console.log(error);
        },
      });
    }
  });
}
function callAjax() {
  //send data to node.js server
  $.ajax({
    url: `${window.location.origin}/reserve-table-ajax`,
    method: "POST",
    data: data,
    success: function (data) {
      console.log(data);
    },
    error: function (error) {
      console.log(error);
    },
  });
}
