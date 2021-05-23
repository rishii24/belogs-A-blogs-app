import Home from './Components/Home'
import Navbar from './Components/Navbar'
import './App.css';
import { useSelector } from 'react-redux';
import { selectSignedIn } from './Features/UserSlice';
import Blogs from './Components/Blogs';


function App() {

  const isSignedIn = useSelector(selectSignedIn)

  return (
    <div className="App">
      <Navbar />
      <Home />
      {isSignedIn && <Blogs />}
     
    </div>
  );
  
}

export default App;
