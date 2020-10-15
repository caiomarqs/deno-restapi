interface Book {
    id: number;
    title: string;
    author: string;
};

let books: Book[] = [
    {
        id: 1,
        title: "The Hound of the Baskervilles",
        author: "Conan Doyle, Arthur",
    },
];

export { books, Book }