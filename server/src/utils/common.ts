import { Next, ParameterizedContext } from 'koa';

/**
 * Handles returning JSON error structure to caller
 * @param ctx 
 * @param next 
 */
export async function errorHandler(ctx: ParameterizedContext, next: Next) {
    return next().catch((ex) => {
        if (Object.keys(ex).length > 1) {
            ctx.type = 'json';
            ctx.body = ex;
        }
        ctx.status = ex.status || 500;
        ctx.app.emit('error', ex, ctx);
    });
}

/**
 * TODO: Skip authentication for now
 * @param ctx 
 * @param next 
 * @returns 
 */
export function authHandler(ctx: ParameterizedContext, next: Next) {
    // if (ctx.isAuthenticated()) {
    //     return next();
    // }
    // ctx.throw(401);
    return next();
}