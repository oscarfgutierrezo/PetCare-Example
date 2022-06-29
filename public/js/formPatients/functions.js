import { form } from "./selectors.js";
import { ui } from "./app.js";

/* export const mode = {
    status: newPatient,
    idEditPatient: null,
} */



const patientObj = {
    petName: '',
    ownerName: '',
    ownerPhone: '',
    date: '',
    time: '',
    symptoms: '',
}

export function patientData(e) {
    patientObj[e.target.name] = e.target.value;
}

export function newPatient(e) {
    e.preventDefault();
    const {petName, ownerName, ownerPhone, date, time, symptoms} = patientObj;
    if(petName === '' || ownerName === '' || ownerPhone === '' || date === '' || time === '' || symptoms === '') {
        ui.showalert('All fields are required', 'error');
        return;
    }
    patientObj.id = Date.now();
    addNewPatient(patientObj);
    form.reset();
    setTimeout(() => {
        window.location.href = '../medicalRecords.html';
    }, 2000);
}

function addNewPatient(patient) {
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