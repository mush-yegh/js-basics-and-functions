// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
  const commandToArray = command.split(" ");
  const action = commandToArray[0];

  switch (action) {
    case "ADD":
      return addContact(commandToArray[1], commandToArray[2]);
    case "REMOVE_PHONE":
      return removeContact(commandToArray[1]);
    case "SHOW":
      return showContacts();
  }
};

function addContact(name, phoneNum) {
  const nums = phoneNum.split(",").join(", ");
  phoneBook[name] = phoneBook[name]
    ? (phoneBook[name] = phoneBook[name].concat(`, ${nums}`))
    : nums;
}

function removeContact(phoneNum) {
  return Object.keys(phoneBook).some((k) => {
    const keyToArray = phoneBook[k].split(", ");
    if (keyToArray.some((e) => e == phoneNum)) {
      phoneBook[k] = keyToArray.filter((num) => num != phoneNum).join(", ");
      if (!phoneBook[k]) {
        delete phoneBook[k];
      }
      return true;
    }
  });
}

function showContacts() {
  return Object.keys(phoneBook)
    .map((k) => phoneBook[k] && `${k}: ${phoneBook[k]}`)
    .sort();
}
