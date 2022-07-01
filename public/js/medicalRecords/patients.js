import { ui } from './app.js';
import {editPatientModalDOM, editPatientModalBtnEditDOM, removePatientModalDOM, editPatientModalForm, petNameInput, ownerNameInput, ownerPhoneInput, dateInput, timeInput, symptomsInput} from './selectors.js';

let idPatient;

export class Patients {
    constructor() {}
    
    verifyLength() {
        const transaction = DB.transaction(['patients']);
        const objectStore = transaction.objectStore('patients');
        const length = objectStore.count();
        length.onsuccess = () => {
            if(length.result === 0) {
                ui.showEmptylistMessage()
            };
        }
    }

    readPatient() {
        ui.clearPatientContainer()
        editPatientModalForm.reset()
        const transaction = DB.transaction(['patients']);
        const objectStore = transaction.objectStore('patients');
        const patient = objectStore.openCursor();
        patient.onsuccess = (e) => {
            const cursor = e.target.result
            if(cursor) {
                ui.showPatient(cursor.value)
                cursor.continue()
            } else {
                console.log('There are no more patients')
            }
        }
    }

    removePatient(id) {
        /* const id = Number(e.target.dataset.patient) */
        const transaction = DB.transaction(['patients'], 'readwrite');
        const objectStore = transaction.objectStore('patients');
        objectStore.delete(id);
        transaction.onerror = () => {
            console.log('error al eliminar paciente')
        };
        transaction.oncomplete = () => {
            console.log('paciente eliminado con éxito');
            removePatientModalDOM.classList.replace('flex', 'hidden');
            this.readPatient();
            this.verifyLength();
        }
    }

    getPatient(id) {
        editPatientModalDOM.classList.replace('hidden', 'flex');
        idPatient = id;
        const transaction = DB.transaction(['patients']);
        const objectStore = transaction.objectStore('patients');
        const patient = objectStore.openCursor();
        patient.onsuccess = (e) => {
            const cursor = e.target.result
            if(cursor) {
                if(cursor.value.id === id) {
                    this.completeForm(cursor.value)
                }
                cursor.continue()
            } else {
                console.log('There are no more patients')
            }
        }
        editPatientModalBtnEditDOM.onclick = (e) => {
            e.preventDefault();
            this.toUpdatePatient();
        }
    }

    completeForm(patient) {
        const {petName, ownerName, ownerPhone, date, time, symptoms} = patient;
        petNameInput.value = petName;
        ownerNameInput.value = ownerName;
        ownerPhoneInput.value = ownerPhone;
        dateInput.value = date;
        timeInput.value = time;
        symptomsInput.value = symptoms;
    }

    toUpdatePatient() {
        if (petNameInput.value === '' || ownerNameInput.value === '' || ownerPhoneInput.value === '' || dateInput.value === '' || timeInput.value === '' || symptomsInput.value === '') {
            ui.showalert('All fields are required', 'error');
            return;
        }

        const updatedPatient = {
            petName: petNameInput.value,
            ownerName: ownerNameInput.value,
            ownerPhone: ownerPhoneInput.value,
            date: dateInput.value,
            time: timeInput.value,
            symptoms: symptomsInput.value,
            id: idPatient
        }

        const transaction = DB.transaction(['patients'], 'readwrite');
        const objectStore = transaction.objectStore('patients');
        objectStore.put(updatedPatient);
        transaction.oncomplete = () => {
            ui.showalert('Patient edited successfully');
            this.readPatient();
            setTimeout(() => {
                editPatientModalDOM.classList.replace('flex', 'hidden');
            }, 2500);
        }
    }
}
