import { Server } from 'hapi';
import Vision = require('vision');
import ejs = require('ejs');

export class RegisterViews {
    public static register(server: Server): Promise<any> {
        return server.register(Vision).then(() => {
            server.views({
                engines: { ejs },
                relativeTo: __dirname,
                path: 'views'
            });
        });
    }
}