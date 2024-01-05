/* "...returns the author object that has the matching ID." */
function findAuthorById(authors, id) {
  const foundAuthor = authors.find((author) => author.id === id);
  return foundAuthor;
}


/* "...returns the book object that has the matching ID." */
function findBookById(books, id) {
  const foundBook = books.find((book) => book.id === id);
  return foundBook;
}


/* "...returns an array with two arrays inside of it. All of the 
inputted books are present in either the first or second array.
The first array contains book objects that represent the books 
_that are currently checked out_, while the second array contains 
book objects that represent the books _that have been returned._ */
////////// ORIGINAL SUBMISSION:
// function partitionBooksByBorrowedStatus(books) {
//   const inBooks = [];
//   const outBooks = [];
//   for (let i = 0; i < books.length; i++) {
//     const book = books[i];
//     const bookBorrows = book.borrows
//     const bookIsIn = bookBorrows.every((loan) => loan.returned === true);
//     if (bookIsIn){
//       inBooks.push(book)
//     }else{
//       outBooks.push(book)
//     }
//   }
//   const outBooksAndInBooks = [outBooks, inBooks];
//   return outBooksAndInBooks;
// }    
////////// REVISED, THIS TIME WITH .filter
function partitionBooksByBorrowedStatus(books) { 
  const outBooks = books.filter((book) => book.borrows.some((loan)=>loan.returned===false));
  const inBooks = books.filter((book) => book.borrows.every((loan)=>loan.returned===true)); 
  const outBooksAndInBooks = [outBooks, inBooks];
  return outBooksAndInBooks; 
}


/* "...should return an array of ten or fewer account objects that 
represents the accounts given by the IDs in the provided book's 
`borrows` array. However, each account object should include the 
`returned` entry from the corresponding transaction object in the 
`borrows` array." */
function getBorrowersForBook(book, accounts) {
  const getBorrowersForBookArray = [];
  const trueBorrowersQty = book.borrows.length;
  const usableBorrowersQuantity = trueBorrowersQty > 10 ? 10 : trueBorrowersQty;
  for (let i = 0; i < usableBorrowersQuantity; i++){
    const found = accounts.find((account) => account.id === book.borrows[i].id);
    found.returned = book.borrows[i].returned; //add to this object desired property and value
    getBorrowersForBookArray.push(found);
  };
  return getBorrowersForBookArray;
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
