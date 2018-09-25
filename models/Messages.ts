import { Model } from 'sequelize';
import Bluebird = require('bluebird');

export interface IMessage {
    date?: Date,
    text: string,
    fullName: string
}

type SequelizeModel = Model<any, any>;

export class Messages {
    private model: SequelizeModel;

    constructor(opts: { model: SequelizeModel }) {
        this.model = opts.model;
    }

    private mapDbToModel(dbMessage) {
        return {
            fullName: dbMessage.fullName,
            text: dbMessage.text,
            date : dbMessage.createdAt
        }
    }

    public getAll(): Bluebird<IMessage[]> {
        return this.model.findAll().then(res => res.map((dbMess) => this.mapDbToModel(dbMess)));
    }

    public createNew(message: IMessage): Bluebird<IMessage> {
        return this.model.create(message).then((res) => this.mapDbToModel(res));
    }
}