const fs = require("fs").promises;
const shortid = require("shortid");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const saveContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
};

async function listContacts() {
  try {
    return JSON.parse(await fs.readFile(contactsPath));
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const getContact = contacts.find((contact) => contact.id === contactId);
    if (getContact === undefined) {
    //   throw new Error("No such contact");
    }
    return getContact;
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
    if (await getContactById(contactId)===undefined)
    return;
  try {
    const contacts = await listContacts();
    const removeContactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    const removeContact = contacts.splice(removeContactIndex, 1);
    saveContacts(contacts);
    return removeContact;
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: shortid.generate(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);

    saveContacts(contacts);
    return newContact;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
