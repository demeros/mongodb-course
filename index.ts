'use strict';

import * as Express from 'express';
import * as Engines from 'consolidate';
import {Startup} from './lib/startup';

import {join} from 'path';
import {Db} from 'mongodb';

Startup()
    .then((result) => {
        const {connection}: {connection: Db} = result;
        console.log(connection);
        const app = Express();

        app.engine('html', Engines.nunjucks);
        app.set('view engine', 'html');
        app.set('views', join(__dirname, 'app', 'views'));


    });


//
// MongoClient.connect('mongodb://localhost:27017/video', (error, db) => {
//     assert.equal(null, error);
//
//     console.log('MongoDB connected');
//
//     app.get('/', (req, res) => {
//         db.collection('movies')
//             .find({})
//             .toArray((error, movies) => {
//                 res.render('movie/movies', {movies});
//             });
//     });
//
//     app.use((req, res) => {
//         res.sendStatus(404);
//     });
//
//     const server = app.listen(3000, () => {
//         const port = server.address().port;
//         console.info('Express listening on port %s', port);
//     });
//
// });
//

