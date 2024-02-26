import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Tag } from 'primereact/tag';
//import { Admininfo } from './service/Adminsinfo';

import axios from 'axios';
import './FacultyTable.css'



export default function FacultiesDemo() {
    const [Admins, setAdmins] = useState([]);
    const [selectedAdmins, setSelectedAdmins] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        faculty_id : { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        

    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const [Statuses] = useState(['Inactive', 'Active']);
    const [permissionsfilter] = useState(['delete events', 'add events','add faculties','update news','add admins','update events','add news related to the commerce faculty','add events related to the science faculty','add news','delete news','add news related to the FCI faculty','add news related to the medicine faculty','add news related to the art faculty','delete news related to the art faculty','delete news related to the communication faculty']);

    const getSeverity = (is_active) => {
        switch (is_active) {
            case 'Inactive':
                return 'danger';

            case 'Active':
                return 'success';
            default:
                return 'black';


        }
    };
    /*const getPermissionColor = (type) => {
        switch (type) {
            case 'add events':
                return 'blue'; 
    
            case 'update news':
                return 'green'; 
    
            
    
            default:
                return 'black'; 
        }
        
    };*/
    /* useEffect(() => {
         Admininfo.getAdminsLarge().then((data) => setAdmins(getAdmins(data)));
     }, []); // eslint-disable-line react-hooks/exhaustive-deps*/

    /*const getAdmins = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);

            return d;
        });
    };
*/

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/faculty/list');
                console.log('Permission Data:', response.data);
                const listOfAdmins = response.data;
                setAdmins(listOfAdmins);

            } catch (error) {
                console.error('Error fetching data of admins:', error);
            }
            
            
        };

        fetchData();
    }, []);

    
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="first" >
                <h4 className="m-0">Faculties</h4>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const IDBodyTemplate = ({ data }) => {
        // Check if 'data' is defined before accessing 'name' property
        //const id = data?.admin_id || '';

        return (
            <div className="flex align-items-center gap-2">
                <span>{data.faculty_id}</span>
            </div>
        );
    };
    function getAdminStatus(isActive) {
        return isActive ? 'Active' : 'Inactive';
    }
    const statusBodyTemplate = (rowData) => {
        const status = getAdminStatus(rowData.is_active);
        return <Tag value={status} severity={getSeverity(status)} />;
    };
    /*const StatusBodyTemplate = (rowData) => {
        const statusColor = getSeverity(rowData.is_active);
        return (
            <Tag value={rowData.isActive} severity={statusColor} style={{ borderRadius: '5px', padding: '5px' }} />
        );
    };*/
    /*const PermissionBodyTemplate = (rowData,data,permissionType) => {
        const status = getAdminStatus(rowData.permission);
        return(
            <Tag value={data.permissionType} severity={getPermissionColor(permissionType)} />
        )
    };*/

    const EmailBodyTemplate = ({ data }) => {
        // Check if 'data' is defined before accessing 'Email' property
        //const email = data?.Email || '';

        return (
            <div className="flex align-items-center gap-2">
                <span>{data.email}</span>
            </div>
        );
    };
    const NameBodyTemplate = ({ data }) => {
        // Check if 'data' is defined before accessing 'name' property
        //const name = data?.Name || '';

        return (
            <div className="flex align-items-center gap-2">
                <span>{data.name}</span>
            </div>
        );
    };



    /*const statusBodyTemplate = ({ data }) => {
        // Check if 'data' is defined before accessing 'Permission' property
        const status = data?.Status || '';
    
        return (
            <div className="flex align-items-center gap-2">
                <span>{data.is_active}</span>
            </div>
        );
    };*/











    const IDFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} />;
    };
    

    function formatPermissions(permissions) {
        if (!permissions || permissions.length === 0) {
            return 'No Permissions';
        }
        const truncateText = (text, maxLength) => {
            return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
        };
        return (
            <div className="flex align-items-center gap-2" style={{ display: 'flow', flexWrap: 'wrap' }}>
                {permissions.map(permission => (
                    <span style={{
                        backgroundColor: '#f0f0f0',
                        borderRadius: '5px',
                        padding: '8px',
                        margin: '2px',
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }} title={permission.type} key={permission.permission_ID} >
                        {truncateText(permission.type, 10)}
                    </span>
                ))}
            </div>
        );
    }

    function formatFaculties(permissions) {
        if (!permissions || permissions.length === 0) {
            return 'No Faculties';
        }
        const truncateText = (text, maxLength) => {
            return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
        };
        return (
            <div className="flex align-items-center gap-2">
                {permissions.map(permissions => (
                    <span title={permissions.name} key={permissions.faculty_id} style={{ backgroundColor: '#f0f0f0', borderRadius: '5px', padding: '8px', margin: '2px' }}>
                        {truncateText(permissions.name, 15)}
                    </span>
                ))}
            </div>
        );
    }
    


    const StatusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={Statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={StatusItemTemplate} placeholder="Select One" className="p-column-filter" showClear />;
    };

    const StatusItemTemplate = (option) => {
        return <Tag value={option} severity={getSeverity(option)} />;
    };
    const permissionFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={permissionsfilter} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={permissionItemTemplate} placeholder="Select One" className="p-column-filter" showClear />;
    };

    const permissionItemTemplate = (option) => {
        return <Tag value={option} severity={getSeverity(option)} />;
    };






    const header = renderHeader();

    return (
        <div className="card">
            <DataTable
                removableSort
                value={Admins}
                paginator
                header={header}
                rows={10}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[10, 25, 50]}
                dataKey="faculty_id"
                selectionMode="checkbox"
                selection={selectedAdmins}
                onSelectionChange={(e) => setSelectedAdmins(e.value)}
                filters={filters}
                filterDisplay="menu"
                globalFilterFields={['faculty_id', 'name']}
                emptyMessage="No Faculties found."
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            >
                <Column
                    field="faculty_id"
                    header="ID"
                    sortable
                    dataType="numeric"
                    style={{ minWidth: '12rem' }}
                    filter
                    body={(data) => <IDBodyTemplate data={data} />}
                    filterElement={IDFilterTemplate}
                />
                <Column
                    field="name"
                    header="Faculty Name"
                    sortable
                    filter
                    body={(data) => <NameBodyTemplate data={data} />}
                    filterPlaceholder="Search by Name"
                    style={{ minWidth: '14rem' }}
                />
                
            </DataTable>
        </div>
    );
} 
  