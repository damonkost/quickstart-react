import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';

function AttorneyTable() {
  const [attorneyData, setAttorneyData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/attorneys'); // Replace with your backend URL
        const data = await response.json();
        setAttorneyData(data);
      } catch (fetchError) {
        console.error('Error fetching attorney data:', fetchError);
        setError('Failed to fetch attorney data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Optional: Implement periodic updates
    // const intervalId = setInterval(fetchData, 60000); // Fetch every minute
    // return () => clearInterval(intervalId); // Clean up on unmount
  },);

  if (isLoading) {
    return <div>Loading attorney data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns = [
    { Header: 'Subdomain', accessor: 'subdomain' },
    { Header: 'Firm Name', accessor: 'firmName' },
    { Header: 'Logo URL', accessor: 'logo' },
    // ... (other columns)
  ];

  const tableInstance = useTable({ columns, data: attorneyData });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default AttorneyTable;