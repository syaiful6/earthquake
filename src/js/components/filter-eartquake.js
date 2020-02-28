import React from 'react';
import DatePicker from 'react-datepicker';

export function EarthQuakeFilter({ onSubmit, onMagnitudeChange, onMinDateChange, onMaxDateChange, mindate, maxdate, magnitude }) {
  function handleSubmit(ev) {
    ev.preventDefault();
    onSubmit();
  }

  return(
    <div className="filter-options">
      <h3>Filter Earthquakes:</h3>
      <form onSubmit={handleSubmit}>
        <label className="filter-column">Minimum Magnitude</label>
        <select name="magnitude" value={magnitude} onChange={e => {
          onMagnitudeChange(e.target.value);
        }}>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
        <label className="filter-column">Date Range:</label>
        <DatePicker selected={mindate} onChange={onMinDateChange} dateFormat="MMMM d, yyyy h:mm aa" />
        <DatePicker selected={maxdate} onChange={onMaxDateChange} dateFormat="MMMM d, yyyy h:mm aa" />
        <input type="submit" className="button"/>
      </form>
    </div>
   )
}
