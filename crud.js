const fs = require('fs');

const jsonFilePath = 'data.json';

function readData(callback) {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    const jsonData = JSON.parse(data);
    callback(null, jsonData);
  });
}

function writeData(data, callback) {
  fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), 'utf8', err => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

function createRecord(newData, callback) {
  readData((err, jsonData) => {
    if (err) {
      callback(err);
      return;
    }
    jsonData.push(newData);
    writeData(jsonData, callback);
  });
}

function updateRecord(updatedData, callback) {
  readData((err, jsonData) => {
    if (err) {
      callback(err);
      return;
    }
    const indexToUpdate = jsonData.findIndex(item => item.id == updatedData.id);

    if (indexToUpdate !== -1) {
      jsonData[indexToUpdate] = updatedData;
      writeData(jsonData, callback);
    } else {
      callback(new Error('Record not found.'));
    }
  });
}

function deleteRecord(idToDelete, callback) {
  readData((err, jsonData) => {
    if (err) {
      callback(err);
      return;
    }

    // Log the current state of jsonData before deleting
    console.log('Before Delete:', jsonData);

    const updatedData = jsonData.filter(item => item.id != idToDelete);

    // Log the updated data
    console.log('After Delete:', updatedData);

    writeData(updatedData, callback);
  });
}


module.exports = { readData, createRecord, updateRecord, deleteRecord };
