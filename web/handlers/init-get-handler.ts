import { Messages, IMessage } from '../../models/Messages';
import { DbBootstrapper } from '../../db';

export class InitialGetHandler {
    private _db: Messages;

    constructor(options: { messagesDb: Messages }) {
        if (!options || !options.messagesDb) {
            throw new Error('MessagesDb is required');
        }

        this._db = options.messagesDb;
    }

    public handle() {
        return this._db.getAll();
    }
}