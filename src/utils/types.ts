export interface Route {
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: number;
}

export interface Ticket {
  price: number;
  transfers: string[];
  company: string;
  routes: Route[];
}

export interface TicketsState {
  allTickets: Ticket[];
  filteredTickets: Ticket[];
  sortBy: string;
  filters: number[];
  page: number;
  ticketsPerPage: number;
}
