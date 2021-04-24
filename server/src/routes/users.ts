import * as Router from 'koa-router';
import { DefaultState, Context } from 'koa';
import UserService from '../services/users';
import { authHandler, errorHandler } from '../utils/common';

const router = new Router<DefaultState, Context>({ prefix: '/api/users' });

router
    .use(authHandler)
    .use(errorHandler)
    .get('/', async (ctx) => {
        const limit = Number(ctx.query?.limit) || 50;
        const users = await UserService.get(0, limit);
        ctx.body = users;
    })
    .delete('/:id', async (ctx) => {
        const { id } = ctx.params;
        if (id != null) {
            UserService.remove(ctx.params.id);
            ctx.body = { ok: true };
            return;
        }
        ctx.throw(400, 'Missing parameter "id"');
    });

export default router;
