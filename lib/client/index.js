/**
 * Created by mcsim-gr on 08.03.17.
 */
const host = process.argv[2];
const io = require('socket.io-client')(host);
const commandRegExp = /([^\s]+)(?:\s+(.+))?/;

io.on('connect', () => {
    console.log('=======Connected=======');
    startListen();
});

io.on('disconnect', (reason) => {
    console.log('=======Disconnected=======');
    console.log(reason);
    stopListen();
});

function startListen() {
    process.stdin.on('data', (chunk) => {
        chunk = chunk.toString();
        const matches = commandRegExp.exec(chunk);
        if (matches) {
            if (matches[2]) {
                io.emit(matches[1], matches[2]);
            } else {
                io.emit(matches[1])
            }
        }
    });

    io.on('ready', function () {
        console.log('Search is ready');
    });

    io.on('game', function (data) {
        console.log('Game session ready');
        console.log(data);
    });

    io.on('message', (msg) => {
        console.log(`New Message: '${msg}'`);
    });

    io.on('error', (err) => {
        console.log(`Error: '${JSON.stringify(err)}'`);
    });
}

function stopListen() {
    process.stdin.removeAllListeners('data');
}
