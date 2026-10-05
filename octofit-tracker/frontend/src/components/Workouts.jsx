import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeCollectionResponse } from '../api.js';
import ResourceTable from './ResourceTable.jsx';

export default function Workouts() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function loadWorkouts() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/workouts/`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Workouts request failed (${response.status}).`);
        setRows(normalizeCollectionResponse(await response.json()));
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load workouts.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void loadWorkouts();
    return () => controller.abort();
  }, []);

  const columns = [
    { label: 'Workout', className: 'primary-cell', key: 'name' },
    { label: 'Description', className: 'muted-cell', key: 'description' },
    { label: 'Activity', render: (row) => row.activityType ?? '—' },
    { label: 'Level', render: (row) => row.difficulty ?? row.targetLevel ?? '—' },
    { label: 'Duration', render: (row) => row.durationMinutes ? `${row.durationMinutes} min` : '—' },
  ];

  return (
    <ResourceTable
      title="Workouts"
      kicker="Ideas for your next session"
      description="Suggested sessions to help students build fitness at a comfortable pace."
      columns={columns}
      rows={rows}
      loading={loading}
      error={error}
    />
  );
}