import { patient } from './app.js';

import { emptyPatientListMessageDOM, patientsListContainerDOM, removePatientModalDOM, removeModalBtnConfirmDOM, editPatientModalDOM, editPatientModalFormDOM, editPatientModalBtnsContainerDOM} from './selectors.js';

export class UI {
    constructor() {
        
    }

    showEmptylistMessage() {
        emptyPatientListMessageDOM.classList.replace('hidden', 'block')
    }

    showPatient(patientInfo) {        
        const {petName, ownerName, ownerPhone, date, time, symptoms, id} = patientInfo;
        
        // Contenedor del paciente
        const patientContainerDOM = document.createElement('div');
        patientContainerDOM.classList.add('patient__container')

            // Nombre del paciente
            const patientNameDOM = document.createElement('h2');
            patientNameDOM.classList.add('patient__name');
            patientNameDOM.textContent = petName;
            
            // Contenedor para información del paciente
            const patientInfoDOM = document.createElement('div');
            patientInfoDOM.classList.add('patient__info-container')

                // Nombre del propietario del paciente
                const ownerNameTitleDOM = document.createElement('p');
                ownerNameTitleDOM.classList.add('font-semibold')
                ownerNameTitleDOM.textContent = 'Owner: '

                const ownerNameDOM = document.createElement('span');
                ownerNameDOM.classList.add('font-normal')
                ownerNameDOM.textContent = ownerName;
                ownerNameTitleDOM.appendChild(ownerNameDOM)

                // Teléfono del propietario del paciente
                const ownerPhoneTitleDOM = document.createElement('p');
                ownerPhoneTitleDOM.classList.add('font-semibold');
                ownerPhoneTitleDOM.textContent = 'Phone: '

                const ownerPhoneDOM = document.createElement('span');
                ownerPhoneDOM.classList.add('font-normal')
                ownerPhoneDOM.textContent = ownerPhone;
                ownerPhoneTitleDOM.appendChild(ownerPhoneDOM)

                // Fecha de registro del paciente
                const dateTitleDOM = document.createElement('p');
                dateTitleDOM.classList.add('font-semibold');
                dateTitleDOM.textContent = 'Date: '

                const dateDOM = document.createElement('span');
                dateDOM.classList.add('font-normal')
                dateDOM.textContent = date;
                dateTitleDOM.appendChild(dateDOM)

                // Hora de registro del paciente
                const timeTitleDOM = document.createElement('p');
                timeTitleDOM.classList.add('font-semibold');
                timeTitleDOM.textContent = 'Time: '

                const timeDOM = document.createElement('span');
                timeDOM.classList.add('font-normal')
                timeDOM.textContent = time;
                timeTitleDOM.appendChild(timeDOM)

                // Síntomas del paciente
                const sympthomsTitleDOM = document.createElement('p');
                sympthomsTitleDOM.classList.add('font-semibold');
                sympthomsTitleDOM.textContent = 'Sympthoms: '

                const sympthomsDOM = document.createElement('span');
                sympthomsDOM.classList.add('font-normal')
                sympthomsDOM.textContent = symptoms;
                sympthomsTitleDOM.appendChild(sympthomsDOM)
            
            // Agregar datos del paciente al contenedor de información del paciente
            patientInfoDOM.appendChild(ownerNameTitleDOM);
            patientInfoDOM.appendChild(ownerPhoneTitleDOM);
            patientInfoDOM.appendChild(dateTitleDOM);
            patientInfoDOM.appendChild(timeTitleDOM);
            patientInfoDOM.appendChild(sympthomsTitleDOM);

            // Contenedor para los botones
            const patientButtonsDOM = document.createElement('div');
            patientButtonsDOM.classList.add('patient__buttons-container')

                // Botón de editar
                const patientEditButtonDOM = document.createElement('button');
                patientEditButtonDOM.classList.add('btn', 'btn--blue');
                patientEditButtonDOM.textContent = 'Edit'
                patientEditButtonDOM.dataset.patient = id;
                patientEditButtonDOM.onclick = () => patient.getPatient(id);

                const patientEditButtonIconDOM = document.createElement('i');
                patientEditButtonIconDOM.classList.add('fa-solid', 'fa-pen', 'text-xs');
                patientEditButtonDOM.appendChild(patientEditButtonIconDOM);

                // Botón de eliminar
                const patientRemoveButtonDOM = document.createElement('button');
                patientRemoveButtonDOM.classList.add('btn', 'btn--red');
                patientRemoveButtonDOM.textContent = 'Remove'
                patientRemoveButtonDOM.onclick = () => this.showModalRemove(id);

                const patientRemoveButtonIconDOM = document.createElement('i');
                patientRemoveButtonIconDOM.classList.add('fa-solid', 'fa-xmark', 'text-xs');
                patientRemoveButtonDOM.appendChild(patientRemoveButtonIconDOM);

            // Agregar botones al contenedor de botones
            patientButtonsDOM.appendChild(patientEditButtonDOM);
            patientButtonsDOM.appendChild(patientRemoveButtonDOM);

        // Agregar HTML al contenedor de paciente
        patientContainerDOM.appendChild(patientNameDOM);
        patientContainerDOM.appendChild(patientInfoDOM);
        patientContainerDOM.appendChild(patientButtonsDOM);

        // Agregar contenedor del paciente al DOM
        patientsListContainerDOM.appendChild(patientContainerDOM);
    }

    clearPatientContainer() {
        while(patientsListContainerDOM.firstChild) {
            patientsListContainerDOM.removeChild(patientsListContainerDOM.firstChild);
        }
    }

    showModalRemove(id) {
        removePatientModalDOM.classList.replace('hidden', 'flex');
        removeModalBtnConfirmDOM.dataset.patientId = id;
    }

    hiddenModalRemove() {
        removePatientModalDOM.classList.replace('flex', 'hidden');
    }

    hiddenModalEdit() {
        editPatientModalDOM.classList.replace('flex', 'hidden');
    }

    showalert(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('col-span-12', 'text-center', 'text-lg');
        editPatientModalBtnsContainerDOM.classList.remove('pt-5')
        messageDiv.textContent = message;
        if(type) {
            messageDiv.classList.add('text-red-600')
        } else {
            messageDiv.classList.add('text-emerald-600')
        }
        editPatientModalFormDOM.insertBefore(messageDiv, editPatientModalBtnsContainerDOM)
        setTimeout(() => {
            messageDiv.remove()
            editPatientModalBtnsContainerDOM.classList.add('pt-5')
        }, 2500);
    }
}