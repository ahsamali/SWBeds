import { useEffect, useState } from 'react';
import { getBeds, updateBed } from './api';

const STATUS_OPTIONS = ['Available', 'Occupied', 'Cleaning', 'Maintenance'];

export default function BedList() {
  const [beds, setBeds] = useState([]);
  const [reloadFlag, setReloadFlag] = useState(false);

  useEffect(() => {
    getBeds().then(setBeds);
  }, [reloadFlag]);

  async function handleAssign(bed) {
    const patient = prompt('Enter patient name:');
    if (patient) {
      await updateBed(bed.id, { status: 'Occupied', patient });
      setReloadFlag(f => !f);
    }
  }

  async function handleRelease(bed) {
    await updateBed(bed.id, { status: 'Available', patient: null });
    setReloadFlag(f => !f);
  }

  async function handleStatus(bed) {
    const status = prompt(`Set status (${STATUS_OPTIONS.join(', ')}):`, bed.status);
    if (STATUS_OPTIONS.includes(status)) {
      await updateBed(bed.id, { status });
      setReloadFlag(f => !f);
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Bed</th><th>Status</th><th>Patient</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {beds.map(bed => (
          <tr key={bed.id}>
            <td>{bed.name}</td>
            <td>{bed.status}</td>
            <td>{bed.patient || '-'}</td>
            <td>
              {bed.status === 'Available' && (
                <button onClick={() => handleAssign(bed)}>Assign</button>
              )}
              {bed.status === 'Occupied' && (
                <button onClick={() => handleRelease(bed)}>Release</button>
              )}
              <button onClick={() => handleStatus(bed)}>Change Status</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
