const AWS = require('aws-sdk');

const ses = new AWS.SES({ region: 'us-east-1' });

const sendConfirmationEmail = async (order) => {
  const params = {
    Source: 'nelasbakeryofficial@gmail.com',
    Destination: {
      ToAddresses: [order.customer_email]
    },
    Message: {
      Subject: {
        Data: "Your Nela's Bakery Order Confirmation"
      },
      Body: {
        Html: {
          Data: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #F2A8B0;">Thank you for your order, ${order.customer_name}!</h2>
              <p>We have received your cake order and will be in touch shortly to confirm details.</p>
              <h3>Order Summary:</h3>
              <ul>
                <li><strong>Flavor:</strong> ${order.cake_flavor === 'other' ? order.cake_flavor_other : order.cake_flavor}</li>
                <li><strong>Shape:</strong> ${order.shape === 'other' ? order.shape_other : order.shape}</li>
                <li><strong>Height:</strong> ${order.height === 'other' ? order.height_other : order.height}</li>
                <li><strong>Size:</strong> ${order.size === 'other' ? order.size_other : order.size}</li>
                <li><strong>Border:</strong> ${order.border === 'other' ? order.border_other : order.border}</li>
                ${order.custom_notes ? `<li><strong>Notes:</strong> ${order.custom_notes}</li>` : ''}
              </ul>
              <p style="color: #7A7070;">Sweets Made to Love 🎂</p>
              <p style="color: #7A7070;"><strong>Nela's Bakery</strong></p>
            </div>
          `
        }
      }
    }
  };

  await ses.sendEmail(params).promise();
  console.log(`Confirmation email sent to ${order.customer_email}`);
};

module.exports = { sendConfirmationEmail };
