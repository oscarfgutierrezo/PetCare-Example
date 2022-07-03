import { patient } from './app.js';
import { ui, patientSearch } from './app.js';
import {editPatientModalDOM, editPatientModalBtnSaveDOM, removePatientModalDOM, editPatientModalFormDOM, petNameInputDOM, ownerNameInputDOM, ownerPhoneInputDOM, dateInputDOM, timeInputDOM, symptomsInputDOM, inputSearchPatientsDOM} from './selectors.js';

let idEditPatient;

export class Patients {
    constructor() {
        
    }
    

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
        editPatientModalFormDOM.reset()
        const transaction = DB.transaction(['patients']);
        const objectStore = transaction.objectStore('patients');
        const patient = objectStore.openCursor();
        patient.onsuccess = (e) => {
            const cursor = e.target.result
            if(cursor) {
                this.showPatients(cursor)
                cursor.continue()
            } else {
                console.log('No hay más pacientes')
            }
        }
    }

    showPatients(cursor) {
        const patientName = (cursor.value.petName).toLowerCase()
        if(patientSearch === undefined || patientSearch ==='') {
            ui.showPatient(cursor.value);
        } else if(patientName.startsWith(patientSearch)) {
            ui.showPatient(cursor.value)
        }
    }

    removePatient(e) {
        const id = Number(e.target.dataset.patientId);
        
        const transaction = DB.transaction(['patients'], 'readwrite');
        const objectStore = transaction.objectStore('patients');
        objectStore.delete(id);
        transaction.onerror = () => {
            console.log('error al eliminar paciente')
        };
        transaction.oncomplete = () => {
            console.log('paciente eliminado con éxito');
            removePatientModalDOM.classList.replace('flex', 'hidden');
            patient.readPatient();
            patient.verifyLength();
        }
    }

    getPatient(id) {
        editPatientModalDOM.classList.replace('hidden', 'flex');
        idEditPatient = id;
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
                console.log('No hay más pacientes')
            }
        }
    }

    completeForm(patient) {
        const {petName, ownerName, ownerPhone, date, time, symptoms} = patient;
        petNameInputDOM.value = petName;
        ownerNameInputDOM.value = ownerName;
        ownerPhoneInputDOM.value = ownerPhone;
        dateInputDOM.value = date;
        timeInputDOM.value = time;
        symptomsInputDOM.value = symptoms;
    }

    toUpdatePatient(e) {
        e.preventDefault();
        if (petNameInputDOM.value === '' || ownerNameInputDOM.value === '' || ownerPhoneInputDOM.value === '' || dateInputDOM.value === '' || timeInputDOM.value === '' || symptomsInputDOM.value === '') {
            ui.showalert('All fields are required', 'error');
            return;
        }

        const updatedPatient = {
            petName: petNameInputDOM.value,
            ownerName: ownerNameInputDOM.value,
            ownerPhone: ownerPhoneInputDOM.value,
            date: dateInputDOM.value,
            time: timeInputDOM.value,
            symptoms: symptomsInputDOM.value,
            id: idEditPatient
        }

        const transaction = DB.transaction(['patients'], 'readwrite');
        const objectStore = transaction.objectStore('patients');
        objectStore.put(updatedPatient);
        transaction.oncomplete = () => {
            ui.showalert('Patient edited successfully');
            patient.readPatient();
            setTimeout(() => {
                editPatientModalDOM.classList.replace('flex', 'hidden');
            }, 2500);
        }
    }
}
