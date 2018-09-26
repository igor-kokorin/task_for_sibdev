import { Model } from 'sequelize';
import Promise = require('bluebird');
import { Sequelize } from '../db/db/models';

export interface IMessage {
    date?: Date,
    text: string,
    fullName: string,
    errors?: any
}

type SequelizeModel = Model<any, any>;

export class Messages {
    private _model: SequelizeModel;

    constructor(options: { model: SequelizeModel }) {
        if (!options || !options.model) {
            throw new Error('Sequelize model must be passed to Messages constructor');
        }

        this._model = options.model;
    }

    private mapDbToModel(dbMessage) {
        return {
            fullName: dbMessage.fullName,
            text: dbMessage.text,
            date : dbMessage.createdAt
        }
    }

    public getAll(): Promise<IMessage[]> {
        return this._model.findAll()
            .then(res => res.map((dbMess) => this.mapDbToModel(dbMess)));
    }

    public createNew(message: IMessage): Promise<IMessage> {
        let errors = this.hasErrors(message);
        
        if (!errors) {
            return this._model.create(message)
                .then((res) => this.mapDbToModel(res));
        } else {
            message.errors = errors;
            return Promise.resolve(message);
        }
    }

    public hasErrors(message: IMessage) {
        let errors = {};
        
        if (message) {
            if (!message.fullName) {
                errors['fullName'] = 'Fullname is required';
            }

            if (message.fullName.length > 50) {
                errors['fullName'] = 'Fullname length must be less than 50 characters';
            }
            
            if (!message.text) {
                errors['text'] = 'Message must have a text';
            }

            if (message.text.length > 100) {
                errors['text'] = 'Message text length must be less than 100';
            }
        }

        return (Object.getOwnPropertyNames(errors).length > 0) ? errors : false;
    }
}