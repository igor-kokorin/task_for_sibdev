import { Server } from 'hapi';
import { Db } from '../db';
import { RegisterDynamicRoutes } from './register-dynamic-routes';
import { RegisterViews } from './register-views';
import Promise = require('bluebird');

import path = require('path');
import dotenv = require('dotenv');
import { RegisterStaticRoutes } from './register-static-routes';

export class WebAppBootstrapper {
    private _db: Db;

    constructor(options: { database: Db }) {
        if (!options || !options.database) {
            throw new Error('Db must be passed to WebAppBootstrapper');
        }

        this._db = options.database;
    }

    public exec() {
        const config = dotenv.config({ path : path.join(__dirname, '..', '.env') }).parsed;

        const server = new Server({ host: config.WEB_HOST, port: config.WEB_PORT });

        return Promise.all([
            RegisterStaticRoutes.register({ server }),
            RegisterViews.register({ server }),
            RegisterDynamicRoutes.register({ server, db: this._db })
        ]).then(() => server.start());
    }
}