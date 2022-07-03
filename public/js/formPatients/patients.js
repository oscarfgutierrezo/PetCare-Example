import { newPatientFormDOM } from "./selectors.js";
import { ui, patient } from "./app.js";

export class Patients {
    constructor() {
        this.petName = '';
        this.ownerName = '';
        this.ownerPhone = '';
        this.date = '';
        this.time = '';
        this.symptoms = '';
    }

    catchPatientData(e) {
        patient[e.target.name] = e.target.value;
        console.log(patient);
    }

    newPatient(e) {
        e.preventDefault();
        const {petName, ownerName, ownerPhone, date, time, symptoms} = patient;
        if(petName === '' || ownerName === '' || ownerPhone === '' || date === '' || time === '' || symptoms === '') {
            ui.showalert('All fields are required', 'error');
            return;
        }
        patient.id = Date.now();
        patient.addNewPatient(patient);
        newPatientFormDOM.reset();
        setTimeout(() => {
            window.location.href = './medicalRecords.html'
        }, 2000);
    }

    addNewPatient(patient) {
        const transaction = DB.transaction(['patients'], 'readwrite');
        const objectStore = transaction.objectStore('patients');
        objectStore.add(patient);
        transaction.onerror = () => {
            console.log('error al agregar paciente')
        };
        transaction.oncomplete = () => {
            ui.showalert('Patient added successfully');
        }
    }
}