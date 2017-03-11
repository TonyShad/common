/**
 * Created by mcsim-gr on 09.03.17.
 */
const uuid = require('node-uuid');
const config = require('./config');

class GameClient {
    constructor() {
        this._sid = uuid.v4();
        this._deckId = Math.floor(Math.random()*8);

        this._commands = {
            find: () => this.find()
        };
    }

    connect() {
        return new Promise((resolve) => {
            this._io = require('socket.io-client')(config.searchServerUrl);
            this._io.on('connect', () => {
                console.log('=======Connected=======');
                resolve();
            });

            this._io.on('customError', (err) => {
                console.log('Server sent an error');
                console.log('++++++++++++++++++++');
                console.log(err);
                console.log('++++++++++++++++++++');
            });
        });
    }

    executeCommand(command) {
        if (this._commands[command]) {
            return this._commands[command]();
        } else {
            return Promise.reject('No such command');
        }
    }

    find() {
        return new Promise((resolve, reject) => {
            this._io.once('ready', (resp) => {
                GameClient.ioGet(reject, resp, () => {
                    console.log('Search is ready');
                });
            });
            this._io.once('game', (resp) => {
                GameClient.ioGet(reject, resp, (data) => {
                    console.log(`Game is ready: ${data.gameId}`);
                    resolve(data.gameId);
                });
            });

            this._io.emit('find', JSON.stringify({ sid: this._sid, deckId: this._deckId }));
        });
    }

    static ioGet(reject, data, cb) {
        try {
            if (data) {
                data = JSON.parse(data);
                return cb(data);
            }
            cb();
        } catch (err) {
            reject({ err, data });
        }
    }
}

module.exports = GameClient;