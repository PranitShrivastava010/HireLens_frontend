
// import './App.css'
import Router from './routes/Routes';
import { BrowserRouter } from 'react-router-dom';
import "locomotive-scroll/dist/locomotive-scroll.css";
import LocomotiveProvider from '../LocomotiveProvider';


function App() {


  return (
    <BrowserRouter>
      <LocomotiveProvider>
        <Router />
      </LocomotiveProvider>


    </BrowserRouter>
  )
}

export default App
