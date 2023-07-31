import { useState, useEffect } from "react"
import { Event } from "./EventList";


const getEventByUserId = async (id: number) => {
    return fetch(
        `/api/events/user/${id}`).then(res => res.json());
};


export default function EventByUserID() {
    const [events, setEvents] = useState<Array<Event>>()
const userId = 13
//TODO get user id from token
//Delet eafter useContext implemented

    useEffect(() => {
        getEventByUserId(userId).then(setEvents);
      }, []);



    return (
        <div className="eventUserId">
            {events?.map((event: Event) => <p>{event.title}</p>)}
        </div>
    )
}