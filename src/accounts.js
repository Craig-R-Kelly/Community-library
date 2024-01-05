/* "...returns the account object that has the matching ID." */
function findAccountById(accounts, id) {
  const foundAccount = accounts.find((account) => account.id === id);
return foundAccount;
}


////////// I THREW THIS GOOFY ONE IN TO HAVE A USE OF .map:
function contrivedUseOfMap(accounts) {
  const lcSurnames = accounts.map((account) => account.name.last.toLowerCase());
  return lcSurnames;
}


/* "...returns a sorted array of the provided account objects. The 
objects are sorted alphabetically by last name." */
function sortAccountsByLastName(accounts){
  accounts.sort((itemA, itemB) => {
    const nameA = itemA.name.last; 
    const nameB = itemB.name.last; 
//     const nameA = itemA.name.last.toLowerCase(); 
//     const nameB = itemB.name.last.toLowerCase(); 
    if (nameA < nameB) {
      return -1
    }else{
      return 1
    };
  });
  return(accounts);
} 
// Note: for some reason I wasn't able to alter `accounts`
// if I used the ternary operator to campare A and B thus
//           nameA < nameB ? -1 : 1;


/* "...returns a _number_ that represents the number of times the account's
ID appears in any book's `borrows` array." */
function getTotalNumberOfBorrows(account, books){
  let arr = [];
  for (const book in books) {
    const bookId = (books[book].id);
    const loans = (books[book].borrows);
    someVariable = loans.reduce((counter, loan) => {
      if (loan.id === account.id) {arr.push(".")};
    });
  };
  result=arr.length;
  return result;
}


/*This helper function is called by function `getBooksPossessedByAccount`.  It 
  generates the array `checkedOut` to which that parent function will then add 
  content.*/
function checkedOutArrayMaker(account, books) {
  let checkedOut = [];
  for (let i = 0; i < books.length; i++) { //outer loop for each book
    const book = books[i];
    const borrow = book.borrows;
    for (let j = 0; j < borrow.length; j++) { //inner loop for each of its borrows
      if (borrow[j].id === account.id && borrow[j].returned === false) {
        checkedOut.push(book)
      };
    }
  }
  return checkedOut;
}


/* "...has three parameters, in the following order:
-An account object
-An array of all book objects
-An array of all author objects
It returns an array of book objects, including author information,
that represents all books _currently checked out_ by the given account." */
function getBooksPossessedByAccount(account, books, authors) {
  const checkedOut = checkedOutArrayMaker(account, books);  //Get the array.
    //Now add more content to it:
  for (let i = 0; i < checkedOut.length; i++) { //outer loop for each book checked out
    const index = checkedOut[i].authorId;
    for (let j = 0; j < authors.length; j++) { //inner loop for each author
      const thisAuthorsId = authors[j].id;
      if (thisAuthorsId === index) {
        checkedOut[i].author = authors[j]
      }
    }
  }
  return checkedOut;  //Function output is array built by helper function, enlarged.
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
