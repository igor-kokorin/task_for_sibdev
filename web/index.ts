import { Server } from 'hapi';
import { Db } from '../db';
import { RegisterRoutes } from './register-routes';
import { RegisterViews } from './register-views';

export class WebAppBootstrapper {
    constructor(options: { database: Db }) {
 
    }

    public exec() {
        const server = new Server({ host: 'localhost', port: 8000 });

        RegisterRoutes.register(server);
        RegisterViews.register(server).then(() => {
            return server.start().then(() => {
                console.log('App is Working!');
            });
        });
    }
}

