import { useEffect, useState } from 'react';
import { API_BASE_URL, formatDate, normalizeCollectionResponse, referenceLabel } from '../api.js';
import ResourceTable from './ResourceTable.jsx';

export default function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/leaderboard/`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Leaderboard request failed (${response.status}).`);
        setRows(normalizeCollectionResponse(await response.json()));
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load the leaderboard.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void loadLeaderboard();
    return () => controller.abort();
  }, []);

  const columns = [
    { label: 'Rank', className: 'primary-cell', render: (row) => row.rank ?? '—' },
    { label: 'Competitor', className: 'primary-cell', render: (row) => referenceLabel(row.team ?? row.user) },
    { label: 'Period', render: (row) => row.period ?? '—' },
    { label: 'Points', render: (row) => row.points ?? 0 },
    { label: 'From', render: (row) => formatDate(row.periodStart) },
    { label: 'Through', render: (row) => formatDate(row.periodEnd) },
  ];

  return (
    <ResourceTable
      title="Leaderboard"
      kicker="Friendly competition"
      description="Compare individual and team points across the current challenge periods."
      columns={columns}
      rows={rows}
      loading={loading}
      error={error}
    />
  );
}