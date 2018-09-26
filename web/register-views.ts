import { Server } from 'hapi';
import Vision = require('vision');
import nunjucks = require('nunjucks');
import path = require('path');
import Promise = require('bluebird');

export class RegisterViews {
    public static register(options: { server: Server }): Promise<any> {
        return Promise.cast(options.server.register(Vision).then(() => {
            options.server.views({
                engines: {
                    html: {
                        compile: function (src, options) {
                            const template = nunjucks.compile(src, options.environment);
        
                            return (context) => {
        
                                return template.render(context);
                            };
                        },
        
                        prepare: function (options, next) {
                            (<any>options).compileOptions.environment = nunjucks.configure((<any>options).path, { watch : false });

                            return next();
                        }
                    }
                },
                relativeTo: path.join(__dirname, 'views'),
                path: path.join(process.cwd(), 'prod', 'web', 'views')
            });
        }));
    }
}