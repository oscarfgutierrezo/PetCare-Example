import { form, formBtn } from "./selectors.js";

export class UI {
    constructor(){

    }

    showalert(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('col-span-12', 'text-center', 'text-lg');
        messageDiv.textContent = message;
        if(type) {
            messageDiv.classList.add('text-red-600')
        } else {
            messageDiv.classList.add('text-emerald-600')
        }
        form.insertBefore(messageDiv, formBtn)
        setTimeout(() => {
            messageDiv.remove()
        }, 2500);
    }
}