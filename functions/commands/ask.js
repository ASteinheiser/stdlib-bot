let google = require('google');
const lib = require('lib')({token: process.env.STDLIB_TOKEN});

google.resultsPerPage = 1;
/**
* /ask
*
*   Basic /ask command.
*   All Commands use this template, simply create additional files with
*   different names to add commands.
*
*   See https://api.slack.com/slash-commands for more details.
*
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/
module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {

  const askedFor = `:mag: Asking Google: \'${text}\'...`;
  const unknownText = 'I dunno bro. Ask Dave :dave-mary-tongue:';

  google(text, (err, res) => {
    if (err) {
      console.error(err);
      callback(null, {
        text: askedFor + '\n' + unknownText,
        attachments: []
      });
    }

    var link = res.links[0];
    let googleAnswer = unknownText;

    if(link) {
      if(link.description) {
        googleAnswer = link.description;
        if(googleAnswer.includes('... ')) {
          googleAnswer = googleAnswer.split('... ')[1];
        }
      } else if (link.title) {
        googleAnswer = link.title;
      }
    }

    callback(null, {
      text: askedFor + '\n' + googleAnswer,
      attachments: []
    });
  });
};
