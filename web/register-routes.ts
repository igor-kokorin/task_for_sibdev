import { Server, Request, ResponseToolkit } from 'hapi';
import { Db } from '../db';
import { PostMessageHandler } from './handlers/post-message-handler';
import { IMessage } from '../models/Messages';

export class RegisterRoutes {
    public static register(options: { server: Server, db: Db }) {
        options.server.route({
            method: 'GET',
            path: '/',
            handler: {
                view: 'index'
            }
        });

        options.server.route({
            method: 'POST',
            path: '/',
            handler: (request: Request, h: ResponseToolkit) => {
                let handler = new PostMessageHandler({ messagesDb: options.db.Messages });
                return handler.handle({ message: <IMessage>request.payload }).then((messages) => {
                    return h.view('index', { messages });
                });
            }
        });
    }
}