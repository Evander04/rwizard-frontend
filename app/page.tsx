'use client'
import { Button } from '@nextui-org/react'
import { useState } from 'react'

export default function Home() {
  const [test,setTest]=useState("");
  return (
    <div>
      <Button color='primary'>click me</Button>
    </div>
  )
}