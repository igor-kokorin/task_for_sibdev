import { Server } from 'hapi';
import { Db } from '../db';
import { RegisterRoutes } from './register-routes';
import { RegisterViews } from './register-views';

import path = require('path');
import dotenv = require('dotenv');

export class WebAppBootstrapper {
    private _db: Db;

    constructor(options: { database: Db }) {
        this._db = options.database;
    }

    public exec() {
        const config = dotenv.config({ path : path.join(__dirname, '..', '.env') }).parsed;

        const server = new Server({ host: config.WEB_HOST, port: config.WEB_PORT });

        RegisterViews.register(server).then(() => {
            RegisterRoutes.register({ server, db: this._db });

            return server.start();
        });
    }
}

(new WebAppBootstrapper({ database: null })).exec();