import { ui } from './app.js';
import { removePatientModalDOM } from './selectors.js';

/* const editMode = {
    status: false,
    idPatientEdit : null,
} */

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

    /* editPatient(id) {
        editMode.status = true;
        editMode.idPatientEdit = id;
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2000);
    } */


    removePatient(e) {
        const id = Number(e.target.dataset.patient)
        const transaction = DB.transaction(['patients'], 'readwrite');
        const objectStore = transaction.objectStore('patients');
        objectStore.delete(id);
        transaction.onerror = () => {
            console.log('error al eliminar paciente')
        };
        transaction.oncomplete = () => {
            console.log('paciente eliminado con éxito');
            removePatientModalDOM.classList.replace('block', 'hidden');
        }
    }
}

/* import { UI } from './ui.js'

const ui = new UI()

export class Patients {
    constructor() {}
    
    verifyLength () {
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

    editPatient(id) {
        mode.status = true;
        mode.idEditPatient = id;
        console.log(mode)
    }

    removePatient(id) {
        const transaction = DB.transaction(['patients'], 'readwrite');
        const objectStore = transaction.objectStore('patients');
        objectStore.delete(id);
        transaction.onerror = () => {
            console.log('error al eliminar paciente')
        };
        transaction.oncomplete = () => {
            console.log('paciente eliminado con éxito');
            this.readPatient();
            this.verifyLength()
        }
    }
} */