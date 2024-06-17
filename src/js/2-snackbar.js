import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const input = document.querySelector('[name="delay"]');
const radioElem = document.querySelectorAll('[type="radio"]');

function createPromise(delay, status) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (status) resolve(`✅ Fulfilled promise in ${delay}ms`)
            else reject(`❌ Rejected promise in ${delay}ms`)
        }, delay)
    });
    promise
        .then(() => {
            console.log(`✅ Fulfilled promise in ${delay}ms`);
            iziToast.show({
                title: '',
                message: `Fulfilled promise in ${delay}ms`,
                position: 'topCenter',
                backgroundColor: 'green',
                theme: 'dark',
                messageColor: 'white',
            }); })
        .catch(() => {
            console.log(`❌ Rejected promise in ${delay}ms`); iziToast.show({
                title: '',
                message: `Rejected promise in ${delay}ms`,
                position: 'topCenter',
                backgroundColor: 'red',
                theme: 'dark',
                messageColor: 'white',
            }); })
    
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = e.target.state.value;
    createPromise(input.value, status === 'fulfilled')})