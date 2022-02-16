let storedBooks = [];
const list = document.querySelector('.bookList');
const form = document.querySelector('form');
const title = document.querySelector('#bookTitle');
const author = document.querySelector('#bookAuthor');

function removebook(bookinfo, index) {
  const bookData2 = document.getElementById(index);

  const { author: aut, title: tit } = bookinfo;
  storedBooks = storedBooks.filter((item) => item.author !== aut && item.title !== tit);

  localStorage.setItem('bookCollection', JSON.stringify(storedBooks));
  list.removeChild(bookData2);
}

function addBook(bookinfo, index) {
  const bookData = document.createElement('div');
  bookData.classList.add('bookData');
  bookData.id = index;

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-btn');
  removeButton.innerText = 'Remove';

  const horizontalLine = document.createElement('hr');

  bookData.innerHTML = `<p class='bookTitle'>${bookinfo.title}</p> 
    <p class='bookAuthor'>${bookinfo.author}</p> `;
  bookData.appendChild(removeButton);
  bookData.appendChild(horizontalLine);
  list.appendChild(bookData);

  removeButton.onclick = () => {
    removebook(bookinfo, index);
  };
}

function addBookItems(item) {
  storedBooks.push({
    title: title.value,
    author: author.value,
  });

  localStorage.setItem('bookCollection', JSON.stringify(storedBooks));
  title.value = '';
  author.value = '';
  addBook(item, storedBooks.length - 1);
}

function updateUI() {
  if (localStorage.getItem('bookCollection')) {
    storedBooks = JSON.parse(localStorage.getItem('bookCollection'));
    storedBooks.forEach((bookinfo, index) => {
      addBook(bookinfo, index);
    });
  } else {
    localStorage.setItem('bookCollection', '');
    storedBooks = [];
  }
}

updateUI();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookItems({
    title: title.value,
    author: author.value,
  });
});
