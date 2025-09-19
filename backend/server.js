const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 4000;
const DATA_FILE = './beds.json';

app.use(cors());
app.use(express.json());

// Helper to read/write data
function readBeds() {
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}
function writeBeds(beds) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(beds, null, 2));
}

// Get all beds
app.get('/api/beds', (req, res) => {
  res.json(readBeds());
});

// Add a new bed
app.post('/api/beds', (req, res) => {
  const beds = readBeds();
  const newBed = {
    id: Date.now().toString(),
    name: req.body.name,
    status: 'Available',
    patient: null
  };
  beds.push(newBed);
  writeBeds(beds);
  res.json(newBed);
});

// Update bed (assign/release/change status)
app.put('/api/beds/:id', (req, res) => {
  const beds = readBeds();
  const bed = beds.find(b => b.id === req.params.id);
  if (!bed) return res.status(404).send('Bed not found');
  Object.assign(bed, req.body);
  writeBeds(beds);
  res.json(bed);
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
