'use strict';

import {MongoClient, Db} from 'mongodb';
import * as Promise from 'bluebird';
import * as Config from 'nconf';
import {resolve} from 'path';

Config
    .env()
    .file('dev', resolve(__dirname, '..', 'app', 'config', 'dev.json'))
    .file('prod', resolve(__dirname, '..', 'app', 'config', 'prod.json'));

const createDbConnection = (): Promise<Db> => {
    const executor = new Promise<Db>((resolve, reject) => {
        const connetionConfig = Config.get('mongo');
        const connectionString: string = `mongodb://${connetionConfig.host}:${connetionConfig.port}/${connetionConfig.db}`;

        MongoClient.connect(connectionString, (error: Error, connection: Db) => {
            if (error) {
                return reject(error);
            }

            resolve(connection);
        });
    });

    return executor;
};

const Startup = (): Promise<{connection: Db}> => {
    return Promise
        .all([createDbConnection()])
        .then((results) => {
            return {connection: results[0]};
        });
};

export {Startup};
