import { newPatient, patientData } from './functions.js';
import { UI } from './ui.js';
import {
    petNameInput,
    ownerNameInput,
    ownerPhoneInput,
    dateInput,
    timeInput,
    symptomsInput,
    form,
} from './selectors.js'


export const ui = new UI()


class App {
    constructor() {
        let DB;
        this.initApp();
        this.conectDB();
    }

    initApp() {
        petNameInput.addEventListener("change", patientData);
        ownerNameInput.addEventListener("change", patientData);
        ownerPhoneInput.addEventListener("change", patientData);
        dateInput.addEventListener("change", patientData);
        timeInput.addEventListener("change", patientData);
        symptomsInput.addEventListener("change", patientData);
        form.addEventListener('submit', newPatient)
    }

    conectDB() {
        const abrirConexion = window.indexedDB.open('patients', 1);
        abrirConexion.onerror = () => {
            console.log('Error al conectar a DB')
        };
        abrirConexion.onsuccess = () => {
            console.log('Conexión a DB');
            DB = abrirConexion.result;
        };
    }
}

const app = new App();

