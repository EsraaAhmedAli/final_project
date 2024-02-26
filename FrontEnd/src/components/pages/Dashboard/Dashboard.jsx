
import './dashboardstyle.css';
import { Link } from 'react-router-dom';
import { Tag } from 'primereact/tag';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';



const Dashboard = () => {
    const [Admins, setAdmins] = useState([]);


    const [Statuses] = useState(['Inactive', 'Active']);




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
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/admin/list');
                console.log('Admins Data:', response.data);
                const listOfAdmins = response.data;
                setAdmins(listOfAdmins);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);




    const EmailBodyTemplate = ({ data }) => {
        // Check if 'data' is defined before accessing 'Email' property
        //const email = data?.Email || '';

        return (
            data.email

        );
    };
    const NameBodyTemplate = ({ data }) => {
        // Check if 'data' is defined before accessing 'name' property
        //const name = data?.Name || '';

        return (
            data.name
        );
    };
    const StatusItemTemplate = (option) => {
        return <Tag value={option} severity={getSeverity(option)} />;
    };

    function formatPermissions(permissions) {
        if (!permissions || permissions.length === 0) {
            return 'No Permissions';
        }
        const truncateText = (text, maxLength) => {
            return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
        };
        return (
            <div className="flex align-items-center gap-2">
                {permissions.map(permission => (
                    <span title={permission.type} key={permission.permission_ID} style={{ backgroundColor: '#f0f0f0', borderRadius: '5px', padding: '8px', margin: '2px' }}>
                        {truncateText(permission.type, 10)}
                    </span>
                ))}
            </div>
        );
    }
    function getAdminStatus(isActive) {
        return isActive ? 'Active' : 'Inactive';
    }
    const statusBodyTemplate = (rowData) => {
        const status = getAdminStatus(rowData.is_active);
        return <Tag value={status} severity={getSeverity(status)} />;
    };
    const permissionItemTemplate = (option) => {
        return <Tag value={option} severity={getSeverity(option)} />;
    };

    return (
        <div className='dashboard'>
            <main>
                <React.Fragment>
                    <section className='upsection'>

                    </section>
                </React.Fragment>



                <div className="admins">
                    <h2>Admins</h2>
                    <DataTable  className="custom-datatable" style={{ height: '300px',width:'100%', overflowY: 'auto', margin: '0' }}
                        value={Admins}
                        
                        rows={4}>

                        <Column
                            field="name"
                            header="Name"
                            body={(data) => <NameBodyTemplate data={data} />}

                            
                        />
                        <Column
                            field="email"
                            header="Email"

                            filterField="email"
                            style={{ minWidth: '14rem' , margin: '0', padding: '0' }}
                            body={(data) => <EmailBodyTemplate data={data} />}

                        />
                       
                        <Column
                            field="is_active"
                            header="Status"


                            style={{  margin: '0', padding: '0' }}
                            body={statusBodyTemplate}

                        />
                    </DataTable>
                    <Link className='showall' to='/admins'>Show All</Link>
                </div>


            </main>



        </div>

    )
}

export default Dashboard
