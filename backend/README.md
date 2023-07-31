## Tables

CREATE TABLE IF NOT EXISTS "users" (
    "user_id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "username" VARCHAR(45) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL )

  

CREATE TABLE IF NOT EXISTS "events" (
    "event_id" SERIAL PRIMARY KEY,
    "user_id" INTEGER ,
    "title" VARCHAR(50),
    "text" VARCHAR(500),
    "isPrivate" boolean,
    "isCommentingOn" boolean,
    "date" DATE ,
    "time" TIME,
    "place" VARCHAR(100)
  )



CREATE TABLE IF NOT EXISTS "comments" (
    "comment_id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users" ("user_id"),
    "event_id" INTEGER REFERENCES "events" ("event_id"),
    "text" VARCHAR(2000),
    "date" DATETIME
  )


## sql version

CREATE TABLE IF NOT EXISTS events (
   event_id SERIAL PRIMARY KEY,
    user_id INTEGER ,
    title VARCHAR(50),
    text VARCHAR(500),
    isPrivate boolean,
    isCommentingOn boolean,
    date DATE ,
	  time TIME,
    place VARCHAR(100)
  )

CREATE TABLE IF NOT EXISTS comments (
    comment_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (user_id),
    event_id INTEGER REFERENCES events (event_id),
    text VARCHAR(2000),
    date DATE,
  )

## Info for tables


INSERT INTO users (name, username, password,email) values 
('cata','cat','foobar','cat@mail.com'),
('toni','toni','foobar','foo1@mail.com'),
('joonas','joonas','foobar','foo2@mail.com'),
('joonatan','joonatan','foobar','foo3@mail.com'),
('santi','santi','foobar','foo4@mail.com')


These ar enot valid anymore!
<!-- INSERT INTO events (user_id, title, text, isPrivate, isCommentingOn,date, place) values
(1,'boat party!','boat party','true', 'true',NOW(), 'your butt'),
(4,'banana party!','banana party','false', 'true',NOW(), 'your butt'),
(4,'kiwi party!','kiwi party','false', 'true',NOW(), 'your butt'),
(3,'pear party!','pear party','false', 'true',NOW(), 'your butt'),
(1,'strawberry party!','strawberry party','true', 'false',NOW(), 'your butt') -->

INSERT INTO comments (user_id , event_id, text, date) values
(3, 3,'why would anyone want to make a party about fruit? 1', NOW()),
(4, 1,'why would anyone want to make a party about fruit? 2', NOW()),
(3, 1,'why would anyone want to make a party about fruit? 3', NOW()),
(1, 4,'why would anyone want to make a party about fruit? 4', NOW())




//
    <!-- <form onSubmit={handleSubmit}>
      <label htmlFor="event-date">Event Date:</label>
      <input type="date" id="event-date" value={eventDate} onChange={handleDateChange} required />

      <label htmlFor="event-time">Event Time:</label>
      <input type="time" id="event-time" value={eventTime} onChange={handleTimeChange} required />

      <button type="submit">Save Event</button>
    </form> -->