const shelfTitle = document.getElementById('shelfTitle');
const shelfTitleInput = document.getElementById('shelfTitleInput');
const shelfTitleText = document.getElementById('shelfTitleText');
const shelfMenuBtn = document.getElementById('shelfMenuBtn');
const shelfMenu = document.getElementById('shelfMenu');
const shelfMenuScreen = document.getElementById('shelfMenuScreen');






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

shelfMenuBtn.addEventListener('click', ()=>{
    shelfMenuScreen.style.display = 'flex';
    setTimeout(()=>{
        console.log('hi')
        shelfMenu.classList.toggle('reveal');

    }, 50);
});

shelfMenuScreen.addEventListener('click', (e)=>{
    if(e.target === shelfMenuScreen){
        shelfMenu.classList.toggle('reveal');
    setTimeout(()=>{
        console.log('hi')
        shelfMenuScreen.style.display = 'none';

    }, 500);

    }
    

})


