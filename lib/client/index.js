/**
 * Created by mcsim-gr on 08.03.17.
 */
const GameClient = require('./gameClient');
const commands = Array.prototype.slice.call(process.argv, 2);

const client = new GameClient();
client.connect()
    .then(() => {
        return executeCommands();
    })
    .catch((err) => {
        console.log('ERROR');
        console.log('------------------------------------------');
        console.log(err);
        console.log('------------------------------------------');
    });

function executeCommands() {
    return commands.reduce((result, command) => {
        return result
            .then(() => {
                return client.executeCommand(command);
            })
            .then((data) => {
                console.log(`Command '${command}' executed. Result is:`);
                console.log(data);
            });
    }, Promise.resolve())
        .then(() => {
            console.log('All done');
        });
}