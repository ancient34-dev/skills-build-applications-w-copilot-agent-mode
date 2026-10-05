import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeCollectionResponse, referenceLabel } from '../api.js';
import ResourceTable from './ResourceTable.jsx';

export default function Users() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function loadUsers() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Users request failed (${response.status}).`);
        setRows(normalizeCollectionResponse(await response.json()));
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load users.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void loadUsers();
    return () => controller.abort();
  }, []);

  const columns = [
    { label: 'Student', className: 'primary-cell', render: (row) => row.displayName ?? row.name ?? row.username ?? '—' },
    { label: 'Username', render: (row) => row.username ?? '—' },
    { label: 'Email', className: 'muted-cell', key: 'email' },
    { label: 'Team', render: (row) => referenceLabel(row.team) },
  ];

  return (
    <ResourceTable
      title="Users"
      kicker="Community directory"
      description="Student profiles and team membership for the OctoFit community."
      columns={columns}
      rows={rows}
      loading={loading}
      error={error}
    />
  );
}