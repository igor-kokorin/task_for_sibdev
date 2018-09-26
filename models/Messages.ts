import { Model } from 'sequelize';
import Bluebird = require('bluebird');

export interface IMessage {
    date?: Date,
    text: string,
    fullName: string
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

    public getAll(): Bluebird<IMessage[]> {
        return this._model.findAll().then(res => res.map((dbMess) => this.mapDbToModel(dbMess)));
    }

    public createNew(message: IMessage): Bluebird<IMessage> {
        return this._model.create(message).then((res) => this.mapDbToModel(res));
    }
}