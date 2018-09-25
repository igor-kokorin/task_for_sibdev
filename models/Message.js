export class Messages {
    constructor(opts) {
        this.model = opts.model;
    }

    getAll() {
        return this.model.findAll();
    }

    createNew(opts) {
        return this.model.create({
            name: opts.name,
            text: opts.text
        });
    }
}