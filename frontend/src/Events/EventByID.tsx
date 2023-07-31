import { Event } from "./EventList";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
const accessToken = localStorage.getItem('accessToken')


const getEventById = async (id: string | undefined) => {
  return await fetch(`/api/events/${id}`).then((res) => {
    return res.json();
  });
};

const deleteEventById = async (id: string | undefined) => {
  const response = await fetch(`/api/events/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  return response;
};

type EventParams = {
  id: string | undefined;
};


export default function EventById() {
  const { id } = useParams<EventParams>();
  const [event, setEvent] = useState<Event | undefined>(
    undefined
  );
  const navigate = useNavigate();

  useEffect(() => {
     getEventById(id).then((event) => { setEvent(event)});
   
  }, [id]);



  const handleDeleteclick = (
    event_id: number | undefined
  ) => {
    const stringId = event_id?.toString();
    deleteEventById(stringId);
    navigate(`/calendar`);
  };

  return (
    event &&
    <EventCard eventInfo={event} handleDelete={handleDeleteclick} />
  );
}
