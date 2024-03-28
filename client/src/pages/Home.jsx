import React, { useEffect, useReducer, useState } from 'react'
import DataTable from 'react-data-table-component'
import { UserCog } from 'lucide-react';
import { UserX } from 'lucide-react';
import { UserPlus } from 'lucide-react';
import axios from 'axios'
import Swal from 'sweetalert2';
import AddTodo from './AddTodo';


function Home() {
    const [open , setOpen] = useState(false)
    const [todo, setTodo] = useState([])
    const [id , setId] = useState('')
    const [editmodal , setEditModal] = useState(false)
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
    const userId = JSON.parse(localStorage.getItem('userId'));
    const [edit , setEdit] = useState({
        user:'',
        content:'',  
    })
    const [add , setAdd] = useState({
        user:'',
        content:'',
    })

    let getTodo = async () => {

        let response = await axios.get(`${BASE_URL}/api/todocreate`);
        console.log(response.data);
        if (response.status === 200) {
            setTodo(response.data)
           
        }

    }


    const conditionalRowStyles = [
        {
            when: row => row.is_active || !row.is_active,
            style: {
                backgroundColor: '#fffff',
                fontWeight: 'bold',

            },


        },

    ]



    const  handleDelete =  async  (e,row) => {
        e.preventDefault()
        console.log(row.id);
        let response = await axios.delete(`${BASE_URL}/api/tododelete/${row.id}`);
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
                title: "Successfully Deleted Todo Item"
            });
            forceUpdate()
        }

    }


    const handleEditModal = (e , row) => {
        setEditModal(true)
        setId(row.id)
    }

    const handlemodal = (e) => {
        setOpen(true)
       
    }

    useEffect(() => {
        if (userId) {
            setAdd(prevAdd => ({ ...prevAdd, user: userId }));
            setEdit(prevAdd => ({ ...prevAdd, user: userId }));
        }
    }, [userId]); 
    

    const handleCreate = async (e) => {
        if(!add.content.trim()){
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
                icon: "error",
                title: "Content Cannot be Empty"
            });
        }
        let response = await axios.post(`${BASE_URL}/api/todocreate`,add);
        if(response.status === 201){
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
                title: "Successfully Added Todo Item"
            });
            setOpen(false)
            forceUpdate()
        }
        
    }

    const handleSumbitEdit = async (e) => {
        if(!edit.content.trim()){
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
                icon: "error",
                title: "Content Cannot be Empty"
            });
        }
        let response = await axios.patch(`${BASE_URL}/api/todoedit/${id}/`,edit);
        if(response.status === 200){
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
                title: "Successfully Edited Todo Item"
            });
            setEditModal(false)
            forceUpdate()   
        }
    }

    useEffect(() => {
        getTodo()
    }, [BASE_URL,reducer])

    const coloumn = [

        {
            name: 'ID',
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Content",
            selector: row => row.content,
            
            sortable: true

        },
        {
            name: "STATUS",
            cell: (row) => {
                return (
                    <>
                        <button className="bg-transparent  text-blue-700 font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={(e) => handleEditModal(e ,row)}> <UserCog /> EDIT</button>
                        <button className="bg-transparent  text-blue-700 font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={(e) => handleDelete(e, row)}> <UserX /> DELETE</button>
                    </>

                );
            },
        }

    ]



    return (
        <div>


            <div className='flex justify-end'>
                <button onClick={handlemodal} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <UserPlus /> ADD Todo
                </button>
            </div>



            <DataTable
                columns={coloumn}
                data={todo}
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

            { open ? (
                 <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8" role="alert">
                 <div className="flex items-center gap-4">
                     <span className="shrink-0 rounded-full bg-blue-400 p-2 text-white">
                         <svg
                             className="h-4 w-4"
                             fill="currentColor"
                             viewbox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg"
                         >
                             <path
                                 clipRule="evenodd"
                                 d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                                 fillRule="evenodd"
                             />
                         </svg>
                     </span>
     
                     <p className="font-medium sm:text-lg">Add To do!</p>
                 </div>
     
                 <div>
                   
                     <div class="mt-2">
                         <input
                            onChange={(e) => setAdd({ ...add, content: e.target.value })}
                             type="text"
                             name="inputname"
                             className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                         />
                     </div>
                     
                 </div>
     
     
     
                 <div className="mt-6 sm:flex sm:gap-4">
     
     
     
                     <button
                     onClick={handleCreate}
                         className="inline-block w-full rounded-lg bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
                     >
                         Add
                     </button>
     
     
     
                 </div>
             </div>
            ):null}


            {editmodal ? (
                <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8" role="alert">
                <div className="flex items-center gap-4">
                  <span className="shrink-0 rounded-full bg-blue-400 p-2 text-white">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </span>
              
                  <p className="font-medium sm:text-lg">Edit To do!</p>
                </div>
              
                <div class="mt-2">
                         <input
                            onChange={(e) => setEdit({ ...edit, content: e.target.value })}
                             type="text"
                             name="inputname"
                             className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                         />
                     </div>
              
                <div className="mt-6 sm:flex sm:gap-4">
              
                  <button
                  onClick={handleSumbitEdit}
                   className="inline-block w-full rounded-lg bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
                  >
                      Add
                  </button>
                  
               
              
                </div>
              </div>
            ):null}

                
        </div>
    )
}

export default Home
