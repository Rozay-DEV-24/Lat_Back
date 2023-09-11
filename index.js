const express = require('express');
const bodyParser = require('body-parser');
const jsonCrud = require('./crud');
var cors = require('cors')

 
const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Read data
app.get('/data', (req, res) => {
  jsonCrud.readData((err, data) => {
    if (err) {
      res.status(500).json({ error: 'Error reading data.' });
    } else {
      res.json(data);
    }
  });
});

// Create record
app.post('/data', (req, res) => {
  const newData = req.body;
  jsonCrud.createRecord(newData, err => {
    if (err) {
      res.status(500).json({ error: 'Error creating record.' });
    } else {
      res.json({ message: 'Record created successfully.' });
    }
  });
});

// Update record
app.put('/data/:id', (req, res) => {
  const updatedData = req.body;
  updatedData.id = parseInt(req.params.id);

  jsonCrud.updateRecord(updatedData, err => {
    if (err) {
      res.status(500).json({ error: 'Error updating record.' });
    } else {
      res.json({ message: 'Record updated successfully.' });
    }
  });
});

// Delete record
app.delete('/data/:id', (req, res) => {
  const idToDelete = parseInt(req.params.id);
  console.log(idToDelete)
  jsonCrud.deleteRecord(idToDelete, err => {
    if (err) {
      res.status(500).json({ error: 'Error deleting record.' });
    } else {
      res.json({ message: 'Record deleted successfully.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
