const nodemailer = require("nodemailer");
const { google } = require("googleapis");
async function sendEmail(msg) {
  try {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.TEAMRIVALS_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const info = await transporter.sendMail(msg);
    console.log(info);
    return info;
  } catch (err) {
    console.log(err);
  }
}
function confirmMail(toUser) {
  const message = {
    from: "TeamRivals <process.env.TEAMRIVALS_EMAIL>",
    to: toUser.email,
    subject: "TeamRivals - Activate Account",
    text: "Hello",
    html: `
      <p>Please activate your account by clicking the link bellow, the link will expire in 24hours </p>
      <a href='${process.env.DOMAIN}/api/auth/confirmation/${toUser.token}'>Activate Account </a>
    `,
  };

  return sendEmail(message);
}
function confirmTicket(toUser,totalAmount,match,category) {
  const message = {
    from: "TeamRivals <process.env.TEAMRIVALS_EMAIL>",
    to: toUser,
    subject: "TeamRivals -  Thank you for purchasing ticket",
    text: "Hello",
    html: `
      <p>Enjoy the Match</p>
     <p> <b>Team rivals vs ${match.opponant}</b></p>
     <p> <b>${match.date} ${match.time}</b></p>
      <p><b>Your Gallery is ${category} and you purchased ${totalAmount} tickets.</b></p>
    `,
  };

  return sendEmail(message);
}
function confirmOrder(toUser,total,products) {
  const message = {
    from: "TeamRivals <process.env.TEAMRIVALS_EMAIL>",
    to: toUser,
    subject: "TeamRivals -  Thank For Shopping with us.",
    text: "Hello",
    html: `
      <p>Your Total Bill : <b>${total}</b></p> 
      <p>${JSON.stringify(products)}</p>
    `,
  };

  return sendEmail(message);
}
module.exports = { confirmMail ,confirmTicket,confirmOrder};
