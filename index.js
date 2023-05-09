const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listOfContacts = await listContacts();
      console.table(listOfContacts);
      break;

    case "get":
      const getContact = await getContactById(id);
      console.log("Get contact by ID", getContact);
      break;

    case "add":
      const newContact = await addContact({ name, email, phone });
      console.log("Add new contact", newContact);
      break;

    case "remove":
      const removeContactbyID = await removeContact(id);
      console.log("Remove contact", removeContactbyID);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// invokeAction({action:'list'})
// invokeAction({action:'get', id:'AeHIrLTr6JkxGE6SN-0Rw'})
// invokeAction({action:'add', name:'Kim Lewis', email:'mat.Cras@nonenimMauris.net', phone:'(501) 480-5218'})
// invokeAction({action:'remove', id:'K1AB4cOn2Y7nrTmrCF08a'})
