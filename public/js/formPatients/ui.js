import { newPatientFormDOM, formBtnsContainerDOM } from "./selectors.js";

export class UI {
    constructor(){

    }

    showalert(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('col-span-12', 'text-center', 'text-lg');
        formBtnsContainerDOM.classList.remove('pt-5')
        messageDiv.textContent = message;
        if(type) {
            messageDiv.classList.add('text-red-600')
        } else {
            messageDiv.classList.add('text-emerald-600')
        }
        newPatientFormDOM.insertBefore(messageDiv, formBtnsContainerDOM)
        setTimeout(() => {
            messageDiv.remove()
            formBtnsContainerDOM.classList.add('pt-5')
        }, 2500);
    }
}