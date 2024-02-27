'use client'

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Input } from "@nextui-org/react";
import { FC, useState } from "react";
import { loginWS } from "../api/login";
import useAuth from "@/hooks/useAuth";


const Login: FC = ()=>{
  const {logIn} = useAuth();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const submit=async ()=>{      
    const json={
      'email':email,
      'password':password
    }
    console.log("body=>",json);    
    const response = await loginWS(json)
    console.log("response=>",response);
    
    logIn(response)
  }
  return (
      <div className="bg-gradient-to-b from-black to-purple-800 h-screen flex items-center justify-center">
        <Card className="min-w-[600px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">R Wizard</p>
              <p className="text-small text-default-500">Powered by: JockerCode</p>
            </div>
          </CardHeader>
          <Divider/>
          <CardBody>
              <div className="flex flex-col gap-3">
                <Input
                  isRequired
                  type="email"
                  label="Email"                  
                  value={email}
                  onValueChange={setEmail}
                />
                <Input
                  isRequired
                  type="password"
                  label="Password"                  
                  value={password}
                  onValueChange={setPassword}
                />
              </div>
          </CardBody>
          <Divider/>
          <CardFooter className="flex justify-end">
            <Button color="primary" onPress={submit}>Sign in</Button>
          </CardFooter>
        </Card>             
      </div>
  );
}

export default Login;