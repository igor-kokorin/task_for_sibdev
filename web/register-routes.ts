import { Server } from 'hapi';

export class RegisterRoutes {
    public static register(server: Server) {
        server.route({
            method: 'GET',
            path: '/',
            handler: {
                view: 'index'
            }
        });
    }
}