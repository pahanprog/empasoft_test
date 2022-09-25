import React, { useEffect, useRef, useState } from "react";
import CreateUserModal from "../../components/CreateUserModal";
import EditUserModal from "../../components/EditUserModal";
import User from "../../components/User";
import UserListSearch from "../../components/UserListSearch";
import { getUsers } from "../../controllers/users";
import { UserListItem } from "../../types";
import "./styles.css";

// main screen

const Main = () => {
  // ref stores initial users fetched from api to restore the list after searching
  const initialUsers = useRef<Array<UserListItem>>([]);
  const [users, setUsers] = useState<Array<UserListItem>>([]);

  // edit state for edit modal
  const [editUser, setEditUser] = useState<null | UserListItem>(null);

  // fetch users on render
  useEffect(() => {
    const onSuccessFetch = (users: Array<UserListItem>) => {
      initialUsers.current = users;
      setUsers(users);
    };

    const onErrorFetch = (errors: { [key: string]: Array<string> }) => {
      console.error("Unknown error", errors);
    };

    getUsers(onSuccessFetch, onErrorFetch);
  }, []);

  const handleOrderChange = (isOrderASC: boolean) => {
    if (isOrderASC) {
      setUsers((prevUsers) => [...prevUsers].sort((a, b) => a.id - b.id));
    } else {
      setUsers((prevUsers) => [...prevUsers].sort((a, b) => b.id - a.id));
    }
  };

  const handleSearch = (search: string) => {
    if (search) {
      setUsers((prevUsers) =>
        prevUsers.filter((user) =>
          user.username.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setUsers(initialUsers.current);
    }
  };

  const handleUserClick = (user: UserListItem) => {
    setEditUser(user);
  };

  const handleModalClose = () => {
    setEditUser(null);
  };

  const onEditSuccess = (editedUser: UserListItem) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === editedUser.id) {
          return editedUser;
        } else {
          return user;
        }
      })
    );
    setEditUser(null);
  };

  const onCreateSuccess = (user: UserListItem) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    <>
      <UserListSearch
        handleOrderChange={handleOrderChange}
        handleSearch={handleSearch}
      />
      <div className="user_list">
        {users.map((user) => (
          <User key={user.id} user={user} onClick={handleUserClick} />
        ))}
        <CreateUserModal onCreateSuccess={onCreateSuccess} />
      </div>
      {editUser && (
        <EditUserModal
          user={editUser}
          onEditSuccess={onEditSuccess}
          handleClose={handleModalClose}
        />
      )}
    </>
  );
};

export default Main;
