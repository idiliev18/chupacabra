const nodemailer = require("nodemailer");
const logs = require('../models/log.js');
const loggerManager = new logs();

async function sendVerificationEmail(to, token) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.GMAILID,
            pass: process.env.GMAILPASS
        }
    });

    let info = await transporter.sendMail({
        from: process.env.GMAILID,
        to: to,
        subject: "Потвърждение на имeйл адрес",
        html: `
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;700&family=Ubuntu:wght@300&display=swap" rel="stylesheet">
        <h1 style="margin-left: 5%;">Здравейте 👋!</h1> 
        <br> 
        <p style="font-size: 20px; margin-left: 10%; margin-right: 10%;">Радваме се, че се регистрирахте &#128151 на нашия сайт! За да използвате пълните функционалности на нашата платформа, 
        моля потвърдете Вашия имейл, натискайки синия бутона долу 🢃.</p> 
        <br>
        <img src="https://cdn.discordapp.com/attachments/834872582661603440/858667540648951839/dancing_fish.gif" height="400px" style="margin-left:32%;"><br>
        <a href="http://localhost:4000/api/verify/${token}"><button style="margin-left: 40%; margin-top: 3%; height:50px; width:20%; background-color: #12b0df; color:white; border-radius:200px; border: none; cursor: pointer; font-size: 20px;">Потвърждаване</button></a>
        <br><br><h2 style="margin-left: 10%;">Благодарим!</h4> <br><br>
        <a href="https://chupacabra.codes" style="text-decoration: none; font-size: 15px; color: #0b7dbd;"><p>Обратно в сайта ⮌<span>🔗</span> </p></a> 
        `
    });

    transporter.sendMail(info, (error, info) => {
        if (error) {
            return loggerManager.logError(error);
        }
        loggerManager.logInfo(`Email was sent to the user with email: ${to} ` + info.response);
    });

}

module.exports.sendVerificationEmail = sendVerificationEmail;