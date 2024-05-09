//^ ELEMENTS
document.querySelector('#homeBtn');
document.querySelector('#gamesBtn');
document.querySelector('#toolsBtn');
document.querySelector('#aboutBtn');
document.querySelector('#contactsBtn');
document.querySelector('#Btn');
const navBtn = document.querySelectorAll('.mainNavItem');
const mainSections = document.querySelectorAll('.mainSection');
const stars = document.querySelectorAll('.star');



//^ VARIABLES
let todoList = [];
let starred = [];
let lastSection = 'Home'
const starredStorage = localStorage.getItem('starred')
if (starredStorage) starred = JSON.parse(starredStorage)
const lastSectionStorage = localStorage.getItem('lastSection')
if (lastSectionStorage) lastSection = JSON.parse(lastSectionStorage)


//^ FUNCTIONS
let renderStars = () => {

    localStorage.setItem('starred', JSON.stringify(starred))

    stars.forEach( (star, index) => {
        if (starred.includes(index)) stars[index].classList.add('starFull')
        else star.classList.remove('starFull')
    })
}

renderStars()

let setLastSection = (lastSection) => {
    localStorage.setItem('lastSection', JSON.stringify(lastSection))
}

let showSection = (item) => {
    console.log(item)
        let lowerItem = item.toLowerCase()
        
        mainSections.forEach( (section) => {
            section.classList.add('hidden')
        })

        setLastSection(item)

        const section = document.querySelector(`#${lowerItem}`)
        section.classList.remove('hidden')
}

showSection(lastSection)


//^ EVENTS
navBtn.forEach( (btn) => {
    btn.addEventListener('click', () => {
    let item = btn.innerText
    showSection(item)
    })
})
    

stars.forEach( (star, index) => {
    
    star.addEventListener('click', () => {

    if (starred.includes(index)) {
        const j = starred.indexOf(index)
        console.log(j)
        starred.splice(j, 1)
    } else {
        starred.push(index)
    }
        
        renderStars()
    })
})