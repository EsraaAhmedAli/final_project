import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import imgupdate from '../../../imgs/update33.png';

export default function AdminUpdatePage() {
    const navigate = useNavigate();
    const { adminId } = useParams();
    const [formData, setFormData] = useState({
        name: null,
        email: null,
        permissions: null,
        faculties: null,
        status: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/admin/${adminId}`);
                const adminData = response.data;

                const newFormData = {
                    name: adminData.name,
                    email: adminData.email,
                    permissions: adminData.permissions ? adminData.permissions.map(permissions => permissions.permission_id) : [],
                    faculties: adminData.faculties ? adminData.faculties.map(faculties => faculties.faculty_id) : [],
                    status: adminData.is_active // Keep the status as boolean
                };
                // Set the newFormData as the initial state
                setFormData(newFormData);
            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        };
        fetchData();
    }, [adminId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // For arrays, split the input value by comma and store as an array
        const newValue = name === 'permissions' || name === 'faculties' ? value.split(',') : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!adminId) {
            console.error('Admin ID is undefined');
            return;
        }
        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                permissions_ids: formData.permissions,
                faculties_ids: formData.faculties,
                is_active: formData.status === 'true' // Convert status string to boolean
            };
            const response = await axios.patch(`http://localhost:3001/admin/update/${adminId}`, payload);
            //console.log(response.data);
            if(response.data!='This email is already exist'){
            alert('Updated successfully');
            navigate('/admins');}
            else if(response.data=='This email is already exist') {
                alert('This email used before');
            }
        } catch (error) {
            console.error('Error updating admin:', error);
           
        }
    };




    return (
        <div>
            <img src={imgupdate} alt="Admin Update" style={{ width: '100%', marginBottom: '20px',height:'25%',marginLeft:'5%' }} />
            <div className="container mt-4">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label" style={{fontWeight: '600'}}>Name:</label>
                        <input type="text" id="name" className="form-control" name="name" value={formData.name || ''} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" style={{fontWeight: '600'}}>Email:</label>
                        <input type="email" id="email" className="form-control" name="email" value={formData.email || ''} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="permissions" className="form-label" style={{fontWeight: '600'}}>Permissions:</label>
                        <input type="text" id="permissions" className="form-control" name="permissions" value={formData.permissions ? formData.permissions.join(',') : ''} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="faculties" className="form-label" style={{fontWeight: '600'}}>Faculties:</label>
                        <input type="text" id="faculties" className="form-control" name="faculties" value={formData.faculties ? formData.faculties.join(',') : ''} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label" style={{fontWeight: '600'}}>Status:</label>
                        <input type="text" id="status" className="form-control" name="status" value={formData.status || ''} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-danger">Update</button>
                </form>
            </div>
        </div>
    );
}
