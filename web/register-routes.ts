import { Server, Request, ResponseToolkit } from 'hapi';
import { Db } from '../db';
import { PostMessageHandler } from './handlers/post-message-handler';
import { IMessage } from '../models/Messages';
import { InitialGetHandler } from './handlers/init-get-handler';

export class RegisterRoutes {
    public static register(options: { server: Server, db: Db }) {
        options.server.route({
            method: 'GET',
            path: '/', 
            handler: (request: Request, h: ResponseToolkit) => {
                let handler = new InitialGetHandler({ messagesDb: options.db.Messages });
                return handler.handle().then((messages) => {
                    return h.view('index', { messages });
                });
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