import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeCollectionResponse } from '../api.js';
import ResourceTable from './ResourceTable.jsx';

export default function Teams() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function loadTeams() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/teams/`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Teams request failed (${response.status}).`);
        setRows(normalizeCollectionResponse(await response.json()));
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load teams.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void loadTeams();
    return () => controller.abort();
  }, []);

  const columns = [
    { label: 'Team', className: 'primary-cell', key: 'name' },
    { label: 'About', className: 'muted-cell', render: (row) => row.description || '—' },
    {
      label: 'Members',
      render: (row) => Array.isArray(row.members) ? row.members.length : row.members ?? 0,
    },
    { label: 'Points', render: (row) => row.totalPoints ?? 0 },
  ];

  return (
    <ResourceTable
      title="Teams"
      kicker="Find your people"
      description="Team rosters and points from shared activity across the school."
      columns={columns}
      rows={rows}
      loading={loading}
      error={error}
    />
  );
}