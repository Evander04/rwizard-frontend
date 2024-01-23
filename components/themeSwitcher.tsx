"use client";

import { Button } from "@nextui-org/react";
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import { MoonFilledIcon, SunFilledIcon } from "./icons";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div>
        {theme==="light" ? 
            <Button isIconOnly variant="light" onClick={() => setTheme('dark')}><MoonFilledIcon size={22} /></Button>
            :
            <Button isIconOnly variant="light" onClick={() => setTheme('light')}><SunFilledIcon size={22} /></Button>
        }      
    </div>
  )
};