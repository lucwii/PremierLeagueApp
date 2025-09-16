import React from 'react'
import { Users, Home, Trophy } from "lucide-react";


const Footer = () => {
  return (
    <footer className="bg-purple-900 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-green-400 p-2 rounded-lg">
              <Trophy className="h-6 w-6 text-purple-900" />
            </div>
            <span className="text-2xl font-bold text-white">
              Premier League
            </span>
          </div>
          <p className="text-white/70">
            © 2024 Premier League App. All rights reserved.
          </p>
        </div>
      </footer>
  )
}

export default Footer