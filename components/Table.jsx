export default function Table({ columns, data, actions, onAction }) {
  return (
    <div className="overflow-x-auto rounded border">
      <table className="min-w-full bg-white text-sm text-left">
        <thead className="bg-teal-600 text-white">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-2">
                {col}
              </th>
            ))}
            {actions && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center py-6 text-gray-500"
              >
                No submissions found.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.$id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.location}</td>
                <td className="px-4 py-2">{item.feeRange}</td>
                {actions && (
                  <td className="px-4 py-2">
                    <button
                      className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                      onClick={() => onAction(item)}
                    >
                      {actions.label}
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
