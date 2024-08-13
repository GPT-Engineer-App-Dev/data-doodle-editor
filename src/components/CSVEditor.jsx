import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CSVUploader from './CSVUploader';
import CSVDownloader from './CSVDownloader';

const CSVEditor = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (parsedData) => {
    if (parsedData.length > 0) {
      setHeaders(Object.keys(parsedData[0]));
      setData(parsedData);
    }
  };

  const handleCellEdit = (rowIndex, columnName, value) => {
    const newData = [...data];
    newData[rowIndex][columnName] = value;
    setData(newData);
  };

  const handleAddRow = () => {
    const newRow = headers.reduce((acc, header) => ({ ...acc, [header]: '' }), {});
    setData([...data, newRow]);
  };

  const handleDeleteRow = (rowIndex) => {
    const newData = data.filter((_, index) => index !== rowIndex);
    setData(newData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CSV Editor</h1>
      <div className="mb-4">
        <CSVUploader onUpload={handleFileUpload} />
      </div>
      {data.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {headers.map((header) => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {headers.map((header) => (
                      <TableCell key={`${rowIndex}-${header}`}>
                        <Input
                          value={row[header]}
                          onChange={(e) => handleCellEdit(rowIndex, header, e.target.value)}
                        />
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button variant="destructive" onClick={() => handleDeleteRow(rowIndex)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex justify-between">
            <Button onClick={handleAddRow}>Add Row</Button>
            <CSVDownloader data={data} filename="edited_data.csv" />
          </div>
        </>
      )}
    </div>
  );
};

export default CSVEditor;