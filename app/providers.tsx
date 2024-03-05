'use client'

import AuthContext from '@/context/AuthContext';
import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import Router from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import Login from './login/page';
import { getSession, getToken, setSession, setToken } from '@/context/storage';

export function Providers({children}: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<any>(undefined);
  //Update context
	useEffect(() => {				
		(async () => {
			const token = await getToken()
			const session= await getSession()			
			if(token) {
				setAuth({
					token,
					session					
				})
			} else {
				setAuth(null);
			}
		})();
	}, []);
  const logIn = (session:any) => {
		
		//tokens
		const tokenUser = session.token;		

		//local storage
		setToken(tokenUser)
		setSession(JSON.stringify(session))		

		//Update State
		setAuth({
			session:session,
			token:tokenUser,			
		});
	}

  //Close Session
	const signOut = () => {
		if (auth) {		
			setAuth(null)
			Router.push({
				pathname:'/'
			},'/');
		}
	}

    //Store and update component
	const authData:any = useMemo(
		() => ({
			auth,
			logIn,
			signOut,
		}),
		[auth]
	);	
  return (
    <AuthContext.Provider value={authData}>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {auth ? 
            children
            :
            <Login/>
          }
        </NextThemesProvider>
      </NextUIProvider>
    </AuthContext.Provider>   
  )
}