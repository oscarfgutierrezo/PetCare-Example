import { Patients } from './patients.js';
import { UI } from './ui.js';
import { removeBtnConfirmDOM } from './selectors.js';

export const patients = new Patients();
export const ui = new UI

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
        removeBtnConfirmDOM.addEventListener("click", patients.removePatient);
    }
}

const app = new App();

/* 
import { Patients } from './patients.js';
import { UI } from './ui.js';

export const patients = new Patients();
export const ui = new UI

class App {
    constructor() {
        let DB;
        this.conectDB()
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
}

const app = new App(); */





