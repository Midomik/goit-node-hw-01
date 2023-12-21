const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "/db", "/contacts.json");
console.log(contactsPath);

async function updateContactsList(list) {
  try {
    const data = await fs.writeFile(
      contactsPath,
      JSON.stringify(list, undefined, 2)
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}

// TODO: задокументувати кожну функцію
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const contacts = await listContacts();

    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const contacts = await listContacts();
    const deletedIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    const newContactsList = contacts.filter(
      (contact) => contact.id !== contactId
    );

    await updateContactsList(newContactsList);

    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  try {
    const contacts = await listContacts();
    const contact = {
      name,
      email,
      phone,
      id: crypto.randomUUID(),
    };
    const newContactsList = contacts;
    newContactsList.push(contact);
    await updateContactsList(newContactsList);

    return contact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
