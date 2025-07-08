const myBooks = [];
action("The Great Gatsby", "F. Scott Fitzgerald", 234, true);
action("The Kite Runner", "Khaled Hosseini", 543, false);
function Book(title, author, pages, read)
{
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function createBook(title, author, pages, read) 
{
  const book = new Book(title, author, pages, read);
 
  myBooks.push(book);
}


Book.prototype.toggle = function (book, btn) {
  if(btn.classList.contains("book-read"))
  {
    btn.classList.remove("book-read");
    btn.classList.add("book-not-read");
    btn.textContent = "Not Read";
    book.read = false;
  }
  else
  {

    btn.classList.remove("book-not-read");
    btn.classList.add("book-read");
    btn.textContent = "Read";
    book.read = true;
  }
}

Book.prototype.remove = function(i) {
   myBooks.splice(i, 1);
         displayBooks();
      
}

function displayBooks() 
{
  
  let finalHTML = "";
  for(let book of myBooks)
  {
    if(book.read)
    {
       finalHTML += `<div class="card"> <p>${book.title}</p> <p>${book.author}</p> <p>${book.pages} </p> <button data-id = ${book.id} class="read-status book-read">Read</button> <button class="remove" data-id = ${book.id}> Remove </button> </div>`;
    }
    else
    {
       finalHTML += `<div class="card"> <p>${book.title}</p> <p>${book.author}</p> <p>${book.pages} </p> <button data-id = ${book.id} class="read-status book-not-read">Not Read</button> <button data-id = ${book.id} class="remove" > Remove </button> </div>`;
    }
   

  }
  document.querySelector('.display').innerHTML = finalHTML;
  config();

}

function action(title, author, pages, read)
{
  // fig out
  createBook(title, author, pages, read);
  displayBooks();

 
}

function config()
{
   const readButtons = document.querySelectorAll('.read-status');
  const rmButtons = document.querySelectorAll('.remove');
  
  readButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    for(let book of myBooks)
    {
      if(btn.dataset.id === book.id)
      {
        book.toggle(book, btn);
        break;
      }
    }

  });
});


  rmButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    console.log('hi');
    for(let i = 0; i < myBooks.length; i++)
    {
      if(myBooks[i].id === btn.dataset.id)
      {
        myBooks[i].remove(i);
      }
    }

  });
});
}

// displayBooks();

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#add-button");
const closeButton = document.querySelector(".add");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  console.log("hi");
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read");
  
  if(title === "" || author === "" || pages === "")
  {
    alert("Please fill in all forms!");
    return;
  }

 


  action(title, author, pages, read.checked);
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  dialog.close();
});



