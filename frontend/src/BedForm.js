import { useState } from 'react';
import { addBed } from './api';

export default function BedForm({ onAdd }) {
  const [name, setName] = useState('');
  async function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;
    await addBed(name);
    setName('');
    onAdd();
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        placeholder="Bed name/number"
        onChange={e => setName(e.target.value)}
      />
      <button type="submit">Add Bed</button>
    </form>
  );
}
