import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Delete, Edit, BarChart, Add } from '@mui/icons-material';
import { Device } from '../../types/device';
import { useNavigate } from 'react-router-dom';

interface DeviceDataGridProps {
    devices: Device[];
    isLoading: boolean;
    onDelete: (id: string) => void;
    onAddValue: (id: string) => void;
}

export const DeviceDataGrid = ({
    devices,
    isLoading,
    onDelete,
    onAddValue
}: DeviceDataGridProps) => {
    const navigate = useNavigate();

    const columns: GridColDef<Device>[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        {
            field: 'created_at',
            headerName: 'Created At',
            flex: 1,

        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<Add />}
                    label="Add Value"
                    onClick={() => onAddValue(params.id as string)}
                />,
                <GridActionsCellItem
                    icon={<BarChart />}
                    label="View analytics"
                    onClick={() => navigate(`/devices/${params.id}`)}
                />,
                <GridActionsCellItem
                    icon={<Edit />}
                    label="Edit"
                    onClick={() => console.log('Edit', params.id)}
                />,
                <GridActionsCellItem
                    icon={<Delete />}
                    label="Delete"
                    onClick={() => onDelete(params.row.id)}
                />,
            ],
        },
    ];

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={devices}
                columns={columns}
                loading={isLoading}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
            />
        </div>
    );
};