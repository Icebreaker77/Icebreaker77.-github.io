import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Ticket, TicketsState} from './types';

export const fetchTickets = createAsyncThunk<Ticket[]>('tickets/fetchTickets', async () => {
  const response = await fetch('/tickets.json');
  const data = await response.json();
  return data.tickets;
});

const initialState: TicketsState = {
  allTickets: [],
  filteredTickets: [],
  sortBy: 'price',
  filters: [],
  page: 1,
  ticketsPerPage: 5,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    resetFilters(state) {
      state.filters = [];
      state.filteredTickets = state.allTickets;
    },
    setFilter(state, action: PayloadAction<number>) {
      const filterIndex = state.filters.indexOf(action.payload);
      if (filterIndex === -1) {
        state.filters.push(action.payload);
      } else {
        state.filters.splice(filterIndex, 1);
      }

      if (state.filters.length === 0) {
        state.filteredTickets = state.allTickets;
      } else {
        state.filteredTickets = state.allTickets.filter(ticket =>
          state.filters.includes(ticket.transfers.length)
        );
      }
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
      state.filteredTickets = sortTickets(state.filteredTickets, state.sortBy);
    },
    loadMoreTickets(state) {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.allTickets = action.payload;
      state.filteredTickets = action.payload;
    });
  }
});

const sortTickets = (tickets: Ticket[], sortBy: string) => {
  switch (sortBy) {
    case 'price':
      return tickets.sort((a, b) => a.price - b.price);
    case 'duration':
      return tickets.sort((a, b) => {
        const totalDurationA = calculateTotalDuration(a);
        const totalDurationB = calculateTotalDuration(b);
        return totalDurationA - totalDurationB;
      });
    case 'optimal':
      return tickets.sort((a, b) => {
        const totalDurationA = calculateTotalDuration(a);
        const totalDurationB = calculateTotalDuration(b);
        if (totalDurationA !== totalDurationB) {
          return totalDurationA - totalDurationB;
        }
        if (a.transfers.length !== b.transfers.length) {
          return a.transfers.length - b.transfers.length;
        }
        return a.price - b.price;
      });
    default:
      return tickets;
  }
};

const calculateTotalDuration = (ticket: Ticket) => {
  return ticket.routes.reduce((total, route) => {
    const durationParts = route.duration.split(' ');
    const hours = parseInt(durationParts[0].replace('h', ''), 10);
    const minutes = parseInt(durationParts[1].replace('m', ''), 10);
    return total + (hours * 60) + minutes;
  }, 0);
};

export const {resetFilters, setFilter, setSortBy, loadMoreTickets} = ticketsSlice.actions;
export default ticketsSlice.reducer;
