'use client'
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Spacer } from "@nextui-org/react";
import { FC, useState } from "react";
import { LogoApp } from "../logo";
import { ThemeSwitcher } from "../themeSwitcher";
import { GithubIcon } from "../icons";

interface Props {
    children: React.ReactNode;    
}
const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
];

export const MainLayout: FC<Props> = ({children}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
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
                    <NavbarItem>
                    <Link color="foreground" href="/person">
                        Person
                    </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                    <Link href="#" aria-current="page">
                        Customers
                    </Link>
                    </NavbarItem>
                    <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                    <ThemeSwitcher/>
                    </NavbarItem>
                    <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                    </NavbarItem>
                </NavbarContent>
                <NavbarMenu>
                    {menuItems.map((item:string, index:number) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                        color={
                            index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                        }
                        className="w-full"
                        href="#"
                        size="lg"
                        >
                        {item}
                        </Link>
                    </NavbarMenuItem>
                    ))}
                </NavbarMenu>            
            </Navbar>     
            <div className="container m-auto">
                {children}
            </div>
        </>
    )
}