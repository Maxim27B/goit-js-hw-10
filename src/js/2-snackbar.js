const formData = {
    email: "",
    message: "",
};

const form = document.querySelector('form');
form.addEventListener('input', () => {
    formData.email = form.elements.email.value.trim();
    formData.message = form.elements.message.value.trim();
    saveToLS('feedback-form-state', formData)
});

window.addEventListener('DOMContentLoaded', () => {
    const info = loadFromLS('feedback-form-state');
    if (info !== null) {
        form.elements.email.value = info.email;
    form.elements.message.value = info.message;
    formData.email = info.email;
    formData.message = info.message;
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (formData.email === '' ||
        formData.message === '') {
        alert('Fill please all fields');
    } else {
        console.log(formData)
        localStorage.removeItem('feedback-form-state');
        form.reset();
    }
})

function saveToLS(key, value) {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
}

function loadFromLS(key) {
    const json = localStorage.getItem(key);
    try {
        const data = JSON.parse(json);
        return data;
    } catch {
        return json;
    }
}
