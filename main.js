
const errorDiv = document.getElementById('error');
const searchBook = () => {
    const searchInput = document.getElementById('searchBook');
    const searchText = searchInput.value;
    if (searchText === '') {
        errorDiv.innerText = 'search field emty';
    }
    // console.log(searchText)

    searchInput.value = '';

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => viewSearchResult(data.docs));
}

const viewSearchResult = docs => {
    const searchResultView = document.getElementById('searchResult');
    searchResultView.innerHTML = '';

    docs.forEach(doc => {

        // console.log(doc);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
           <div class="card">
               <img src="https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg">
                <h4>Book:${doc.title}</h4>
                <h5>Author: ${doc.author_name}</h5>
                <p>First publish:${doc.first_publish_year} </p>
             </div>
           </div>
        `;

        searchResultView.appendChild(div);
        if (doc.status === 404) {
            errorDiv.innerText = 'result not found';
        }
        else {
            errorDiv.innerText = '';
        }
    });
}
