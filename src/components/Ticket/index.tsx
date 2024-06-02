import React from 'react';
import { Route } from '../../types';
import './Ticket.scss';
import A4ELogo from '../../assets/a4e_logo.svg';
import { formatTime } from '../../utils/formatTime';

interface TicketProps {
  price: number;
  transfers: string[];
  company: string;
  routes: Route[];
}

const Ticket: React.FC<TicketProps> = ({
  price,
  transfers,
  company,
  routes,
}) => (
  <div className="ticket">
    <div className="ticket__header">
      <div className="ticket__header-price">
        {new Intl.NumberFormat('ru-RU').format(price)} $
      </div>
      <div className="ticket__header-logo">
        <img src={A4ELogo} alt="a4e" />
      </div>
    </div>
    <div className="ticket__details">
      {routes.map((route, index) => (
        <div className="ticket__flight" key={index}>
          <div className="ticket__flight-segment">
            <span className="ticket__flight-title ticket__route">
              {route.from} - {route.to}
            </span>
            <span className="ticket__time">
              {formatTime(route.departure)} - {formatTime(route.arrival)}
            </span>
          </div>
          <div className="ticket__flight-segment">
            <div className="ticket__flight-title">В дорозі:</div>
            <span className="ticket__duration">{route.duration}</span>
          </div>
          <div className="ticket__flight-segment">
            <div className="ticket__flight-title">
              {0 === transfers.length
                ? 'Без пересадок'
                : 1 === transfers.length
                  ? '1 пересадка'
                  : transfers.length + ' пересадки'}
            </div>
            <div className="ticket__transfer">
              {0 !== transfers.length && <span>{transfers.join(', ')}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Ticket;
