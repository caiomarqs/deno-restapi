import { Book, books } from "../model/mod.ts"

const findBookById = (id: number): Book | undefined => {
    return books.find(book => book.id === id)
}

const saveBook = (bookToSave: Book): Book | undefined => {

    if (bookToSave.id === 0 || bookToSave.id === undefined) {
        let newId = books[books.length - 1].id
        bookToSave.id = ++newId

        books.push(bookToSave)

        return bookToSave
    }
    else if (findBookById(bookToSave.id) === undefined) {
        throw new Error("Livro não encontrado")
    }
    else if (bookToSave.id > 0) {
        books.forEach((book, i) => {
            if (book.id === bookToSave.id) {
                books[i] = bookToSave
            }
        })
    }
}

const deleteBookById = (id: number): void => {
    if (findBookById(id)) {
        books.forEach((book, i) => {
            if (book.id === id) books.splice(i, 1)
        })
    }
    else {
        throw new Error("Livro não encontrado")
    }
}

export { findBookById, saveBook, deleteBookById }