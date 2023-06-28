import './App.css';
import Home from './Home';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
 

  return (
    <div className="mx-auto text-center">
   
  <Home></Home>
  <ToastContainer></ToastContainer>
  {/* <Navbar></Navbar> */}
    </div>
  );
}

export default App;