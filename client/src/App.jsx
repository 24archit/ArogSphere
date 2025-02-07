import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DiseasePrediction from '../src/pages/DiseasePrediction';
import Estimation from '../src/pages/Estimation';
import FindingHospital from './pages/FindingHospital';
function App() {
  

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<DiseasePrediction />} />
        <Route path="/estimate" element={<Estimation />} />
        <Route path="/hospital" element={<FindingHospital />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
