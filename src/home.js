/////////////////////
// HELPER FUNCTION //
/////////////////////
/* reorders, truncates, and returns an array */
function orderAndTruncate(arr) {
  arr.sort ((a, b) => b.count - a.count);
  arr = arr.splice(0,5);
  return arr;
}


/* "...returns a _number_ that represents the number 
of book objects inside of the array." */
function getTotalBooksCount(books) {
  return books.length;
}


/* "...returns a _number_ that represents the number of 
account objects inside of the array." */
function getTotalAccountsCount(accounts) {
  return accounts.length;
}


/* "...returns a _number_ that represents the number of 
books _that are currently checked out of the library._ */
function getBooksBorrowedCount(books) {
  const inBooks = [];
  const outBooks = [];
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const bookBorrows = book.borrows
    const bookIsIn = bookBorrows.every((loan) => loan.returned === true);
    if (bookIsIn){
      inBooks.push(book)
    }else{
      outBooks.push(book)
    }
  }
  return outBooks.length;
}


/* "...returns an array containing five objects or fewer that 
represents the most common occurring genres, ordered from 
most common to least.
Each object in the returned array has two keys:
- The `name` key which represents the name of the genre.
- The `count` key which represents the number of times the 
genre occurs.
Even if there is a tie, the array should only contain no
more than five objects."*/
function getMostCommonGenres(books){
  const genres = [];
  const genresWithTallies = [];
// Populate an array with all the genres present, however many  
  for (let i = 0; i < books.length; i++) {
    genrePresent = genres.some((genre) => genre === books[i].genre);
    if (genrePresent === false) {genres.push(books[i].genre)}
  };
// Now for each genre, comb through the book array and get a count
// of all books of that genre.  Fill a new array with an object for 
// each genre, with `name` and `count` keys.
  for (let j = 0; j < genres.length; j++) { //outer loop for each genre
    let genreTally = 0;
    for (let k = 0; k < books.length; k++) { //inner loop for each book
      if (books[k].genre === genres[j]) {
        genreTally ++
      }
    }
    const obj = { name : genres[j], count : genreTally};
    genresWithTallies.push(obj);
  }
// reorder and truncate array with helper function.
  let result = orderAndTruncate(genresWithTallies);
  return result;
};


/* "...returns an array containing five objects or fewer that 
represents the most popular books in the library. Popularity 
is represented by the number of times a book has been borrowed.
Each object in the returned array has two keys:
- The `name` key which represents the title of the book.
- The `count` key which represents the number of times the
book has been borrowed.
Even if there is a tie, the array should only contain no more
than five objects." */
function getMostPopularBooks(books){
  const titlesWithTallies = [];
  for (let i = 0; i < books.length; i++) {
    const obj = { name : books[i].title, count : books[i].borrows.length};
    titlesWithTallies.push(obj);
  }
  //reorder and truncate with helper function
  let result = orderAndTruncate(titlesWithTallies);
  return result;
};


/* "...has two parameters, in the following order:
- An array of book objects.
- An array of author objects.
It returns an array containing five objects or fewer that 
represents the most popular authors whose books have been 
checked out the most. Popularity is represented by finding 
all of the books written by the author and then adding up the 
number of times those books have been borrowed.
Each object in the returned array has two keys:
- The `name` key which represents the first and last name of 
the author.
- The `count` key which represents the number of times the 
author's books have been borrowed.
Even if there is a tie, the array should contain no more than 
five objects." */
function getMostPopularAuthors(books, authors){
  /* comb through `books` array, and make a new array containing
     author ids.*/
    const idList = [];
    for (let i = 0; i < books.length; i++) {
      thisId = books[i].authorId;
      if (idList.includes(thisId) === false) {
        idList.push(thisId);
      }
    }
  /* record a tally of borrows from each author */
    let idBorrows = [];
    for (let j = 0; j < idList.length; j++) { //for each author id
      let borrowsTally = 0;
      for (let k = 0; k < books.length; k++) { //compare to that of each book
        const thisBook = books[k];
        if (thisBook.authorId === idList[j]) {
          borrowsTally += thisBook.borrows.length
        }
      }
      const obj = {name:idList[j], count:borrowsTally};
      idBorrows.push(obj);
    }
  /* reorder and truncate array*/
  idBorrows.sort ((a, b) => b.count - a.count); // rank most to fewest borrows
  idBorrows = idBorrows.splice(0,5);            // now cap array length at 5
  // NOTE: invoking my helper function `orderAndTruncate` here messed up my
  // final array, and had me failing 2/20 Qualified tests.
  // I guess problem was its sequence in placement relative to other code?
  // I did, however, keep the helper function for two other functions.   
  /* now for key `name`, swap value from author id to name */
    const nameBorrows = idBorrows;
    for (let l = 0; l < nameBorrows.length; l++) {
      const thisAuthor = nameBorrows[l].name;
      found = authors.find((author) => author.id === thisAuthor);
      const wholeName = `${found.name.first} ${found.name.last}`;
      nameBorrows[l].name = wholeName;
    }
    return nameBorrows;
  }

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
