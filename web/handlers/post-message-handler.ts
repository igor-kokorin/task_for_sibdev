import { IMessage, Messages } from "../../models/Messages";
import { DbBootstrapper } from "../../db";
import Promise = require('bluebird');

export interface PostMessageHandlerResult {
    newMessage: IMessage,
    messages: IMessage[]
}

export class PostMessageHandler {
    private _db: Messages;

    constructor(options: { messagesDb: Messages }) {
        if (!options || !options.messagesDb) {
            throw new Error('MessagesDb is required');
        }

        this._db = options.messagesDb;
    }

    public handle(options: { message: IMessage }): Promise<PostMessageHandlerResult> {
        if (options && options.message) {
            return this._db.createNew(options.message).then((message) => {
                return this._db.getAll()
                    .then((messages) => <PostMessageHandlerResult>{ messages, newMessage: message });
            });
        }
    }
}