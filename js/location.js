locationButton = document.querySelector('.js-location-btn')

locationDropdown = document.querySelector('.js-location-dropdown');

locationWrapper = document.querySelector('.location-wrapper')

locationButton.addEventListener('click',(e) =>{
    e.stopPropagation()
    locationDropdown.classList.toggle('active')

})

document.addEventListener('click',(event) => {

    if (!locationWrapper.contains(event.target)){
        locationDropdown.classList.remove('active')
    }
})