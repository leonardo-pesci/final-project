//^ ELEMENTS
document.querySelector('#homeBtn');
document.querySelector('#gamesBtn');
document.querySelector('#toolsBtn');
document.querySelector('#aboutBtn');
document.querySelector('#contactsBtn');
document.querySelector('#Btn');
const navBtn = document.querySelectorAll('.nav-item');
const mainSections = document.querySelectorAll('.mainSection')



//^ VARIABLES




//^ FUNCTIONS




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



