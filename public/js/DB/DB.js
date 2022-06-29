document.addEventListener('DOMContentLoaded', createDB)

let DB;

function createDB() {
    const createDB  = window.indexedDB.open('patients', 1);

    createDB.onerror = function() {
        console.log('Error al crear la DB');
    }

    createDB.onsuccess = function() {
        console.log('DB creada');
        DB = createDB.result;
    }
    
    createDB.onupgradeneeded = function(e) { 
        const db = e.target.result;
        
        const objectStore = db.createObjectStore('patients', {
            keyPath: 'id', // El id es individual de cada una de las citas creadas
            autoIncrement: true,
        })

        // Definir las columnas del Object Store
        objectStore.createIndex('petName', 'petName', {unique: false});
        objectStore.createIndex('ownerName', 'ownerName', {unique: false});
        objectStore.createIndex('ownerPhone', 'ownerPhone', {unique: false});
        objectStore.createIndex('date', 'date', {unique: false});
        objectStore.createIndex('time', 'time', {unique: false});
        objectStore.createIndex('symptoms', 'symptoms', {unique: false});
        objectStore.createIndex('id', 'id', {unique: true});
    }
}