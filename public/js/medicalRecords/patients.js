/* import { ui } from './app.js'; */
import { ui } from './app.js';
import {editPatientModalDOM, removePatientModalDOM, petNameInput} from './selectors.js';

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
        
        const transaction = DB.transaction(['patients']);
        const objectStore = transaction.objectStore('patients');
        const request = objectStore.openCursor();
        request.onsuccess = (e) => {
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
            this.verifyLength()
        }
    }

    editPatient() {
        editPatientModalDOM.classList.replace('hidden', 'flex');
        const transaction = DB.transaction(['patients']);
        const objectStore = transaction.objectStore('patients');
        const request = objectStore.openCursor();
        request.onsuccess = (e) => {
            const cursor = e.target.result
            if(cursor) {
                console.log(cursor.value)
                cursor.continue()
            } else {
                console.log('There are no more patients')
            }
        }
    }
}