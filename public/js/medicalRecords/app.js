import { Patients } from './patients.js';
import { UI } from './ui.js';
import {editPatientModalBtnSaveDOM, editPatientModalBtnCancelDOM, removeModalBtnConfirmDOM, removeModalBtnCancelDOM, inputSearchPatientsDOM} from './selectors.js';

export const patient = new Patients();
export const ui = new UI();
export let patientSearch

class App {
    constructor() {
        let DB;
        this.conectDB();
        this.initApp();
    }

    conectDB() {
        const abrirConexion = window.indexedDB.open('patients', 1);
        abrirConexion.onerror = () => {
            console.log('Error al conectar a DB')
        };
        abrirConexion.onsuccess = () => {
            console.log('Conexión a DB');
            DB = abrirConexion.result;
            patient.verifyLength()
            patient.readPatient()
        };
    }

    initApp() {
        editPatientModalBtnSaveDOM.addEventListener('click', patient.toUpdatePatient)
        editPatientModalBtnCancelDOM.addEventListener('click', ui.hiddenModalEdit);
        removeModalBtnConfirmDOM.addEventListener("click", patient.removePatient);
        removeModalBtnCancelDOM.addEventListener("click", ui.hiddenModalRemove);
        inputSearchPatientsDOM.addEventListener("input", (e) => {
            patientSearch = (e.target.value).toLowerCase();
            patient.readPatient()
        })
    }
}

const app = new App();

/* import { Patients } from './patients.js';
import { UI } from './ui.js';
import {removeModalBtnCancelDOM, editPatientModalBtnCancelDOM, inputSearchPatients} from './selectors.js';

export const patients = new Patients();
export const ui = new UI();
export let patientSearch

class App {
    constructor() {
        let DB;
        this.conectDB();
        this.initApp();
    }

    conectDB() {
        const abrirConexion = window.indexedDB.open('patients', 1);
        abrirConexion.onerror = () => {
            console.log('Error al conectar a DB')
        };
        abrirConexion.onsuccess = () => {
            console.log('Conexión a DB');
            DB = abrirConexion.result;
            patients.verifyLength()
            patients.readPatient()
        };
    }

    initApp() {
        removeModalBtnCancelDOM.addEventListener("click", ui.hiddenModalRemove);
        editPatientModalBtnCancelDOM.addEventListener('click', ui.hiddenModalEdit);
        inputSearchPatients.addEventListener("input", (e) => {
            patientSearch = (e.target.value).toLowerCase();
            patients.readPatient()
        })
    }
}

const app = new App(); */