import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as session from 'koa-session';
import * as logger from 'koa-logger';
import * as cors from '@koa/cors';
import userRouter from './routes/users';
import { PORT, SERVER_KEY } from './config';

const app = new Koa();
let httpServer;
app.keys = [SERVER_KEY];

app.use(cors());    // public API, reflect request origin
app.use(logger());
app.use(bodyparser());
app.use(session(app));
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

export async function start(): Promise<{ app: Koa, httpServer: any, port: string }> {
    return new Promise((resolve) => {
        httpServer = app.listen(PORT);
        resolve({ app, httpServer, port: PORT });
    });
}

export async function shutdown() {
    if (!httpServer) return null;
    return new Promise((resolve) => httpServer.close(resolve));
}
