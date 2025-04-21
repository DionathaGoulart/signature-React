import React from 'react';

export const Table = ({ columns = [], data = [] }) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200">
    <table className="w-full text-sm text-left">
      <thead>
        <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
          {columns.map((col) => (
            <th key={col.key} className="px-6 py-4 font-medium">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {data.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50 transition-colors">
            {columns.map((col) => (
              <td key={col.key} className={col.cellClass || 'px-6 py-4'}>
                {typeof col.render === 'function' ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);