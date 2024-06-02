import Header from "./components/Header";
import Filter from "./components/Filter";
import TicketList from "./components/TicketList";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchTickets} from "./ticketsSlice";
import {AppDispatch} from "./store";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTickets());
  }, []);

  return (
    <div className="container">
      <Header/>
      <main className="main">
        <Filter/>
        <TicketList/>
      </main>
    </div>
  );
}

export default App;
