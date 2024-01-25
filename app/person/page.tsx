'use client'

import { FC, useEffect, useState } from "react"
import { findAllPerson, findPerson } from "../api/person"
import TableUI from "@/components/tableUI"
import { PersonType } from "@/types"

const searchMap={
    "Name":0,
}
const Person: FC= ()=>{
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [searchBy,setSearchBy]=useState(0);

    //pagination
    const[page,setPage]=useState(1)
    const[rowsPerPage,setRowsPerPage]=useState(10)
    const[totalRows,setTotalRows]=useState(0)

    useEffect(()=>{
        getData(page,rowsPerPage)
    },[])
    const getData=async (page:number,rowsPerPage:number,paramSearch?:string)=>{
        const body={
            page:page-1,
            rowsPerPage:rowsPerPage,
            paramSearch:paramSearch,
        }
        // const response = await findPerson(body)
        // if(response){
        //     setData(response.content)
        //     setTotalRows(response.totalRows)
        // }
        // else{
        //     console.log("error to get data");            
        // }
        const response= await findAllPerson()
        setData(response.body)
    }
    const columns:any=[
        {
            name: 'Name',
            selector: (person:PersonType) => person.firstName, 
        },
    ]
    return(
    <>
    <TableUI
    rows={data}
    columns={columns}
    title="Person List"
    />
    </>)
}

export default Person;