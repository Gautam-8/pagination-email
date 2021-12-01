const transporter = require("../config/mail");


module.exports = ( from, to , subject, text, html,attachments=null) =>{

    const message = {
        from,
        to,
        subject,
        text,
        html,
        attachments
      };
    
    transporter.sendMail(message);

}
