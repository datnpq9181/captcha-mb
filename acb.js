const fetch = require('node-fetch');
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false
});

function getCaptchaFromACB() {
  return fetch('https://online.acb.com.vn/acbib/Captcha.jpg', {
    agent
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.buffer();
    })
    .then(buffer => {
      const base64 = buffer.toString('base64'); // Convert buffer to Base64-encoded string
      return base64;
    })
    .catch(err => console.error(err));
}

module.exports = {
  getCaptchaFromACB
};