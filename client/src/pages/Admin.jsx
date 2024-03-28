import React from 'react'
import DataTable from 'react-data-table-component'
import Spinner from './Spinner'
import { UserCog } from 'lucide-react';
import { UserX } from 'lucide-react';
import { UserPlus } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'


function Admin() {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLaoding] = useState(true)
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
    let getUser = async () => {

        let response = await axios.get(`${BASE_URL}/api/list`);
        console.log(response.data);
        if (response.status === 200) {
            setUsers(response.data)
            setIsLaoding(false)
        }

    }

    if (isLoading) {
        <Spinner />
    }

    useEffect(() => {
        getUser()
    }, [BASE_URL , reducer])

    const conditionalRowStyles = [
        {
            when: row => row.is_active || !row.is_active,
            style: {
                backgroundColor: '#fffff',
                fontWeight: 'bold',

            },


        },

    ]


    const  handleEdit = (e) => {
        e.preventDefault()
        console.log('clicked');
    }

    const  handleDelete =  async  (e,row) => {
        e.preventDefault()
        console.log(row.id);
        let response = await axios.delete(`${BASE_URL}/api/delete/${row.id}`);
        console.log(response.status);
        if(response.status === 204){
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Successfully Deleted User"
            });
            forceUpdate()
        }

    }


    const coloumn = [

        {
            name: 'ID',
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Username",
            selector: row => row.username,
            sortable: true

        },

        {
            name: "Email",
            selector: row => row.email,


        },
        {
            name: "Edit",
            cell: (row) => {
                return (
                    <>
                        <button className="bg-transparent  text-blue-700 font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={(e) => handleEdit(e ,row)}> <UserCog /> EDIT</button>
                        <button className="bg-transparent  text-blue-700 font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={(e) => handleDelete(e, row)}> <UserX /> DELETE</button>
                    </>

                );
            },
        }

    ]


  return (
    <div>


    <div className='flex justify-end'>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <UserPlus /> ADD USER
        </button>
    </div>


    <DataTable
        columns={coloumn}
        data={users}
        pagination
        selectableRows
        conditionalRowStyles={conditionalRowStyles}
        customStyles={{
            headCells: {
                style: {
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    backgroundColor: '#551B8C',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    borderBottom: '1px solid #ddd',

                },
            },
            cells: {
                style: {
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    borderBottom: '1px solid #ddd',
                }
            }
        }}
    >

    </DataTable>
</div>
  )
}

export default Admin