import { start, shutdown } from './server';

start()
    .then(({ port }) => {
        console.log(`Server started on ${port}`);
    })
    .catch((ex) => {
        console.error('Server failed to start', ex);
    });