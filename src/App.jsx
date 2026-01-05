
// import './App.css'
import Router from './routes/Routes';
import { BrowserRouter } from 'react-router-dom';
import "locomotive-scroll/dist/locomotive-scroll.css";
import LocomotiveProvider from '../LocomotiveProvider';
import AuthGate from './routes/AuthGate';


function App() {

  return (
    <BrowserRouter>
      <AuthGate>
        <LocomotiveProvider>
          <Router />
        </LocomotiveProvider>
      </AuthGate>
    </BrowserRouter>
  )
}

export default App
