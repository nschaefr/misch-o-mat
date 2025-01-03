import { Routes, Route } from 'react-router-dom';
import Customer from './pages/Customer'
import Preparation from './pages/Preparation'
import Pin from './pages/Pin';
import Ready from './pages/Ready';
import Settings from './pages/Settings';
import Configuration from './pages/Configuration';

function App() {

  return (
    <div className='px-4 w-full h-full'>
      <Routes>
        <Route path="/" element={<Customer />} />
        <Route path="/preparation" element={<Preparation />} />
        <Route path="/pin" element={<Pin />} />
        <Route path="/ready" element={<Ready />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/configuration" element={<Configuration />} />
      </Routes>
    </div>
  )
}

export default App
