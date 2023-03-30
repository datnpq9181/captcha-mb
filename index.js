const fetch = require("node-fetch");
const getCaptchaValue = require("./getCaptchaValue");
const fs = require("fs");

function saveImage(img_base64, filename) {
  var base64Data = img_base64.replace(/^data:image\/png;base64,/, "");

  fs.writeFile(`./data/${filename}.png`, base64Data, "base64", function (err) {
    console.log(err);
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getCaptcha() {
  return new Promise((resolve, reject) => {
    fetch(
      "https://online.mbbank.com.vn/api/retail-web-internetbankingms/getCaptchaImage",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language":
            "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
          authorization:
            "Basic RU1CUkVUQUlMV0VCOlNEMjM0ZGZnMzQlI0BGR0AzNHNmc2RmNDU4NDNm",
          "content-type": "application/json; charset=UTF-8",
          "elastic-apm-traceparent":
            "00-502afe70f1ce7fccca8ced85238de737-f8d048147c49f4b8-01",
          "sec-ch-ua":
            '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-request-id": "2023033022404073",
          cookie:
            "_ga_QFJ32LKGHD=GS1.1.1677083126.1.1.1677083141.0.0.0; _ga=GA1.3.299303466.1677083127; _fbp=fb.2.1677083142304.691458560; _gid=GA1.3.1085336704.1680190551; BIGipServerk8s_online_banking_pool_9712=1696334090.61477.0000; MBAnalyticsaaaaaaaaaaaaaaaa_session_=GOKAJGIEJFAALIEAJBOMCPHBHGLIMGOKMEPAOKJCIFBPBOFNMGMPOPBEPKEGGNAMIPIDNLDGFLCIHGJDLFJAGFNONKEOKOANPLHNGBAOGBOIPDCEKPKJPMOOGCFMPGDO; BIGipServerk8s_KrakenD_Api_gateway_pool_10781=2249982218.7466.0000; JSESSIONID=5ECB21CE5872AFCB6A34B864D5E544F6; MBAnalytics1411053802aaaaaaaaaaaaaaaa_cspm_=AHGEDHFKAFCCKKGKNBCALGOBBIFNACOHBGCKMABJNNPPALJDBEFAIFPNGDLFHHPGIOMCMFJJFCPFMJIIMDEALHOFACJEFMOBNKHCHOANCPNICDNCEPFJEJILOJCIMJOH",
          Referer: "https://online.mbbank.com.vn/pl/login?returnUrl=%2F",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: '{"refNo":"2023033022404073","deviceIdCommon":"swg2klk7-mbib-0000-0000-2022082423301573","sessionId":""}',
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res.imageString);
        return getCaptchaValue(res.imageString).then((value) => {
          console.log(value);
          saveImage(res.imageString, value.data.captcha);
          resolve(value.data.captcha);
        });
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

for (let i = 0; i < 10; i++) {
  delay(5000).then(() => {
    getCaptcha()
      .then(() => {
        console.log("done");
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
