const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

const sendNotificationEmail = async (order) => {
  const params = {
    Source: 'orders@nelasbakery.com',
    Destination: {
      ToAddresses: ['nelasbakeryofficial@gmail.com']
    },
    Message: {
      Subject: {
        Data: `New Cake Order #${order.id} — ${order.customer_name}`
      },
      Body: {
        Html: {
          Data: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #D4537E;">New Order Received!</h2>
              <p>A new cake order has been placed on nelasbakery.com</p>
              <h3>Customer Details:</h3>
              <ul>
                <li><strong>Name:</strong> ${order.customer_name}</li>
                <li><strong>Email:</strong> ${order.customer_email}</li>
                <li><strong>Phone:</strong> ${order.customer_phone || 'Not provided'}</li>
              </ul>
              <h3>Order Details:</h3>
              <ul>
                <li><strong>Flavor:</strong> ${order.cake_flavor === 'other' ? order.cake_flavor_other : order.cake_flavor}</li>
                <li><strong>Shape:</strong> ${order.shape === 'other' ? order.shape_other : order.shape}</li>
                <li><strong>Height:</strong> ${order.height === 'other' ? order.height_other : order.height}</li>
                <li><strong>Size:</strong> ${order.size === 'other' ? order.size_other : order.size}</li>
                <li><strong>Border:</strong> ${order.border === 'other' ? order.border_other : order.border}</li>
                ${order.custom_notes ? `<li><strong>Notes:</strong> ${order.custom_notes}</li>` : ''}
              </ul>
              <p style="color: #D4537E;"><strong>Please reach out to the customer to confirm pricing, due date, and any additional details.</strong></p>
            </div>
          `
        }
      }
    }
  };

  await ses.sendEmail(params).promise();
  console.log(`Order notification sent to nelasbakeryofficial@gmail.com`);
};

module.exports = { sendNotificationEmail };
