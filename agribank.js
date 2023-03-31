const fetch = require('node-fetch');
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false
});

function getCaptchaFromAgribank() {
  return fetch('https://ibank.agribank.com.vn/ibank/HCIC/capimg.jsp', {
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
  getCaptchaFromAgribank
};