var https = require('follow-redirects').https;
var fs = require('fs');
const fetch = require('node-fetch');

const send_message = (message) => {
    const requestBody = {
        messages: [
          {
            from: 'InfoSMS',
            destinations: [
              {
                to: '+12898349886',
              },
            ],
            text: `${message}`,
          },
        ],
      };
    
      const fetchOptions = {
        method: 'post',
        body: JSON.stringify(requestBody),
        headers: {
          Authorization: `App 415673d11638540398f105e3e17a5c40-36521322-2229-4ec3-8b90-a69d9db8b16f`,
          'Content-Type': 'application/json',
        },
      };
    
      const URL = `https://n8xqy5.api.infobip.com/sms/2/text/advanced`;
    
      fetch(URL, fetchOptions)
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          return json
        })
        .catch((error) => {
          console.log(error);
          return error
        });
}


module.exports = send_message