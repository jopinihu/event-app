import EventList from '../Events/EventList'
import { useNavigate } from "react-router-dom";
import "../Events/Event.css"





const Calendar = () => {
  const navigate = useNavigate()

  return (
    <div className="calendarContainer">
      <button className="button" onClick={() => navigate('/eventForm')}>
        Create Event
      </button>
    
       <EventList />
    </div>
  );
};

export default Calendar;


