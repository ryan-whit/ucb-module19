import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (name, home, cell, email) => {
  console.log('Post to the database');
  const contactDb = await openDB('contact', 1);
  const tx = contactDb.transaction('contact', 'readwrite');
  const store = tx.objectStore('contact');
  const request = store.add({ name: name, home_phone: home, cell_phone: cell, email: email });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

export const getDb = async () => {
  console.log('GET from the database');
  const contactDb = await openDB('contact', 1);
  const tx = contactDb.transaction('contact', 'readonly');
  const store = tx.objectStore('contact');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
