import { Server } from 'hapi';

export class RegisterRoutes {
    public static register(server: Server) {
        server.route({
            method: 'GET',
            path: 'message-board',
            handler: {
                view: 'index'
            }
        });
    }
}