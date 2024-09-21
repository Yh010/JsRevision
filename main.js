class Book {
    constructor(id, title, author, publicationDate) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.publicationDate = publicationDate;
    }
}

class BookItem {
    constructor(book, barcode) {
        this.book = book;
        this.barcode = barcode;
        this.isAvailable = true;
        this.dueDate = null;
        this.issuedTo = null;
    }
}

class User {
    constructor(barcode, name) {
        this.barcode = barcode;
        this.name = name;
    }
}

class Librarian extends User {
    constructor(barcode, name) {
        super(barcode, name);
    }

    addBook(library, book) {
        library.books.push(book);
    }

    addBookItem(library, bookItem) {
        library.bookItems.push(bookItem);
    }

    removeBook(library, bookId) {
        library.books = library.books.filter(book => book.id !== bookId);
        library.bookItems = library.bookItems.filter(item => item.book.id !== bookId);
    }

    removeBookItem(library, barcode) {
        library.bookItems = library.bookItems.filter(item => item.barcode !== barcode);
    }

    addUser(library, user) {
        library.users.push(user);
    }

    removeUser(library, userBarcode) {
        library.users = library.users.filter(user => user.barcode !== userBarcode);
    }

    checkoutBook(library, member, barcode) {
        return library.checkoutBook(member, barcode);
    }

    renewBook(library, member, barcode) {
        return library.renewBook(member, barcode);
    }

    returnBook(library, member, barcode) {
        return library.returnBook(member, barcode);
    }
}

class Member extends User {
    constructor(barcode, name) {
        super(barcode, name);
        this.checkedOutBooks = [];
    }

    checkoutBook(library, barcode) {
        return library.checkoutBook(this, barcode);
    }

    renewBook(library, barcode) {
        return library.renewBook(this, barcode);
    }

    returnBook(library, barcode) {
        return library.returnBook(this, barcode);
    }
}

class Library {
    constructor() {
        this.books = [];
        this.bookItems = [];
        this.users = [];
        this.maxBooksPerMember = 3;
        this.maxCheckoutDays = 20;
        this.finePerDay = 5;  
    }

    searchCatalog(query) {
        return this.books.filter(book =>
            book.title.includes(query) ||
            book.author.includes(query) ||
            book.publicationDate.includes(query)
        );
    }

    checkoutBook(member, barcode) {
        if (member.checkedOutBooks.length >= this.maxBooksPerMember) {
            return `Error: Member has already checked out the maximum number of books (${this.maxBooksPerMember})`;
        }

        let bookItem = this.bookItems.find(item => item.barcode === barcode && item.isAvailable);
        if (!bookItem) {
            return `Error: Book item is either not available or doesn't exist.`;
        }

        let dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + this.maxCheckoutDays);
        bookItem.isAvailable = false;
        bookItem.dueDate = dueDate;
        bookItem.issuedTo = member.barcode;
        member.checkedOutBooks.push(bookItem);

        return `Book checked out. Due date is ${dueDate.toLocaleDateString()}.`;
    }

    renewBook(member, barcode) {
        let bookItem = member.checkedOutBooks.find(item => item.barcode === barcode);
        if (!bookItem) {
            return `Error: Member has not checked out this book.`;
        }

        let newDueDate = new Date();
        newDueDate.setDate(newDueDate.getDate() + this.maxCheckoutDays);
        bookItem.dueDate = newDueDate;

        return `Book renewed. New due date is ${newDueDate.toLocaleDateString()}.`;
    }

    returnBook(member, barcode) {
        let bookItemIndex = member.checkedOutBooks.findIndex(item => item.barcode === barcode);
        if (bookItemIndex === -1) {
            return `Error: This book was not checked out by this member.`;
        }

        let bookItem = member.checkedOutBooks[bookItemIndex];
        let today = new Date();
        let fine = 0;

        if (today > bookItem.dueDate) {
            let lateDays = Math.ceil((today - bookItem.dueDate) / (1000 * 60 * 60 * 24));  
            fine = lateDays * this.finePerDay;
        }

        bookItem.isAvailable = true;
        bookItem.dueDate = null;
        bookItem.issuedTo = null;
        member.checkedOutBooks.splice(bookItemIndex, 1);  

        return `Book returned. Fine: ${fine} units.`;
    }
}


const library = new Library();

const librarian = new Librarian("L001", "Alice");

const book1 = new Book(1, "JavaScript: The Good Parts", "Douglas Crockford", "2008-05-15");
const bookItem1 = new BookItem(book1, "B001");

librarian.addBook(library, book1);
librarian.addBookItem(library, bookItem1);

const member = new Member("M001", "John");


console.log(member.checkoutBook(library, "B001")); 

console.log(member.returnBook(library, "B001"));  
