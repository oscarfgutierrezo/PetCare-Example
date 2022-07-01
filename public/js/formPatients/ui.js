import { form, formBtnContainer } from "./selectors.js";

export class UI {
    constructor(){

    }

    showalert(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('col-span-12', 'text-center', 'text-lg');
        formBtnContainer.classList.remove('pt-5')
        messageDiv.textContent = message;
        if(type) {
            messageDiv.classList.add('text-red-600')
        } else {
            messageDiv.classList.add('text-emerald-600')
        }
        form.insertBefore(messageDiv, formBtnContainer)
        setTimeout(() => {
            messageDiv.remove()
            formBtnContainer.classList.add('pt-5')
        }, 2500);
    }
}