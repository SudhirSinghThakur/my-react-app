import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface DataTableProps {
    columns: string[];
    data: any[];
    onEdit: (item: any) => void;
    onDelete: (id: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, onEdit, onDelete }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {columns.map((column, index) => (
                        <TableCell key={index}>
                            <strong>{column}</strong>
                        </TableCell>
                    ))}
                    <TableCell>
                        <strong>Actions</strong>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.id}>
                        {columns.map((column, index) => (
                            <TableCell key={index}>{item[column]}</TableCell>
                        ))}
                        <TableCell>
                            <IconButton color="primary" onClick={() => onEdit(item)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error" onClick={() => onDelete(item.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default DataTable;