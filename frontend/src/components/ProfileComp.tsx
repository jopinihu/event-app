import { useState, useEffect, ChangeEvent } from 'react';
import { User } from './Login';
import { initialState } from './RegisterNewUser';


function ProfileComp() {
  const [userData, setUserData] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User>(initialState);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>('')
  const [user, setUser] = useState<User>(initialState)



  const getToken = async () => {
    const token = localStorage.getItem('accessToken')
    setAccessToken(token)
  }

  useEffect(() => {
    getToken()
  }, [])

  const handleLogout = () => {
    setUser({})
    localStorage.clear()
  }

  const { name, email, username, password } = editUser;

  const getAllUsers = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (user_id: number | undefined) => {
    try {
      const response = await fetch(`/api/users/${user_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });


      if (response.ok) {
        await getAllUsers();
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  const editUserData = async (user_id: number) => {

    const response = await fetch(`/api/users/edit/${user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editUser),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      console.log(userData)
      setUserData((prevUserData) =>
        prevUserData.map((user) =>
          user.user_id === user_id ? updatedUser : user
        )
      );
      setEditUser(initialState);
    } else {
      throw new Error("Failed to update user");
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditUser(() => ({
      ...editUser, [name]: value
    }))
  }

  useEffect(() => {
    getAllUsers();
  }, []);


  const getCurrentUser = async () => {
    if (accessToken !== "") {
      await fetch("/api/users/currentUser", {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
    }
  }


  useEffect(() => {
    let myBoolean = false
    if (myBoolean == false) {
      getCurrentUser()
      myBoolean = true
    }
  }, [accessToken])


  return (
    <div>
      {user.name ? <div>
        <h1>
          {user.username}
        </h1>
        <p>Email:{user.email}</p>
        <button onClick={() => setIsEditing(true)}>Open Edit</button>
        <div>
          {isEditing &&
            userData.map((user) => (
              <div key={user.user_id}>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Username: {user.username}</p>
                {editUser.user_id === user.user_id ? (
                  <div>
                    <input
                      type="text"
                      name='name'
                      value={name}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="username"
                      value={username}
                      onChange={handleInputChange}
                    /><input
                      type="text"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                    />
                    <button onClick={() => editUserData(user.user_id)}>Save</button>
                  </div>
                ) : (
                  <button onClick={() => setEditUser(user)}>Edit</button>
                )}
                <button onClick={() => deleteUser(user.user_id)}>Delete</button>
              </div>
            ))
          }
        </div >
        <button onClick={handleLogout} style={{ marginTop: '2em' }}>
          Logout
        </button>
      </div> : <p>You have to login</p>}


    </div>

  );
}

export default ProfileComp;
