import { useState } from 'react'
import './App.css'
import {useTable, useGlobalFilter, useSortBy, usePagination} from 'react-table'
import * as React from 'react'
import axios from 'axios'

function App() {
  
  const [students, setStudents] = useState([]);
  const columns = React.useMemo(()=>[
    {Header:"StudentId",accessor:"id"},
    {Header:"Name",accessor:"name"},
    {Header:"Email",accessor:"email"},
    {Header:"RoleNumber",accessor:"roleNumber"},
    {Header:"Edit", id:'edit', accessor:"edit",
      Cell:props=>(<button className = 'editBtn' onClick={()=>populateStudent(props.cell.row.original)}>Edit</button>)
    },
    {Header:"Delete", id:'delete', accessor:"delete",
      Cell:props=>(<button className = 'deleteBtn' onClick={()=>deleteStudent(props.cell.row.original)}>Delete</button>)
    }
  ],[]);
  const [showCancel, setShowCancel] = useState(false);
  const data = React.useMemo(()=>students,[]);
  const {getTableProps, getTableBodyProps,headerGroups, page, prepareRow, setGlobalFilter, state, pageCount, canNextPage, canPreviousPage, previousPage, nextPage, gotoPage} = useTable({columns,data:students, initialState:{pageSize:4}}, useGlobalFilter, useSortBy, usePagination);
  const [studentData,setStudentData] = useState({name:"",email:"",roleNumber:""});
  const {globalFilter, pageIndex}=state;
  const getAllStudents = ()=>{
    axios.get("http://127.0.0.1:8000/api/students/").then((res)=>{
      console.log(res.data);
      setStudents(res.data);
    })
  }
  

  React.useEffect(()=>{
    getAllStudents();
  }
  ,[]);

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value
    });
    console.log("studentData", studentData);
  }

  const handleAddEdit = async(e) => {
    e.preventDefault();
    if (studentData.id) {
      await axios.put(`http://127.0.0.1:8000/api/students/${studentData.id}/`,studentData).then((res)=>{
        console.log(res.data);
      })
    }
    else {
      await axios.post("http://127.0.0.1:8000/api/students_add/", studentData)
          .then(res => console.log(res.data))
          .catch(err => console.error(err));

      // await axios.post("http://127.0.0.1:8000/api/students/",studentData).then((res)=>{
      //   console.log(res.data);
      // })
    }
    clearAll();
  }

  const deleteStudent = async(std) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${std.name}?`);
    if (isConfirmed) {
      await axios.delete(`http://127.0.0.1:8000/api/students/${std.id}/`).then((res)=>{
        console.log(res.data);
        setStudents(res.data);
      })
      window.location.reload();
    }
  }

  const clearAll = () => {
    setStudentData({name:"",email:"",roleNumber:""});
    getAllStudents();
  }

  const populateStudent = (std) => {
    setShowCancel(true);
    setStudentData(std);
  }

  const handleCancel = () => {
    setStudentData({name:"",email:"",roleNumber:""});
    setShowCancel(false);
  }

  return (
    <>
    <div className = "std-container">
      <h2>StudentDesk</h2>
      <h3>Easy way to store and manage student information</h3>
      <div className = 'addeditpn'>
        <div className = 'addeditpndiv'>
          <label htmlFor = "name">Name</label>
          <br />
          <input className = 'addeditinput' type = 'text' value={studentData.name} onChange = {handleChange} name = 'name' id = 'name' />
        </div>
        <div className = 'addeditpndiv'>
          <label htmlFor = "email">Email</label>
          <br />
          <input className = 'addeditinput' type = 'text' value={studentData.email} onChange = {handleChange} name = 'email' id = 'email' />
        </div>
        <div className = 'addeditpndiv'>
          <label htmlFor = "roleNumber">RoleNumber</label>
          <br />
          <input className = 'addeditinput' type = 'text' value={studentData.roleNumber} onChange = {handleChange} name = 'roleNumber' id = 'roleNumber' />
        </div>
        <button className = 'addBtn' onClick={handleAddEdit}>{studentData.id?"Update":"Add"}</button>
        <button className = 'cancelBtn' disabled={!showCancel} onClick={handleCancel}>Cancel</button>
      </div>
      <input className = 'insearch' type = "search"  name = "inputsearch" id = "inputsearch" value={globalFilter || ""} onChange={(e)=>setGlobalFilter(e.target.value)} placeholder = 'Search Students Here'/>

    <table className = 'std-table' {...getTableProps()}>
      <thead>
        {headerGroups.map((hdg) => (
          <tr {...hdg.getHeaderGroupProps()} key = {hdg.id}>
            {hdg.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())} key = {column.id}>{column.render('Header')}
              {column.isSorted && <span>{column.isSortedDesc?"⬆️":"⬇️"}</span>}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return(<tr {...row.getRowProps()} key = {row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key = {cell.id}>{cell.render('Cell')}</td>
                ))}
                </tr>)
        })}
      </tbody>
    </table>
    <div className = 'pagediv'>
      <button disabled={!canPreviousPage} className='pagedivbtn' onClick={()=>gotoPage(0)}>First</button>
      <button disabled={!canPreviousPage} className='pagedivbtn' onClick={previousPage}>Prev</button>
      <span className = "pgidx">{pageIndex + 1} of {pageCount}</span>
      <button disabled={!canNextPage} className='pagedivbtn' onClick={nextPage}>Next</button>
      <button disabled={!canNextPage} className='pagedivbtn' onClick={()=>gotoPage(pageCount-1)}>Last</button>
    </div>
    </div>
    </>
  )
}

export default App
