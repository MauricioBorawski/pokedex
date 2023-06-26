import { Dashboard, Navbar, PokemonInfo } from "./containers";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pokemon/:pokemonname" element={<PokemonInfo />} />
      </Routes>
    </div>
  );
}

export default App;
