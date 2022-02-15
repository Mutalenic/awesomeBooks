let storedBooks = [];
const list = document.querySelector('.bookList');
const form = document.querySelector('.booksForm');
const title = document.querySelector('#bookTitle');
const author = document.querySelector('#bookAuthor');

function removebook(item, index) {
    const bookData = document.getElementById(index);
    storedBooks = storedBooks.filter((item) => item !== bookitem);
    localStorage.setItem('c', JSON.stringify(books));
    list.removeChild(bookData);
}

function addBook(item, index) {
    const bookData = document.createElement('div');
    bookData.classList.add('bookData');
    bookData.id = index;

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-btn');
    removeButton.innertext = 'Remove';

    const horizontalLine = document.createElement('hr');

    bookData.innerHTML = ` <p class= 'bookTitle'> ${item.title}</p> 
    <p class="bookAuthor">${item.author}</p> `;
    bookData.appendChild(removeButton);
    bookData.appendChild(horizontalLine);
    list.appendChild(bookData);

    removeButton.onclick = () => {
        removebook(item, index);
    };

    function addBook(item){
        books.push({
            title: title.value,
            author: author.value,
        });

        localStorage.setItem('bookCollection', JSON.stringify(books));
        title.value = '';
        author.value = '';
        addBook(item, (books.length - 1));
    }

    function updateUI() {
        if (localStorage.getItem('bookCollection')) {
            books = JSON.parse(localStorage.getItem('bookCollection'));
            books.forEach((item, index) => {
                addBook(item, index);
            });
        } else {
            localStorage.setItem('bookCollection', '');
            books = [];
        }
    }

    updateUI();
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addBook({
            title: title.value,
            author: author.value,
        });
    });


}