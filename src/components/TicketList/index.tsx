import React, {useState} from 'react';
import Ticket from '../Ticket';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {loadMoreTickets, setSortBy} from "../../ticketsSlice";
import './TicketList.scss';

const TicketList: React.FC = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state: RootState) => state.tickets.filteredTickets);
  const page = useSelector((state: RootState) => state.tickets.page);
  const ticketsPerPage = useSelector((state: RootState) => state.tickets.ticketsPerPage);
  const [activeSort, setActiveSort] = useState<string>('price');

  const handleSortChange = (sortBy: string) => {
    setActiveSort(sortBy);
    dispatch(setSortBy(sortBy));
  };

  const handleLoadMore = () => {
    dispatch(loadMoreTickets());
  };

  const displayedTickets = tickets.slice(0, page * ticketsPerPage);

  return (
    <div className="tickets">
      <div className="tickets__sorting">
        <button
          className={`tickets__sortBtn ${activeSort === 'price' ? 'tickets__sortBtn--active' : ''}`}
          onClick={() => handleSortChange('price')}
        >
          Найдешевший
        </button>
        <button
          className={`tickets__sortBtn ${activeSort === 'duration' ? 'tickets__sortBtn--active' : ''}`}
          onClick={() => handleSortChange('duration')}
        >
          Найшвидший
        </button>
        <button
          className={`tickets__sortBtn ${activeSort === 'optimal' ? 'tickets__sortBtn--active' : ''}`}
          onClick={() => handleSortChange('optimal')}
        >
          Оптимальний
        </button>
      </div>
      <div className="tickets__list">
        {displayedTickets.map((ticket, index) => (
          <Ticket key={index} {...ticket} />
        ))}
      </div>
      {displayedTickets.length < tickets.length && (
        <button className="tickets__load-more" onClick={handleLoadMore}>Показати ще 5 квитків</button>
      )}
    </div>
  );
};

export default TicketList;
