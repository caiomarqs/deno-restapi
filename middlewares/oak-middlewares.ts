import { oak } from '../deps.ts'

const responseTime = async (ctx: oak.Context<Record<string, any>>, next: Function) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
}

const logger = async (ctx: oak.Context<Record<string, any>>, next: Function) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
};

export { responseTime, logger }