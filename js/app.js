

const shelfTitle = document.getElementById('shelfTitle');
const shelfTitleInput = document.getElementById('shelfTitleInput');
const shelfTitleText = document.getElementById('shelfTitleText');
const shelfMenuBtn = document.getElementById('shelfMenuBtn');

const shelfMenuScreen = document.getElementById('shelfMenuScreen');
const shelfMenu = document.getElementById('shelfMenu');
const menuHandle = document.getElementById('menuHandle');

const innerList = document.getElementById('innerList');
const addShelfContentBtn = document.getElementById('addShelfContentBtn');

const innerShelf = document.getElementById('innerShelf');

const addBookScreen = document.getElementById('addBookScreen');
const addBookExitBtn = document.getElementById('addBookExitBtn');
const bookTitleInput = document.getElementById('bookTitleInput');
const bookCover = document.getElementById('bookCover');
const bookCoverText = document.getElementById('bookCoverText');
const saveBookBtn = document.getElementById('saveBookBtn');

const viewBookBar = document.getElementById('viewBookBar');
const addPageBtn = document.getElementById('addPageBtn');
const reviewModeBtn = document.getElementById('reviewModeBtn');
const updateBtn = document.getElementById('updateBtn');

const openBookScreen = document.getElementById('openBookScreen');
const tableOfContentScreen = document.getElementById('tableOfContentScreen');
const tableOfContentList = document.getElementById('tableOfContentList');
const tocBackBtn = document.getElementById('tocBackBtn');
const tocSaveBtn = document.getElementById('tocSaveBtn');

let shelf_tracker = "";
let active_index = "";
let new_color = "";



class ShelfSystem{
    constructor(){
        this.shelves = [];
        
    }

    checkActiveShelf(){
        let hasActive = this.shelves.some(shelf => shelf.is_active);

        if(!hasActive && this.shelves.length > 0){
            this.shelves[0].is_active = true;
        }
    }

    getActiveShelf(){
        return this.shelves.find(shelf => shelf.is_active);
    }

    addShelf(shelf){
        this.shelves.push(shelf);
    }
}

class Shelf{
    constructor(title){
        this.title = title;
        this.books = [];
        this.books_grouped = [[],[],[]];
        
        this.index_position = 0;
        this.is_active = false;
    }

    

    addBook(book){
        this.books.push(book);
    }

    
    sortBookTitles(){
        let add_book_button = this.books.shift();
        this.books.sort((a,b) => a.title.localeCompare(b.title));
        this.books.push(add_book_button);

    }

    groupBooksByRow(){
    let group_pointer = 0;

    let minimum_row = 3;
    let required_rows = Math.ceil((this.books.length + 1) / 3);
    let total_rows = Math.max(minimum_row, required_rows);

    this.books_grouped = Array.from({ length: total_rows }, () => []);

    for(let i = 0; i < this.books.length; i++){
        if(this.books_grouped[group_pointer].length < 3){
            this.books_grouped[group_pointer].push(this.books[i]);
        } else {
            group_pointer++;
            this.books_grouped[group_pointer].push(this.books[i]);
        }
    }
    console.log(this.books_grouped)
    }

    displayRowOfBooks(){
        let row_index = 0;
        this.groupBooksByRow();

        innerShelf.textContent = "";

        this.books_grouped.forEach(row_of_book =>{
            const row_created = document.createElement('div');

            row_created.className = 'row';
            row_created.id = `row${row_index}`;
            innerShelf.appendChild(row_created);

            row_index++


        })
        innerShelf.scrollTop = 0;
    }

    displayBooksPerRow(){

        for(let shelf = 0; shelf < this.books_grouped.length; shelf++){
            this.books_grouped[shelf].forEach(book=>{
        
                let target_row = document.getElementById(`row${shelf}`);
                let title = document.createElement('p');

                const created_book = document.createElement('div');
                created_book.className = "book";
                created_book.style.backgroundColor = book.color;
                title.textContent = book.title;
                

                created_book.addEventListener('click',()=>{
                    this.books.forEach(book=>{
                        book.is_active = false;
                    });
                    book.is_active = true;
                    displayActiveBookScreen();
                })

                created_book.appendChild(title);
                target_row.appendChild(created_book);
            }
            )
        }
        for(let i = 0; i < this.books_grouped.length;i++){
            if(this.books_grouped[i].length !== 3){
                let target_row = document.getElementById(`row${i}`);
                const made_book = document.createElement('div');
                const text = document.createElement('p');
                
                text.innerHTML = "+<br>Add Book"
                made_book.id = 'addBook';

                made_book.addEventListener('click', ()=> displayAddBookScreen());

                target_row.appendChild(made_book);
                made_book.appendChild(text);

                return
                
                
            }
        }
       
    }
    getActiveBook(){
        return this.books.find(book => book.is_active)
    }
    

    
}

class Book{
    constructor(title){
        this.title = title;
        this.color = "";
        this.is_active = false;
        this.pages = [];
        
    }
}

class Page{
    constructor(question, answer){
        this.question = question;
        this.answer = answer;
    }
}

const shelfSystem = new ShelfSystem();
const shelf = new Shelf('Untitled');
shelf.is_active = true;


shelf.groupBooksByRow()
shelf.displayRowOfBooks()
shelf.displayBooksPerRow();


shelfSystem.addShelf(shelf);
console.log(shelfSystem.shelves[0].title);

function displayActiveBookScreen(){
    addBookScreen.style.display = 'flex';

    setTimeout(()=>{
        addBookScreen.classList.toggle('reveal');

    const shelf = shelfSystem.getActiveShelf();
    const selected_book = shelf.getActiveBook();

    new_color = selected_book.color;

    bookTitleInput.value = selected_book.title;
    bookCoverText.textContent = selected_book.title;
    bookCover.style.backgroundColor = selected_book.color;

    viewBookBar.style.display = 'flex';
    viewBookBar.style.backgroundColor = selected_book.color;

    }, 50)
    

}


function displayAddBookScreen(){
        addBookScreen.style.display = 'flex';

        setTimeout(()=>{
            viewBookBar.style.display = 'none';
        addBookScreen.classList.toggle('reveal');
        bookTitleInput.value = "";
        bookCoverText.textContent = 'Title';
        new_color = "";
        bookCover.style.backgroundColor = 'white';
            
        }, 50)
        
}

function displayTableOfContent(){
    tableOfContentList.textContent = "";
    openBookScreen.style.display = 'flex';
    const shelf = shelfSystem.getActiveShelf();
    const book = shelf.getActiveBook();

    openBookScreen.style.backgroundColor = book.color;

    for(let i = 0; i < book.pages; i++){
        

    }
    let add_page_button = document.createElement('div');
    let add_page_text = document.createElement('h1');
    let manual_add_btn = document.createElement('button');
    let import_add_btn = document.createElement('button');

    add_page_text.textContent = 'Add new page';
    add_page_button.className = 'table-item';
    add_page_button.id = 'addPageItem';
    add_page_button.style.backgroundColor = book.color;
    manual_add_btn.id = 'manualAddBtn';
    manual_add_btn.className = 'table-item';
    manual_add_btn.textContent = 'Manual add'
    import_add_btn.id = 'importCSVBtn';
    import_add_btn.className = 'table-item';
    import_add_btn.textContent = 'Import CSV';

    add_page_button.appendChild(add_page_text);
    add_page_button.appendChild(manual_add_btn);
    add_page_button.appendChild(import_add_btn);
    
    tableOfContentList.appendChild(add_page_button);
    

}





function addNewShelf(){
    shelfSystem.shelves.push(new Shelf('Untitled'));
    displayShelvesInCatalog();
    innerList.scrollTop = innerList.scrollHeight;

}


function makeAddShelfButton(){
    const add_shelf_containter = document.createElement('div');
    const add_shelf_content = document.createElement('div');
    const add_shelf_content_text = document.createElement('p');

    add_shelf_content_text.textContent = '+ Add new Shelf'
    add_shelf_containter.className = 'catalog-item';
    add_shelf_content.className = 'catalog-content';
    add_shelf_content.id = 'addShelfContentBtn';
    add_shelf_containter.id = 'addShelfContainer';

    add_shelf_content.appendChild(add_shelf_content_text);
    add_shelf_containter.appendChild(add_shelf_content);
    innerList.appendChild(add_shelf_containter);

    add_shelf_content.addEventListener('click', ()=>{
        addNewShelf();
    });

}

function setAsActive(shelf){
    shelfSystem.shelves.forEach(stored_shelf =>{
        stored_shelf.is_active = false;

    });
    shelf.is_active = true;

}

function displaySelectedShelf(){
    
    
        const shelf = shelfSystem.getActiveShelf();
    

        shelf.displayRowOfBooks();
        shelf.displayBooksPerRow();

        

        shelfTitleText.textContent = shelf.title;
        shelfTitleInput.value = "";
}



function displayShelvesInCatalog(){
    addBookScreen.style.display = 'flex';
    shelfSystem.checkActiveShelf();
    shelf_tracker = 0;
    innerList.textContent = "";
    makeAddShelfButton();
    const available_shelf = shelfSystem.shelves;

    available_shelf.forEach(shelf => {
        shelf.index_position = shelf_tracker;
        shelf_tracker++;
        
        const shelf_container = document.createElement('div');
        const shelf_content = document.createElement('div');
        const shelf_title = document.createElement('p');
        const delete_shelf_btn = document.createElement('button');

        shelf_title.textContent = shelf.title

        shelf_container.className = "catalog-item";
        shelf_content.className = "catalog-content";
        delete_shelf_btn.className = "delete-shelf-btn";

        if(shelf.is_active){
            shelf_content.style.backgroundColor = 'orange';
        }
        else{
            shelf_content.style.backgroundColor = 'white';
        }

        shelf_content.appendChild(shelf_title);
        shelf_content.appendChild(delete_shelf_btn);
        shelf_container.appendChild(shelf_content);
        innerList.appendChild(shelf_container);

        shelf_content.addEventListener('click', ()=>{
            setAsActive(shelf);
            displayShelvesInCatalog();
            shelfMenu.classList.toggle('open');
            displaySelectedShelf();
            
        });

        delete_shelf_btn.addEventListener('click', ()=>{
            let confirmation = confirm(`Are you sure you want to delete this shelf?\nTitle: ${shelf.title}\nBooks: ${shelf.books.length}`);
            if(shelfSystem.shelves.length > 1){
                if(confirmation){
                    shelfSystem.shelves.splice(shelf.index_position, 1);
                    displayShelvesInCatalog();
                    displaySelectedShelf();
                }
            }
            else{
                alert('You cannot delete your last shelf!');
                return
            }



        })

    });

}


function checkShelfTitle(){
    let curr_title = shelfTitleInput.value.trim();
    const shelf = shelfSystem.getActiveShelf()

    if(curr_title === "" ){
        
        shelf.title = 'Untitled';
        shelfTitleText.textContent = 'Untitled';
        

    }
    else{
        shelf.title = curr_title;
        
    }
    
}

shelfTitleInput.addEventListener('input', ()=>{
    shelfTitleText.textContent = shelfTitleInput.value;
    checkShelfTitle();

});

shelfTitleInput.addEventListener('focus', ()=>{
    const shelf = shelfSystem.getActiveShelf();
    if(shelfTitleText.textContent === 'Untitled'){
        shelfTitleText.textContent = 'Enter your shelf name';
    }
    else{
        shelfTitleInput.value = shelf.title.trim();
    }

}
);

menuHandle.addEventListener('click', ()=>{
    displayShelvesInCatalog();
    shelfMenu.classList.toggle('open');
    
    
})

function changeColor(color){
    
    switch(color){
        case 0:
            new_color = 'white';
            break;
        case 1:
            new_color = 'lightcoral';
            break;
        case 2:
            new_color = 'lightgreen';
            break;
        case 3:
            new_color = 'lightblue';
            break;
    }
    bookCover.style.backgroundColor = new_color;
    viewBookBar.style.backgroundColor = new_color;
    return new_color;
}

bookTitleInput.addEventListener('input', ()=>{
    
    bookCoverText.textContent = bookTitleInput.value;

});

addBookExitBtn.addEventListener('click', ()=>{
    addBookScreen.classList.toggle('reveal');
    setTimeout(()=>{
        addBookScreen.style.display = 'none';

    },500)
})

saveBookBtn.addEventListener('click', ()=>{
    const shelf = shelfSystem.getActiveShelf();
    if(bookTitleInput.value.trim() === ""){
        alert('Book title cannot be empty.')
        bookTitleInput.focus()
    }
    else if(!new_color){
        alert('Book color is required. Please select one.')
    }
    else{
        alert(`${bookTitleInput.value} added to ${shelf.title}!`);
        let new_book = new Book(bookTitleInput.value.trim());
        new_book.color = new_color;
        shelf.addBook(new_book);
        addBookScreen.classList.toggle('reveal');
        displaySelectedShelf();
    }
});

addPageBtn.addEventListener('click', ()=>{
    displayTableOfContent();
})


updateBtn.addEventListener('click', ()=>{
    const shelf = shelfSystem.getActiveShelf();
    const active_book = shelf.getActiveBook();

    if(bookTitleInput.value.trim() === ""){
        alert('Book title cannot be updated to empty.')
        bookTitleInput.focus()
    }
    else{
        let title_before = active_book.title;
        let color_before = active_book.color;

        active_book.color = new_color;
        active_book.title = bookTitleInput.value.trim();
        alert(`Book successfully updated!\n\nTitle Changes:\n${title_before} => ${active_book.title}\n\nColor Changes:\n${color_before} => ${active_book.color}`);

        addBookScreen.classList.toggle('reveal');
        displaySelectedShelf();
    }

});

    tocBackBtn.addEventListener('click', ()=>{
        openBookScreen.style.display = 'none';
    })




