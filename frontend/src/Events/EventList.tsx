/*
Need to review the headers later on when we have the loggedin state
*/
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface Event {
  event_id?: number;
  user_id: number;
  title: string;
  text: string;
  isPrivate: boolean;
  isCommentingOn: boolean;
  date: string,
  time: string,
  place: string
}


const getAuthHeaders = () => {
  const accessToken = localStorage.getItem("accessToken")
  const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {}

  return headers as HeadersInit
};

const getAllEvents = async () => {
  return fetch(
    "/api/events",
    { headers: getAuthHeaders() }
  ).then(res => res.json())
};

export default function EventList() {
  const [eventsList, setEventsList] = useState<Array<Event>>([])
  const navigate = useNavigate()

  useEffect(() => {
    getAllEvents().then(setEventsList);
  }, []);

  return (
    <div className="eventList">
      {eventsList.map(event => {
        return (
          <div

            key={event.event_id}
            onClick={() => {
              navigate(`/events/${(event.event_id)}`);
            }}
            className="eventInfo"
          >
            Event Title: <b>{event.title}</b>
          </div>
        );
      })}
    </div>
  );
}



