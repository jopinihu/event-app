import { Event } from "./EventList";
import { useState } from "react";
const accessToken = localStorage.getItem("accessToken");

const modifyEvent = async (eventData: Event) => {
  const response = await fetch(`/api/events/${eventData.event_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(eventData),
  });
  return response;
};

const editFormStyle = {
  marginLeft: "10px",
  width: "50vw",
};

interface Props {
  event: Event;
  setIsEditOpen: () => void
}

export function EditEvent(props: Props) {
  const { event , setIsEditOpen} = props;
  const [formState, setFormState] = useState<Partial<Event>>(event);

  const onChangeHandler = (e: any) => {
    const key = e.target.id;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormState({ ...formState, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    modifyEvent(formState as Event);
    setIsEditOpen()
  };

  return (
    <>
      <div style={editFormStyle} className="editEventForm">
        <h2 className="title is-4 ">Edit Event: {event?.title}</h2>
        <form onSubmit={handleSubmit}  className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Title"
              id="title"
              onChange={onChangeHandler}
            />
          </div>

          <label className="label">Description</label>
          <div className="control">
            <textarea
              className="textarea"
              id="text"
              placeholder="Event Description"
              onChange={onChangeHandler}
            />
          </div>

          <label className="label">Place</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Place"
              id="place"
              onChange={onChangeHandler}
            />
          </div>

          <label className="label">Date</label>
          <div className="control">
            <input
              className="input"
              type="date"
              placeholder="date"
              id="date"
              onChange={onChangeHandler}
            />
          </div>

          <label className="label">Time</label>
          <div className="control">
            <input
              className="input"
              type="time"
              placeholder="time"
              id="time"
              onChange={onChangeHandler}
            />
          </div>

          <div className="control">
            <label className="label">Make Event Private</label>
            <input
              type="checkbox"
              name="isPrivate"
              id="isPrivate"
              onChange={onChangeHandler}
            />

            <label className="label">Enable Commenting</label>
            <input
              type="checkbox"
              name="isCommentingOn"
              id="isCommentingOn"
              onChange={onChangeHandler}
            />
          </div>
          <div className="editCardButtonDiv">
            <button type="submit" className="button" >Save</button>
            <button onClick={setIsEditOpen} className="button">Close</button>
          </div>
        </form>
      </div>{" "}
    </>
  );
}


