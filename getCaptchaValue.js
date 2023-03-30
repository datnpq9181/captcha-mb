const fetch = require("node-fetch");
var FormData = require("form-data");

function getCaptchaValue(captchaBase64) {
  var form = new FormData();
  form.append("api_key", "e85ada196ee8cce93865722f59040037");
  form.append("img_base64", captchaBase64);

  return new Promise((resolve, reject) => {
    fetch("https://ecaptcha.sieuthicode.net/api/captcha/mbbank", {
      method: "POST",
      body: form,
    })
      .then((response) => response.json())
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

module.exports = getCaptchaValue;
