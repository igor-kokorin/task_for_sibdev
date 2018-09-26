import { Server } from 'hapi';
import Vision = require('vision');
import ejs = require('ejs');
import Promise = require('bluebird');

export class RegisterViews {
    public static register(options: { server: Server }): Promise<any> {
        return Promise.cast(options.server.register(Vision).then(() => {
            options.server.views({
                engines: { ejs },
                relativeTo: __dirname,
                path: 'views'
            });
        }));
    }
}