import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import { Toaster } from 'react-hot-toast';

function App() {
  
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:username' element={<Profile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
