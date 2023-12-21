const { program } = require("commander");
const contacts = require("./contacts.js");

// console.log(contacts.addContact("asa", "assasaa", "2324324324"));

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allList = await contacts.listContacts();
      return console.table(allList);
      break;

    case "get":
      const contactById = await contacts.getContactById(id);
      return console.log(contactById);
      break;

    case "add":
      const adedConstct = await contacts.addContact(name, email, phone);
      return console.log(adedConstct);
      break;

    case "remove":
      const removedContact = await contacts.removeContact(id);
      return console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <action>", "choose action")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "user email")
  .option("-p, --phone <phone>", "user phone");

program.parse(process.argv);

const options = program.opts();

invokeAction(options);
