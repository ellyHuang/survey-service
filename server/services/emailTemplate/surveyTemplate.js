const keys = require('../../config/keys');

module.exports = survey => {
    return `
    <html>
        <body>
            <div style="text-align: center;">
                <div style="background-color: #FFD90F; font-size: 35px; font-weight: 900;">
                    <h3 style="margin: 0;">This is the special test for J.C.</h3>
                </div>
                <div style="background-color: #82B5C2;">
                    <p style="margin: 0; padding: 10px; font-size: 18px;">Please fill out the follow questionnaire</p>
                    <p style="font-size: 18px;">${survey.body}</p>
                    <div style="justify-content:center; display: flex;">
                        <div style="margin: 30px 50px; padding: 10px 30px; border-radius: 5%; background-color: #1F1E1F;">
                            <a href="${keys.redirectDomain}/api/surveys/thanks" style="text-decoration: none; color: aliceblue;">YES</a>
                        </div>
                        <div style="margin: 30px 50px; padding: 10px 30px; border-radius: 5%; background-color: #1F1E1F;">
                            <a href="${keys.redirectDomain}/api/surveys/thanks" style="text-decoration: none; color: aliceblue;">NO</a>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    </html>
    `;
};