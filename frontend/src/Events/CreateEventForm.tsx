import { useState } from "react";
import { Event } from "./EventList";
import './Event.css'
import { useNavigate } from 'react-router-dom'

const accessToken = localStorage.getItem("accessToken");

const postEvent = async (eventData: Event) => {
  const response = await fetch(`/api/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify(eventData),
  });
  return response;
};

export default function CreateEventForm() {
  const [formState, setFormState] = useState<Partial<Event>>({
    isPrivate: false,
    isCommentingOn: false,
  });
const navigate = useNavigate()

  const onChangeHandler = (e: any) => {
    const key = e.target.id;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormState({ ...formState, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      accessToken !== "" &&
      accessToken !== null &&
      accessToken !== undefined
    ) {
   
      postEvent(formState as Event);
      setFormState({
        isPrivate: false,
        isCommentingOn: false,
      });
      navigate('/calendar')

    }
  };

  
  return (
    <div className="createForm" style={{width: "50vw", marginLeft: "10px"}} id="createForm">
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title" className="label">
            Title
          </label>

          <input
            className="input"
            required
            type="text"
            id="title"
            onChange={onChangeHandler}
            placeholder="event title"
            value={formState.title}
          />
          <label htmlFor="text" className="label">
            Description
          </label>

          <textarea
            className="textarea"
            required
            id="text"
            onChange={onChangeHandler}
            placeholder="event description"
            value={formState.text}
          />
          <label htmlFor="date" className="label">
            Date
          </label>
          <input
            className="input"
            required
            type="date"
            id="date"
            onChange={onChangeHandler}
            value={formState.date}
          />
          <label htmlFor="time" className="label">
            Time
          </label>
          <input
            className="input"
            required
            type="time"
            id="time"
            onChange={onChangeHandler}
            value={formState.time}
            name="time"
          />
          <label htmlFor="place" className="label">
            Place
          </label>
          <input
            className="input"
            required
            type="text"
            id="place"
            onChange={onChangeHandler}
            placeholder="event place"
            value={formState.place}
          />
        </div>

        <div className="control">
          <div
            style={{ display: "flex", flexDirection: "row", marginBottom: "0" }}
          >
            <label
              htmlFor="isPrivate"
              className="label"
              style={{ marginRight: "10px" }}
            >
              Private event
            </label>
            <input
              type="checkbox"
              name="isPrivate"
              id="isPrivate"
              onChange={onChangeHandler}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "row", marginBottom: "0" }}
          >
            <label
              htmlFor="isCommentingOn"
              className="label"
              style={{ marginRight: "10px" }}
            >
              {" "}
              enable commenting
            </label>

            <input
              type="checkbox"
              name="isCommentingOn"
              id="isCommentingOn"
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <div>
          <button className="button" type="submit">create</button>
        </div>
      </form>
    </div>
  );
}

