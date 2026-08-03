
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home";
import Leaderboard from './pages/Leaderboard';
import About from './pages/About';
import Challenges from './pages/Challenges';
import Join from './pages/Join';
import Admin from './pages/Admin';

import MainLayout from './layoutes/MainLayouts';
import Matches from './pages/Matches';

function App() {
  return (
    <Routes>
       <Route element={<MainLayout />}>
          <Route path='/' element={<Home />}/>
          <Route path='/leaderboard' element={<Leaderboard />}/>
          <Route path='/matches' element={<Matches />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/challenges' element={<Challenges />}/>
          <Route path='/join' element={<Join />}/>
          <Route path='/admin-panel-freefire' element={<Admin />}/>
       </Route>

    </Routes>
  )
}

export default App
