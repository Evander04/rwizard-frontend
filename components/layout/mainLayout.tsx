'use client'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Spacer } from "@nextui-org/react";
import { FC, useState } from "react";
import { ThemeSwitcher } from "../themeSwitcher";
import { ChrevonDown, GithubIcon } from "../icons";
import { useRouter } from "next/navigation";

interface Props {
    children: React.ReactNode;    
}
const menuItems = [
    {
        id:1,
        title:"Settings",
        items:[
            {
                title:"Person",
                description:"Add, Edit, Remove any person in the system",
                url:"/person",
            },
            {
                title:"Person",
                url:"/person",                
            },            
            {
                title:"Person",
                url:"/person",                
            }
        ]
    },   
];
export const MainLayout: FC<Props> = ({children}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router= useRouter()

    return (
        <>
            <Navbar onMenuOpenChange={setIsMenuOpen}>
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand>
                        <GithubIcon/>
                        <Spacer x={1}/>
                        <p className="font-bold text-inherit">RWIZARD</p>
                    </NavbarBrand>
                </NavbarContent>                
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    {menuItems.map((item:any, index:number) => (
                        <Dropdown key={index}>                        
                            <NavbarItem>
                            <DropdownTrigger>
                            <Button
                                disableRipple
                                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                                endContent={<ChrevonDown fill="currentColor" size={16}/>}
                                radius="sm"
                                variant="light"
                            >
                                {item.title}
                            </Button>
                            </DropdownTrigger>
                            </NavbarItem>                                                    
                            <DropdownMenu
                                aria-label="menu"                                
                                itemClasses={{
                                base: "gap-4",
                                }}
                            >
                                {item.items.map((subItem:any,subIndex:number)=>(
                                    <DropdownItem
                                    onPress={()=>{router.push(subItem.url)}}
                                    key={subIndex}
                                    description={subItem.description}
                                    >
                                    {subItem.title}
                                    </DropdownItem>
                                ))}                                
                            </DropdownMenu>
                        </Dropdown>                        
                    ))}                                        
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                    <ThemeSwitcher/>
                    </NavbarItem>
                    <NavbarItem>
                    <Button as={Link} color="danger" href="#" variant="ghost">
                        Sign out
                    </Button>
                    </NavbarItem>
                </NavbarContent>
                <NavbarMenu>
                {menuItems.map((item:any, index:number) => (
                        <Dropdown key={index}>                        
                            <NavbarItem>
                            <DropdownTrigger>
                            <Button
                                disableRipple
                                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                                endContent={<ChrevonDown fill="currentColor" size={16}/>}
                                radius="sm"
                                variant="light"
                            >
                                {item.title}
                            </Button>
                            </DropdownTrigger>
                            </NavbarItem>                                                    
                            <DropdownMenu
                                aria-label="menu"                                
                                itemClasses={{
                                base: "gap-4",
                                }}
                            >
                                {item.items.map((subItem:any,subIndex:number)=>(
                                    <DropdownItem
                                    key={subIndex}
                                    description={subItem.description}
                                    onPress={()=>{router.push(subItem.url)}}
                                    >
                                    {subItem.title}
                                    </DropdownItem>
                                ))}                                
                            </DropdownMenu>
                        </Dropdown>                        
                    ))}      
                </NavbarMenu>            
            </Navbar>     
            <div className="container m-auto">
                {children}
            </div>
        </>
    )
}