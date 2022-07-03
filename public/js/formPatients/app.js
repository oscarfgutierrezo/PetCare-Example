import { Patients } from './patients.js';
import { UI } from './ui.js';
import {
    petNameInputDOM,
    ownerNameInputDOM,
    ownerPhoneInputDOM,
    dateInputDOM,
    timeInputDOM,
    symptomsInputDOM,
    newPatientFormDOM,
} from './selectors.js'


export const ui = new UI();
export const patient = new Patients();


class App {
    constructor() {
        let DB;
        this.initApp();
        this.conectDB();
    }

    initApp() {
        petNameInputDOM.addEventListener("change", patient.catchPatientData);
        ownerNameInputDOM.addEventListener("change", patient.catchPatientData);
        ownerPhoneInputDOM.addEventListener("change", patient.catchPatientData);
        dateInputDOM.addEventListener("change", patient.catchPatientData);
        timeInputDOM.addEventListener("change", patient.catchPatientData);
        symptomsInputDOM.addEventListener("change", patient.catchPatientData);
        newPatientFormDOM.addEventListener('submit', patient.newPatient)
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

