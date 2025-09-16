import React from 'react'
import { Users, Home, Trophy } from "lucide-react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Button from './ui/Button';

const NavBar = () => {
    const navItems = [
        {
            to: "/",
            icon: Home,
            label: "Home"
        },
        {
            to: "/players",
            icon: Users,
            label: "Players"
        }
    ]
    const navigate = useNavigate();

  return (
    <nav className='bg-gradient-to-r from-purple-950 to-purple-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className="flex justify-between h-16 items-center">
                <Link to='/' className='flex items-center space-x-3 group'>
                <div className="bg-green-400 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Trophy className="h-6 w-6 text-purple-900" />
                </div>
                <span className="text-xl font-bold text-background drop-shadow-lg group-hover:text-green-400 text-white transition-colors duration-300">
                    Premier League
                </span>
                </Link>

                <div className="flex space-x-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.to;

                        return (
                            <Button
                            variant='green'
                            onClick={() => navigate(item.to)}
                            label={item.label}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    </nav>
  )
}

export default NavBar