const spinner = document.getElementById('spinner');
const errorMsg = document.getElementById('errorMessage');
const noOfBooks = document.getElementById('numberOfBooks');
const nullError = document.getElementById('nullError');
const searchResult = document.getElementById('searchResult');
const searchBook = async () => {
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
    errorMsg.style.display = "none";
    noOfBooks.style.display = "none";
    nullError.style.display = "none";
    spinner.style.display = "block";
    searchResult.textContent = '';
    if (searchText === '') {
        nullError.style.display = "block";
        spinner.style.display = "none";
    }
    else {
        // load data
        const url = `http://openlibrary.org/search.json?q=${searchText}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            displaySearchResult(data)
        }
        catch (error) {
            console.log(error);
            errorMsg.style.display = "block";
            noOfBooks.style.display = "none";
            spinner.style.display = "none";


        }
    }
    // clear data
    searchField.value = '';
}
const displaySearchResult = data => {
    searchResult.textContent = '';
    errorMsg.style.display = "none";
    noOfBooks.style.display = "block";
    spinner.style.display = "none";
    noOfBooks.innerHTML = `<b>Total Found: </b>${data.numFound}`;
    const books = data.docs;
    if (books.length === 0) {
        errorMsg.style.display = "block";
        noOfBooks.style.display = "none";
        spinner.style.display = "none";
    }
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100" data-bs-toggle="modal" data-bs-target="#bookDetails">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top p-3" alt="">
        <div class="card-body">
            <h5 class="card-title text-center"><b>${book.title}</b></h5>
            <p><b>Written By: </b><span class="text-primary">${book.author_name}</span> </p>
            <p><b>Publisher: </b>${book.publisher}</p>
            <p><b>1st Publication year: </b>${book.first_publish_year}</p>
        </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}