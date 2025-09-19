import BedList from './BedList';
import BedForm from './BedForm';
import { useState } from 'react';

export default function App() {
  const [refresh, setRefresh] = useState(false);
  function triggerRefresh() { setRefresh(f => !f); }

  return (
    <div style={{padding: 20}}>
      <h1>Hospital Ward Bed Tracker</h1>
      <BedForm onAdd={triggerRefresh} />
      <BedList key={refresh} />
    </div>
  );
}
