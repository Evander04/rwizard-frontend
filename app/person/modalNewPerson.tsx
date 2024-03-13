import { UseDateInput } from "@/hooks/useDate";
import { PersonType } from "@/types/apiTypes";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import React, { FC, useEffect, useMemo, useState } from "react";
import { savePerson } from "../api/person";
import useAuthToken from "@/hooks/useAuthToken";
import { useNotification } from "@/context/NotificationContext";

interface Props {
    personObj:PersonType | undefined;
    bindings: any;
}

const ModalNewPerson: FC<Props>=({personObj,bindings})=>{
    //auth
    const { auth } = useAuthToken();

    const [firstName,setFirstName] = useState<string>("")
    const [middleName,setMiddleName] = useState<string>("")
    const [lastName,setLastName] = useState<string>("")
    const [dob,setDob] = useState<string>(UseDateInput(new Date))
    const [address,setAddress] = useState<string>("")
    const [phone,setPhone] = useState<string>("")
    const invalid = useMemo(()=>{
        return firstName==="" || lastName==="" || dob===""
    },[firstName,lastName,dob])


    //notification
    const { showNotification } = useNotification();

    const [loading,setLoading] = useState<boolean>(false)

    //validate form    
    useEffect(()=>{
        if(personObj){
            setFirstName(personObj.firstName || "")
            setMiddleName(personObj.middleName || "")
            setLastName(personObj.lastName || "")
            setDob(UseDateInput(personObj.dob || new Date()))
            setAddress(personObj.address || "")
            setPhone(personObj.phone || "")
        }   
        else{
            setFirstName("")
            setMiddleName("")
            setLastName("")
            setDob(UseDateInput(new Date))
            setAddress("")
            setPhone("")            
        }     
    },[personObj])
    
    const onChangePhone=(value:string)=>{
        if(value.length<=10){
            setPhone(value)
        }
    }
    const handleSave = async (onClose:Function) => {
        setLoading(true)
        if(invalid){
            showNotification("Please complete all require fields",'success')            
        }
        else{
            let body:PersonType ={
                firstName:firstName,
                middleName:middleName,
                lastName:lastName,
                dob:new Date(dob),
                phone:phone,
                address:address,                    
            }
            if(personObj){
                body=personObj
                body.firstName=firstName
                body.middleName=middleName
                body.lastName=lastName
                body.dob=new Date(dob)
                body.phone=phone
                body.address=address
            }           
            const response = await savePerson(body,auth);
            if(response.code===200){
                console.log("success");
                onClose()
            }
            else{
                console.log("error with the ws");                
            }
        }
        setLoading(false)
    }
    
    return(
        <>
        <Modal
        size="xl"
        {...bindings}
        >
        <ModalContent>
        {(onClose:any)=>(
            <>
            <ModalHeader>
                <p className="text-inherit font-bold">
                    {personObj?`Edit ${personObj.firstName} ${personObj.lastName}`:`New Person`}
                </p> 
            </ModalHeader>
            <ModalBody>
                {
                    loading ?
                    <>
                        <Spinner label="Loading..." color="primary" labelColor="primary"/>
                    </> :
                    <>
                        <div className="grid grid-cols-3 items-end gap-2">
                            <Input
                            isRequired
                            color={firstName===""?"danger":"primary"}
                            variant="bordered"
                            label="First Name"
                            placeholder="Enter First Name"
                            value={firstName}
                            onValueChange={setFirstName}
                            />
                            <Input
                            color="primary"
                            variant="bordered"
                            label="Middle Name"
                            placeholder="Enter Middle Name"
                            value={middleName}
                            onValueChange={setMiddleName}
                            />
                            <Input
                            isRequired
                            color={lastName===""?"danger":"primary"}
                            variant="bordered"
                            label="Last Name"
                            placeholder="Enter Last Name"
                            value={lastName}
                            onValueChange={setLastName}
                            />
                            <Input
                            isRequired
                            type="date"
                            color={dob===""?"danger":"primary"}
                            variant="bordered"
                            label="DOB"                    
                            value={dob}
                            onValueChange={setDob}
                            />
                            <Input
                            color="primary"
                            variant="bordered"
                            label="Phone"
                            placeholder="Enter Phone number"
                            value={phone}
                            onValueChange={onChangePhone}
                            />
                        </div>
                        <Input
                        color="primary"
                        variant="bordered"
                        label="Address"
                        placeholder="Enter Street,City,State"
                        value={address}
                        onValueChange={setAddress}
                        />       
                    </>
                }
                      
            </ModalBody>
            <ModalFooter>
                <Button isLoading={loading} color="danger" variant="ghost" onPress={onClose}>
                Cancel
                </Button>
                <Button isLoading={loading} color="primary" variant="ghost" onPress={()=>handleSave(onClose)}>
                Save
                </Button>
            </ModalFooter>                
            </>
        )}      
        </ModalContent>                  
        </Modal>
        </>
    );
}

export default ModalNewPerson;