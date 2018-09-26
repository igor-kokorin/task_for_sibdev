import { DbBootstrapper } from './db';
import { WebAppBootstrapper } from './web';

let dbBootstrapper = new DbBootstrapper();
dbBootstrapper.exec().then((database) => {
    let webAppBootstrapper = new WebAppBootstrapper({ database });
    return webAppBootstrapper.exec().then(() => {
        console.log('App is launched!');
    });
})