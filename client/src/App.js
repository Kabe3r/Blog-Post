import NavBar from "./components/NavBar";
import { Home, Profile, Single, Register, Login, Compose } from "./pages";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { useGlobalContext } from "./context/Context"

function App() {
  const { user } = useGlobalContext();

  return (
    <Router>
    <NavBar />
    <Routes>
    <Route path="/"
    element={<Home />} />
    <Route path="/register"
    element={user ? <Home /> : <Register/>} />
    <Route path="/login"
    element={user ? <Home /> : <Login/>} />
    <Route path="/post/:id" element={<Single/>} />
    <Route path="/compose"
    element={user ? <Compose /> : <Register/>} />
    <Route path="/profile"
    element={user ? <Profile /> : <Register />} />
    </Routes>
    </Router>
  )
}

export default App;
