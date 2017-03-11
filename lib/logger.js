/**
 * Created by mcsim-gr on 08.03.17.
 */

function init(config) {
    const scribe = require('scribe-js')({
        createDefaultConsole: false
    });

    const debugConsole = scribe.console({
        console: {
            alwaysTime: true,
            tagsColors: ['yellow', 'underline']
        },
        logWriter: false
    });

    function debug(msg, data) {
        let console = debugConsole.tag('DEBUG');
        msg = parseId(msg, data);
        if (data && Object.keys(data).length > 0){
            console.log(msg,data);
        } else {
            console.log(msg);
        }

    }

    function error(msg, ...other) {
        debugConsole.tag('ERROR').log.apply(debugConsole, [msg, ...other]);
    }

    function parseId(msg, data) {
        if (data && data.id) {
            msg = `[${data.id}] ${msg}`;
            delete data.id;
        }

        return msg;
    }

    return {
        debug,
        error
    };
}

module.exports = init;