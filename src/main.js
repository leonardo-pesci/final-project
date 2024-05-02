//^ ELEMENTS
document.querySelector('#homeBtn');
document.querySelector('#gamesBtn');
document.querySelector('#toolsBtn');
document.querySelector('#aboutBtn');
document.querySelector('#contactsBtn');
document.querySelector('#Btn');
const navBtn = document.querySelectorAll('.nav-item');
const mainSections = document.querySelectorAll('.mainSection');
const stars = document.querySelectorAll('.star');



//^ VARIABLES
let starred = [];
let todoList = []
const starredStorage = localStorage.getItem('starred')
if (starredStorage) starred = JSON.parse(starredStorage)



//^ FUNCTIONS
let renderStars = () => {



    localStorage.setItem('starred', JSON.stringify(starred))
    console.log(starred)

    stars.forEach( (star, index) => {
        if (index in starred) star.classList.add('starFull')
        else star.classList.remove('starFull')
    })
}

renderStars()



//^ EVENTS
navBtn.forEach( (btn) => {
    btn.addEventListener('click', () => {
        let item = btn.innerText
        let lowerItem = item.toLowerCase()
        let list = ['home', 'games', 'tools', 'about', 'contacts']

        mainSections.forEach( (section) => {
            section.classList.add('hidden')
        })

        const section = document.querySelector(`#${lowerItem}`)
        section.classList.remove('hidden')
    })
})

stars.forEach( (star, index) => {
    star.addEventListener('click', () => {
        // star.classList.toggle('starFull')
        if (index in starred) {
            const j = starred.indexOf(index)
            starred.splice(j, 1)
        } else {
            starred.push(index)
        }
        
        renderStars()
    })
})



