import { clientBaseUrl, emailName, fromEmail } from "../config/sconfig.js";
import { sendMail } from "../utils/sendMail.js";

export const sendEmailToVerify = async ({ email, token, firstName, lastName }) => {
  // let link = `${clientBaseUrl}/signup/verify/?token=${token}`
  let link=`http://localhost:8080/signup/verify/?token=${token}`

  const html = `
    <div style="background: lightgray; padding: 20px; margin: 30px;">
    <div style="background: #fff; padding: 20px">
      <br><br> 
      Dear ${firstName} ${lastName}, <br>
      To verify your email, please click on below button: <br>
      <div style="text-align:center; margin-top: 15px;">
        <a style="background-color: #FFC43E; padding: 10px; border-radius: 10px; color: black; font-weight: bold; text-decoration: none;" href=${link}>Verify Email</a>
      </div>
      <br> <br>
      if above button does not works, click on below link: <br> <a href=${link}>${link}</a>
    </div>

  </div>
    `;

  await sendMail({
    from: `"${emailName}" <${fromEmail}>`,
    to: [email],
    subject: "Email verification",
    html
  });
}

export const sendEmailToForgotPassword = async ({
  email,
  token,
  firstName,
  lastName
}) => {
  let link = `${clientBaseUrl}/resetPassword/?token=${token}`;
  const html = `
  <div style="background: lightgray; padding: 20px; margin: 30px;">
    <div style="background: #fff; padding: 20px">
      <br><br> 
      Dear ${firstName} ${lastName}, <br>
      To reset your password, please click on below button: <br>
      <div style="text-align:center; margin-top: 15px;">
        <a style="background-color: #FFC43E; padding: 10px; border-radius: 10px; color: black; font-weight: bold; text-decoration: none;" href=${link}>Reset Password</a>
      </div>
      <br> <br>
      if above button does not works, click on below link: <br> <a href=${link}>${link}</a>
    </div>

  </div>
`;

  await sendMail({
    from: `"${emailName}" <${fromEmail}>`,
    to: [email],
    subject: "Forgot Password",
    html
  });
}

export const sendConfirmationEmail = async({email, order, firstName, lastName}) =>{
  const html = `
  <p>Dear ${firstName} ${lastName},</p>
  <p>Thank you for your order. Your order has been confirmed with the following details:</p>
  <p>Order ID:- ${order._id}</p>
  <p>Your Order:-</p> <ul>${order.order.map((item, i) => `<li>${item.dish.name} X${item.quantity}</li>`).join("")}</ul>
  <p>Total Bill:- ${order.finalPrice}</p>
  <p>For any inquiries, please contact us at anamolkrishfarm@gmail.com.</p>
  <p>Best regards,</p>
  <p>ANAMOLKRISHFARM</p>
`;

  await sendMail({
    from: `"${emailName}" <${fromEmail}>`,
    to: [email],
    subject: "Order Confirmation",
    html
  });

}