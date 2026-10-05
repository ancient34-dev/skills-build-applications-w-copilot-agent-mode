export default function ResourceTable({ title, kicker, description, columns, rows, loading, error }) {
  return (
    <section className="resource-view" aria-labelledby="view-title">
      <div className="view-heading">
        <div>
          <p className="view-kicker">{kicker}</p>
          <h1 className="view-title" id="view-title">{title}</h1>
          <p className="view-description">{description}</p>
        </div>
        <div className="record-count" aria-label={`${rows.length} records`}>
          <strong>{loading ? '—' : rows.length}</strong>
          <span>records</span>
        </div>
      </div>

      {loading ? (
        <div className="notice-state" role="status">Loading {title.toLowerCase()}…</div>
      ) : error ? (
        <div className="notice-state is-error" role="alert">{error}</div>
      ) : rows.length === 0 ? (
        <div className="notice-state is-empty" role="status">No {title.toLowerCase()} to show yet.</div>
      ) : (
        <div className="table-frame table-scroll">
          <table className="table resource-table">
            <caption className="visually-hidden">{title}</caption>
            <thead>
              <tr>
                {columns.map((column) => <th key={column.label} scope="col">{column.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row._id ?? row.id ?? `${title}-${index}`}>
                  {columns.map((column) => (
                    <td className={column.className ?? ''} key={column.label}>
                      {column.render ? column.render(row) : row[column.key] ?? '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}