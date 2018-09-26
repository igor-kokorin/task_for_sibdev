import { Messages } from '../models';
import models = require('./db/models');
import Promise = require('bluebird');

export interface Db {
    Messages: Messages
}

export class DbBootstrapper {
    public exec(): Promise<Db> {
        return Promise.resolve({
            Messages: new Messages({ model: models.Message })
        });
    }
}