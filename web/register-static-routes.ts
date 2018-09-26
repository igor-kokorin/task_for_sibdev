import { Server } from 'hapi';
import inert = require('inert');
import path = require('path');
import Promise = require('bluebird');

export class RegisterStaticRoutes {
    public static register(options: { server: Server }): Promise<any> {
        return Promise.cast(options.server.register(inert).then(() => {    
            options.server.route({
                method: 'GET',
                path: '/{param*}', 
                handler: {
                    directory: {
                        path: path.join(__dirname, 'static')
                    }
                }
            });
        }));
    }
}