import { Routes, Route } from "react-router-dom";
import {
  NotificationContext,
  useNotificationContext,
  PokemonContext,
  usePokemonContext,
} from "./context";
import { Dashboard, Navbar, PokemonInfo } from "./containers";
import { Notification } from "./components";

function App() {
  const { pokemonData } = usePokemonContext(PokemonContext);
  const { open, content, closeNotification } =
    useNotificationContext(NotificationContext);

  return (
    <div className="App">
      <Navbar pokemonData={pokemonData} />
      <Routes>
        <Route path="/" element={<Dashboard pokemonData={pokemonData} />} />
        <Route path="/pokemon/:pokemonname" element={<PokemonInfo />} />
      </Routes>
      <Notification open={open} onClose={closeNotification} type="error">
        {content}
      </Notification>
    </div>
  );
}

export default App;
