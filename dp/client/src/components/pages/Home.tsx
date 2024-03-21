import React, { useState } from 'react'
import { Module } from '../Module'
import { SignIn } from '../SignIn';

export const Home = () => {
    const [moduleOpen, setModuleOpen] = useState(true);
  return (
    <div>
        <Module isOpen={moduleOpen} onClick={(e) => {
            e.stopPropagation();
            setModuleOpen(!moduleOpen)
            }}>
            <SignIn />
        </Module>
    </div>
  )
}
