'use client'

import { FC, useEffect, useState } from "react"
import { findAllPerson, findPerson } from "../api/person"
import TableUI from "@/components/tableUI"
import { PersonType } from "@/types"
import useAuthToken from "@/hooks/useAuthToken"
import { UseDateFormat } from "@/hooks/useDate"
import { Button, useDisclosure } from "@nextui-org/react"
import ModalNewPerson from "./modalNewPerson"

const searchMap={
    "Name":0,
}
const Person: FC= ()=>{
    //authorization 
    const { auth } = useAuthToken();
    const [data,setData]=useState([])
    const [personObj,setPersonObj]=useState<PersonType|undefined>(undefined);
    const [loading,setLoading]=useState(false)
    const [searchBy,setSearchBy]=useState(0);
    const {isOpen, onOpen,onOpenChange} = useDisclosure();

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
        const response= await findAllPerson(auth)
        setData(response.body)
    }
    const columns:any=[
        {
            name:"Actions",
            selector: (person:PersonType)=>(
            <div className="flex flex-row gap-1">
                <Button size="sm" color="warning" variant="ghost" onPress={()=>handleEdit(person)}>Edit</Button>
                <Button size="sm" color="danger" variant="ghost">Remove</Button>
            </div>
            )
        },
        {
            name: 'First Name',
            selector: (person:PersonType) => person.firstName, 
        },  
        {
            name: 'Middle Name',
            selector: (person:PersonType) => person.middleName, 
        },  
        {
            name: 'Last Name',
            selector: (person:PersonType) => person.lastName, 
        },        
        {
            name: 'DOB',
            selector: (person:PersonType) => person.dob,
            format: (person:PersonType)=> UseDateFormat(person.dob)
        },
    ]

    const handleEdit=(person:PersonType)=>{
        setPersonObj(person)            
        onOpen();
    }
    const handleNew=()=>{
        setPersonObj(undefined)            
        onOpen();
    }
    return(
    <div className="">        
    <TableUI
    rows={data}
    columns={columns}
    title="Person List"
    headerComponent={<Button color="primary" variant="ghost" onPress={handleNew}>New</Button>}
    />
    <ModalNewPerson
    bindings={{
        isOpen:isOpen,
        onOpenChange:onOpenChange
    }}
    personObj={personObj}
    />
    </div>)
}

export default Person;