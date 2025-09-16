import { useState } from 'react'
import './App.css'
import PlayersTable from './components/Players'
import DataHandling from './components/Players'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* <Route path="/players" element={< />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
  </QueryClientProvider>
  )
}

export default App
