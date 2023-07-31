import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Event } from "./EventList"
import {EditEvent} from './EditEvent'
import CommentById from '../components/CommentById';


const editCardStyle = {
  margin: "15px 15px 15px 10px",
  width: "50vw",
};

interface Props {
  eventInfo: Event
  handleDelete: any
}

function EventCard(props: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const { eventInfo, handleDelete } = props;
  const navigate = useNavigate();

const handleEditor = () => {
   setIsEditOpen(false)
}

  return (
    <>
      <div className="card eventCard" style={editCardStyle}>
        <header className="card-header">
          <p className="card-header-title">{eventInfo?.title.toUpperCase()}</p>

         
          <button
            onClick={() => {
              navigate(`/calendar`);
            }}
            className="card-header-icon"
            aria-label="more options"
          >
            Close
          </button>
        </header>
        <div className="card-content">
          <div className="content">
            <b>
              <time>Date: {eventInfo.date.slice(0, 10)} </time>
              <br />
              <time>Time: {eventInfo.time.slice(0, 5)} </time>
            </b>
            <p>
              {" "}
              <b>Place: </b>
              {eventInfo.place}
            </p>
            <div className="eventDescription">
              <b>Description:</b>
              <br />
              {eventInfo.text}
              <br />
            </div>
          </div>
        </div>
        <footer className="card-footer">
          <button onClick={() => setIsEditOpen(!isEditOpen)} className="card-footer-item">
            Edit
          </button>
          <button

            className="card-footer-item"
            onClick={() => handleDelete(eventInfo?.event_id)}
          > Delete</button>

        </footer>

{/*TODO render commentcards here */}

{!isEditOpen && <div><CommentById id={eventInfo?.event_id}/></div> }

      </div>
        {isEditOpen && <div> <EditEvent event={eventInfo} setIsEditOpen={handleEditor}/></div>}
    </>
  );
}

export default EventCard;


