const shelfTitle = document.getElementById('shelfTitle');
const shelfTitleInput = document.getElementById('shelfTitleInput');
const shelfTitleText = document.getElementById('shelfTitleText');
const shelfMenuBtn = document.getElementById('shelfMenuBtn');

const shelfMenuScreen = document.getElementById('shelfMenuScreen');
const shelfMenu = document.getElementById('shelfMenu');
const menuHandle = document.getElementById('menuHandle');

const innerList = document.getElementById('innerList');
const addShelfContentBtn = document.getElementById('addShelfContentBtn');












class ShelfSystem{
    constructor(){
        this.shelves = [];
    }

    

    addShelf(shelf){
        this.shelves.push(shelf);
    }
}

class Shelf{
    constructor(title){
        this.title = title;
    }


}

const shelfSystem = new ShelfSystem();
const shelf1 = new Shelf('Untitled');
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

function displayShelvesInCatalog(){
    innerList.innerHTML = "";
    makeAddShelfButton();
    const available_shelf = shelfSystem.shelves;

    available_shelf.forEach(shelf => {
        const shelf_container = document.createElement('div');
        const shelf_content = document.createElement('div');
        const shelf_title = document.createElement('p');
        const delete_shelf_btn = document.createElement('button');

        shelf_title.innerHTML = shelf.title

        shelf_container.className = "catalog-item";
        shelf_content.className = "catalog-content";
        delete_shelf_btn.className = "delete-shelf-btn";

        shelf_content.appendChild(shelf_title);
        shelf_content.appendChild(delete_shelf_btn);
        shelf_container.appendChild(shelf_content);
        innerList.appendChild(shelf_container);


    });

}


function checkShelfTitle(){
    curr_title = shelfTitleInput.value;

    if(curr_title === " " || curr_title === ""){
        shelfTitleInput.value = "";
        shelf1.title = 'Untitled';
        shelfTitleText.innerHTML = 'Untitled';
        console.log(shelfSystem.shelves[0].title)

    }
    else{
        shelf1.title = curr_title;
        console.log(shelfSystem.shelves[0].title)
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
        shelfTitleInput.value = shelfTitleText.innerHTML.trim();
    }

}
);

menuHandle.addEventListener('click', ()=>{
    displayShelvesInCatalog();
    shelfMenu.classList.toggle('open');
    innerList.scrollTop = 0;
    
})






