const catFacts = require('cat-facts');
const replaceString = require('replace-string');
const lib = require('lib')({token: process.env.STDLIB_TOKEN});
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

  let randomFact = catFacts.random();

  randomFact = replaceString(randomFact, 'Cat', 'Stripper');
  randomFact = replaceString(randomFact, 'Cats', 'Strippers');
  randomFact = replaceString(randomFact, 'Kitten', 'Stripper');
  randomFact = replaceString(randomFact, 'Kittens', 'Strippers');
  randomFact = replaceString(randomFact, 'cat', 'stripper');
  randomFact = replaceString(randomFact, 'cats', 'strippers');
  randomFact = replaceString(randomFact, 'kitten', 'stripper');
  randomFact = replaceString(randomFact, 'kittens', 'strippers');

  callback(null, {
    text: 'FACT: ' + randomFact,
    attachments: []
  });
};
