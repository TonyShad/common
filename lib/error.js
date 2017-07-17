/**
 * Created by mcsim-gr on 08.03.17.
 */
const _ = require('lodash');

class Error {
    constructor(status, code, message, data) {
        this._status = status;
        this._code = code;
        this._message = message;
        this._data = data;
    }

    render() {
        const result = {
            status: this._status,
            code: this._code,
            message: this._message
        };

        if (process.env.NODE_ENV !== 'production')
            result.data = this._data;

        return _.omitBy(result, _.isNil);
    }
}

module.exports = Error;