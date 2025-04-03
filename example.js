const axios = require('axios');

exports.handler = async (context, event, callback) => {
    
    let messageBody = event.messageBody;
    let messageTo = event.messageTo;
    let messageFrom = event.messageFrom;
    let messageSID = event.messageSID;
  
    const FRONT_INBOX_ID = 'FRONT_INBOX_API_ID'
    const FRONT_API_ENDPOINT = `https://api2.frontapp.com/inboxes/${FRONT_INBOX_ID}/imported_messages`;
    const FRONT_API_KEY = 'FRONT_API_KEY';

    const requestData = {
            sender: {
                handle: messageFrom
            },
            body_format: 'markdown',
            type: 'sms',
            metadata: {
                is_inbound: true,
                is_archived: false,
                should_skip_rules: false
            },
            to: [messageTo],
            body: messageBody,
            external_id: messageSID,
            created_at: Math.floor(Date.now() / 1000)
        };

    const requestDataString = JSON.stringify(requestData);

  try {
      const response = await axios.post(FRONT_API_ENDPOINT, requestDataString, {
            headers: {
                'Authorization': `Bearer ${FRONT_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
    return callback(null, { success: true, data: response.data });
  } catch (error) {
    return callback(error);
  }

};