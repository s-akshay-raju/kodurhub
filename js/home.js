
let signinWindow = document.querySelector('.modal-overlay');

document.querySelector('.js-signin-btn').addEventListener('click' , () => {
    signinWindow.classList.add('active');
});

document.querySelector(".js-close-form").addEventListener('click',() => {
    document.querySelector('.modal-overlay').classList.remove('active');
});



let signinTab = document.querySelector('#js-signin-tab');
let signupTab = document.querySelector('#js-signup-tab');

let signinForm = document.querySelector('.js-signin-form');
let signupForm = document.querySelector('.js-signup-form');



document.querySelectorAll('.js-signup-links').forEach((link) => {

    link.addEventListener('click' , () => {

    signupTab.classList.add('active');
    signinTab.classList.remove('active');

    signinForm.classList.remove('active');
    signupForm.classList.add('active');
    
    });
});

document.querySelectorAll('.js-signin-links').forEach((link) => {

    link.addEventListener('click' , () => {

    signinTab.classList.add('active');
    signupTab.classList.remove('active');

    signupForm.classList.remove('active');
    signinForm.classList.add('active');
    
    });
});

signinWindow = document.querySelector('.modal-overlay');

signinWindow.addEventListener('click',(event) => {
    if (event.target === signinWindow){
        signinWindow.classList.remove('active')
    }
})


