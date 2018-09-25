import Sequelize = require('sequelize');
import { Messages } from '../models';

export class InitDb {
    execute(opts) {        
        let seq = new Sequelize ({
            host: opts.host,
            database: opts.database,
            username: opts.username,
            password: opts.password,
            dialect: 'postgres'
        });
        
        const MessageModel = seq.define('message', {
            fullName: Sequelize.STRING(100),
            text: Sequelize.STRING(1000)
        });

        return seq.sync({ force: true }).then(() => {
            return (new Messages({ model: <any>MessageModel }));
        });
    }
}