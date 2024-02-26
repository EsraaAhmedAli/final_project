
import { FaPenToSquare } from "react-icons/fa6";

import { FaTrash } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Tag } from 'primereact/tag';
import { Link } from 'react-router-dom';


import './News.css';



//import { Admininfo } from './service/Adminsinfo';

import axios from 'axios';



export default function News() {
    const [News, setnews] = useState([]);
    const [selectedAdmins, setSelectedAdmins] = useState([]);
    const [deleteevent, setdeleteevent] = useState(false);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        faculty_id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },


    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const [Statuses] = useState(['Inactive', 'Active']);
    const [permissionsfilter] = useState(['delete events', 'add events', 'add faculties', 'update news', 'add admins', 'update events', 'add news related to the commerce faculty', 'add events related to the science faculty', 'add news', 'delete news', 'add news related to the FCI faculty', 'add news related to the medicine faculty', 'add news related to the art faculty', 'delete news related to the art faculty', 'delete news related to the communication faculty']);

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

    useEffect(() => {
        fetch('http://localhost:3001/news/list')
            .then(res => res.json())
            .then((data) => setnews(data));

    }, [deleteevent]);


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
                <h4 className="m-0"> News Page </h4>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" style={{ marginTop: '10px' }} />

                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" style={{ marginTop: '28px' }} />
                </span>
            </div>

        );
    };
    const IDBodyTemplate = ({ data }) => {
        // Check if 'data' is defined before accessing 'name' property
        //const id = data?.admin_id || '';

        return (
            <div className="flex align-items-center gap-2">
                <span>{data.news_id}</span>
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


    const NameBodyTemplate = ({ data }) => {
        // Check if 'data' is defined before accessing 'name' property
        //const name = data?.Name || '';

        return (
            <div className="flex align-items-center gap-2">
                <span>{data.title}</span>
            </div>
        );
    };

    const DescriptionBodyTemplate = ({ data }) => {
        // Check if 'data' is defined before accessing 'name' property
        //const name = data?.Name || '';

        return (
            <div className="flex align-items-center gap-2">
                <span>{data.description}</span>
            </div>
        );
    };

    async function handledelete(id) {
        try {
            const res = await axios.delete(`http://localhost:3001/news/delete/${id}`)
            console.log(res);
            setdeleteevent((prev) => !prev);
        } catch (err) {
            console.log(err);
        }
    }




    const ImageBodyTemplate = ({ data }) => {
        // Check if 'data' is defined before accessing 'name' property
        //const name = data?.Name || '';

        return (
            <div className="flex align-items-center gap-2">
                <span>{data.link}</span>
            </div>
        );
    };



    const ActionBodyTemplate = ({ data }) => {

        return (
            <div className='d-flex align-items-center gap-2'>
                <Link to={`${data.news_id}`}>
                    <FaPenToSquare style={{ fontSize: "25px", color: "green" }} />
                </Link>



                <FaTrash onClick={() => handledelete(data.news_id)} style={{ fontSize: "25px", color: 'crimson', cursor: 'pointer' }} />
            </div>
        );
    };



















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
            return 'No Events';
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

        <div >
            <Link to='/news/add'>

                {/* <FaPlus style={{fontSize:"100px" , color:'crimson'}} /> */}
                <button className="button3">
                    Add New
                </button>
            </Link>


            <div className="card" style={{ height: '100%' }}>


                <DataTable
                    removableSort
                    value={News}
                    paginator
                    header={header}
                    rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]}
                    dataKey="news_id"
                    selectionMode="checkbox"
                    selection={selectedAdmins}
                    onSelectionChange={(e) => setSelectedAdmins(e.value)}
                    filters={filters}
                    filterDisplay="menu"
                    globalFilterFields={['news_id', 'title']}
                    emptyMessage="No News found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                >
                    <Column
                        field="news_id"
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
                        header="Title"
                        sortable
                        filter
                        body={(data) => <NameBodyTemplate data={data} />}
                        filterPlaceholder="Search by title"
                        style={{ minWidth: '14rem' }}
                    />
                    <Column
                        field="name"
                        header="Description"
                        sortable
                        filter
                        body={(data) => <DescriptionBodyTemplate data={data} />}
                        filterPlaceholder="Search by title"
                        style={{ minWidth: '14rem' }}
                    />
                    <Column
                        field="name"
                        header="Image"
                        sortable
                        filter
                        body={(data) => <ImageBodyTemplate data={data} />}
                        filterPlaceholder="Search by title"
                        style={{ minWidth: '14rem' }}
                    />

                    <Column
                        field="name"
                        header="Action"
                        sortable
                        filter
                        body={(data) => <ActionBodyTemplate data={data} />}
                        filterPlaceholder="Search by title"
                        style={{ minWidth: '14rem' }}
                    />

                </DataTable>

            </div>
            <div style={{ paddingBottom: '25px' }}>

            </div>
        </div>




    );

}





