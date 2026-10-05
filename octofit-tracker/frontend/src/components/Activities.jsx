import { useEffect, useState } from 'react';
import { API_BASE_URL, formatDate, normalizeCollectionResponse, referenceLabel } from '../api.js';
import ResourceTable from './ResourceTable.jsx';

export default function Activities() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function loadActivities() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/activities/`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Activities request failed (${response.status}).`);
        setRows(normalizeCollectionResponse(await response.json()));
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load activities.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void loadActivities();
    return () => controller.abort();
  }, []);

  const columns = [
    { label: 'Activity', className: 'primary-cell', render: (row) => row.type ?? row.activityType ?? '—' },
    { label: 'Student', render: (row) => referenceLabel(row.user ?? row.username) },
    { label: 'Duration', render: (row) => row.durationMinutes ? `${row.durationMinutes} min` : '—' },
    { label: 'Distance', render: (row) => row.distanceKm == null ? '—' : `${row.distanceKm} km` },
    { label: 'Points', render: (row) => row.points ?? 0 },
    { label: 'Date', render: (row) => formatDate(row.occurredAt ?? row.createdAt) },
  ];

  return (
    <ResourceTable
      title="Activities"
      kicker="Movement log"
      description="Recent training sessions and movement logged by the OctoFit community."
      columns={columns}
      rows={rows}
      loading={loading}
      error={error}
    />
  );
}