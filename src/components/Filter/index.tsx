import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilters, setFilter } from '../../ticketsSlice';
import { RootState } from '../../store';
import './Filter.scss';

const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.tickets.filters);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === 'all' ? 'all' : parseInt(e.target.value);
    if (value === 'all') {
      dispatch(resetFilters());
    } else {
      dispatch(setFilter(value));
    }
  };
  return (
    <div className="filter">
      <h2 className="filter__title">Кількість пересадок</h2>
      <div className="filter__options">
        <label className="filter__option custom-checkbox">
          <input
            type="checkbox"
            name="transfer"
            value="all"
            onChange={handleFilterChange}
            checked={filters.length === 0}
          />
          <span className="custom-checkbox__checkmark"></span>
          Всі
        </label>
        <label className="filter__option custom-checkbox">
          <input
            type="checkbox"
            name="transfer"
            value="0"
            onChange={handleFilterChange}
            checked={filters.includes(0)}
          />
          <span className="custom-checkbox__checkmark"></span>
          Без пересадок
        </label>
        <label className="filter__option custom-checkbox">
          <input
            type="checkbox"
            name="transfer"
            value="1"
            onChange={handleFilterChange}
            checked={filters.includes(1)}
          />
          <span className="custom-checkbox__checkmark"></span>1 пересадка
        </label>
        <label className="filter__option custom-checkbox">
          <input
            type="checkbox"
            name="transfer"
            value="2"
            onChange={handleFilterChange}
            checked={filters.includes(2)}
          />
          <span className="custom-checkbox__checkmark"></span>2 пересадка
        </label>
        <label className="filter__option custom-checkbox">
          <input
            type="checkbox"
            name="transfer"
            value="3"
            onChange={handleFilterChange}
            checked={filters.includes(3)}
          />
          <span className="custom-checkbox__checkmark"></span>3 пересадка
        </label>
      </div>
    </div>
  );
};

export default Filter;
