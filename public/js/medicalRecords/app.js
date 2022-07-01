import { Patients } from './patients.js';
import { UI } from './ui.js';
import { removeModalBtnConfirmDOM, removeModalBtnCancelDOM, editPatientModalBtnCancelDOM} from './selectors.js';

export const patients = new Patients();
export const ui = new UI();

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
        editPatientModalBtnCancelDOM.addEventListener('click', ui.hiddenModalEdit)
    }
}

const app = new App();