/**
 * deno run --allow-net ./app.ts
 */

import { oak, Status } from './deps.ts'

import { books, Book } from './model/mod.ts'
import { responseTime, logger } from './middlewares/mod.ts'
import { errorResponse } from './utils/mod.ts'
import { findBookById, deleteBookById, saveBook } from './repositories/mod.ts'

const { Application, Router, helpers } = oak

const app = new Application()
const router = new Router()

router.get('/', ctx => {
    ctx.response.body = "Hello World"
}).get("/books", ctx => {
    ctx.response.body = books;
}).get("/books/:id", ctx => {

    const { id } = helpers.getQuery(ctx, { mergeParams: true });

    if (id !== "" && parseInt(id)) {
        ctx.response.body = findBookById(parseInt(id))
    }
    else {
        ctx.response.body = "O parametro não foi um numero"
    }

})

//POST é asincrono para obrigar a ação e rotorna ela feita
router.post("/books", async ctx => {

    const body = await ctx.request.body()


    if (ctx.request.hasBody) {
        const resBody = await body.value as Book
        const { title, author } = resBody

        if (title !== undefined && author !== undefined) {

            const newBook = saveBook(resBody)

            ctx.response.body = newBook
            ctx.response.status = Status.Created
        }
        else {
            ctx.response.status = Status.BadRequest
            ctx.response.body = errorResponse(Status.BadRequest, "Requisição faltando campos")
        }
    }
    else {
        ctx.response.status = Status.BadRequest
        ctx.response.body = errorResponse(Status.BadRequest, "Requisição sem corpo")
    }
})

router.put("/books/:id", async ctx => {

    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    const body = await ctx.request.body()

    if (ctx.request.hasBody) {

        const resBody = await body.value as Book
        const { title, author } = resBody

        if (title !== undefined && author !== undefined) {

            resBody.id = parseInt(id)

            ctx.response.body = saveBook(resBody)
            ctx.response.status = Status.OK
        }
        else {
            ctx.response.status = Status.BadRequest
            ctx.response.body = errorResponse(Status.BadRequest, "Requisição faltando campos")
        }
    }
    else {
        ctx.response.status = Status.BadRequest
        ctx.response.body = errorResponse(Status.BadRequest, "Requisição sem corpo")
    }
})

router.delete("/books/:id", async ctx => {
    
    const { id } = helpers.getQuery(ctx, { mergeParams: true });

    if (findBookById(parseInt(id))) {
        deleteBookById(parseInt(id))
        ctx.response.status = Status.OK
    }
    else {
        ctx.response.status = Status.BadRequest
        ctx.response.body = errorResponse(Status.BadRequest, "ID não encontrado")
    }

})


app.use(responseTime)
app.use(logger)
app.use(router.allowedMethods())
app.use(router.routes())

app.addEventListener('listen', () => {
    console.log("Server on 8080")
})


await app.listen({ port: 8080 })