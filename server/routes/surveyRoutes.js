const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const verifyCredits = require('../middlewares/verifyCredits');
const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplate/surveyTemplate');
const { mail } = require('sendgrid');

const Survey = mongoose.model('surveys');


module.exports = app => {

    app.get('/api/surveys/thanks',(req, res)=>{
        res.send('Thanks for rating!');
    }); 


    app.post(
        '/api/surveys',
        requireLogin,
        verifyCredits,
        async (req, res)=>{
            const {title, subject, body, recipients} = req.body;

            const survey = new Survey({
                title,
                subject,
                body,
                recipients: recipients.split(',').map( email =>  ({ email: email.trim() }) ),
                _user: req.user.id,
                dateSent: Date.now(),
            });

            //send out the survey through Mailer class
            const mailer = new Mailer(survey, surveyTemplate(survey));
            try {
                await mailer.send();

                //save the survey to database after the email sent out successfully
                await survey.save();

                //charge the user
                req.user.credits -= 1;
                const user = await req.user.save();

                res.send(user);
            }catch(err){
                res.status(422).send(err);
            }


            
        }
    )
};