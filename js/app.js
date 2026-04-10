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

let shelf_tracker = "";
let active_index = "";



class ShelfSystem{
    constructor(){
        this.shelves = [];
        
    }

    checkActiveShelf(){
        active_index = 0;
        let counter = 0;
        let active_found = false;
        this.shelves.forEach(shelf =>{
            if(shelf.is_active){
                active_found = true;
                active_index = counter;

            }
            counter++;
        });
        if(!active_found){
            this.shelves[0].is_active = true;
            active_found = true;

        };

    };

    addShelf(shelf){
        this.shelves.push(shelf);
    }
}

class Shelf{
    constructor(title){
        this.title = title;
        this.rows = 3;
        this.books = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9];
        this.books_grouped = [[],[],[]];
        
        this.index_position = 0;
        this.is_active = false;
    }

    sortBookTitles(){
        this.books.sort((a,b) => a.title.localeCompare(b.title));

    }

    groupBooksByRow(){
    let group_pointer = 0;

    let minimum_row = 3;
    let required_rows = Math.ceil(this.books.length / 4);
    let total_rows = Math.max(minimum_row, required_rows);

    this.books_grouped = Array.from({ length: total_rows }, () => []);

    for(let i = 0; i < this.books.length; i++){
        if(this.books_grouped[group_pointer].length < 4){
            this.books_grouped[group_pointer].push(this.books[i]);
        } else {
            group_pointer++;
            this.books_grouped[group_pointer].push(this.books[i]);
        }
    }
    console.log(this.books_grouped)
    }

    displayRowOfBooks(){
        this.groupBooksByRow();
        innerShelf.innerHTML = "";

        this.books_grouped.forEach(row_of_book =>{
            const row_created = document.createElement('div');

            row_created.className = 'row';
            innerShelf.appendChild(row_created);


        })
    }

    
}

class Book{
    constructor(title){
        this.title = title;
    }
}

const shelfSystem = new ShelfSystem();
let shelf1 = new Shelf('Untitled');
shelf1.groupBooksByRow()
shelf1.displayRowOfBooks()

shelfSystem.addShelf(shelf1);




function addNewShelf(){
    shelfSystem.shelves.push(new Shelf('Untitled'));
    displayShelvesInCatalog();
    innerList.scrollTop = innerList.scrollHeight;

}


function makeAddShelfButton(){
    const add_shelf_containter = document.createElement('div');
    const add_shelf_content = document.createElement('div');
    const add_shelf_content_text = document.createElement('p');

    add_shelf_content_text.innerHTML = '+ Add new Shelf'
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
    shelf1 = shelfSystem.shelves.find(s => s.is_active);

    shelf1.displayRowOfBooks();
    
    console.log(shelf1)
    shelfTitleText.innerHTML = shelf1.title;

    shelfTitleInput.value = "";
   

}



function displayShelvesInCatalog(){
    shelfSystem.checkActiveShelf();
    shelf_tracker = 0;
    innerList.innerHTML = "";
    makeAddShelfButton();
    const available_shelf = shelfSystem.shelves;

    available_shelf.forEach(shelf => {
        shelf.index_position = shelf_tracker;
        shelf_tracker++;
        
        const shelf_container = document.createElement('div');
        const shelf_content = document.createElement('div');
        const shelf_title = document.createElement('p');
        const delete_shelf_btn = document.createElement('button');

        shelf_title.innerHTML = shelf.title

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
            displaySelectedShelf(shelf);
            
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

    if(curr_title === "" ){
        
        shelf1.title = 'Untitled';
        shelfTitleText.innerHTML = 'Untitled';
        

    }
    else{
        shelf1.title = curr_title;
        
    }
    
}

shelfTitleInput.addEventListener('input', ()=>{
    shelfTitleText.innerHTML = shelfTitleInput.value;
    checkShelfTitle();

});

shelfTitleInput.addEventListener('focus', ()=>{
    if(shelfTitleText.innerHTML === 'Untitled'){
        shelfTitleText.innerHTML = 'Enter your shelf name';
    }
    else{
        shelfTitleInput.value = shelf1.title.trim();
    }

}
);

menuHandle.addEventListener('click', ()=>{
    displayShelvesInCatalog();
    shelfMenu.classList.toggle('open');
    
    
})






