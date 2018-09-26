import { IMessage, Messages } from "../../models/Messages";
import { DbBootstrapper } from "../../db";

export class PostMessageHandler {
    private _db: Messages;

    constructor(options: { messagesDb: Messages }) {
        if (!options || !options.messagesDb) {
            throw new Error('MessagesDb is required');
        }

        this._db = options.messagesDb;
    }

    public handle(options: { message: IMessage }) {
        if (options && options.message) {
            return this._db.createNew(options.message).then(() => {
                return this._db.getAll();
            });
        }
    }
}