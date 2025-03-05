import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@heroui/react";

export default function CustomTable({ columns, data, renderCell }: any) {
  return (
    <Table aria-label="Custom table">
      <TableHeader>
        {columns.map((col: any) => (
          <TableColumn key={col.uid}>{col.name}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {data.map((row: any) => (
          <TableRow key={row.key}>
            {columns.map((col: any) => (
              <TableCell key={col.uid}>
                {renderCell ? renderCell(row, col.uid) : row[col.uid]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
