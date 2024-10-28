import React, { useEffect, useState } from 'react';
import getFriends from '../../api/getFriends';

interface UserContextType {
  username: string;
  isEditing: boolean;
  setProperty: (name: string, value: any) => void;
  friendList?: Set<string>;
}

interface userProps {
  username: string;
  isEditing: boolean;
  friendList?: Set<string>;
}

export const UserContext = React.createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // state to hold the user information
  const [user, setUser] = useState<userProps>({
    username: '',
    isEditing: false,
  });

  // block to get the friends of the user that was passed through
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // calling the api
        const data = await getFriends(user.username);
        if (data?.data?.data.friendList) {
          const allFriends = data?.data?.data.friendList;
          const allUsernames = allFriends.map((friend: any) => {
            return friend.username;
          });
          setUser({
            ...user,
            friendList: new Set<string>([...allUsernames]),
          });
        }
      } catch (error) {
        console.log(
          `There was an error while retrieving personal info: ${error}`
        );
      }
    };
    fetchFriends();
  }, [user]);

  // function to update a property based on the name and value
  function setProperty(name: string, value: any): void {
    setUser({
      ...user,
      [name]: value,
    });
  }

  return (
    <UserContext.Provider
      value={{
        username: user.username,
        isEditing: user.isEditing,
        friendList: user.friendList,
        setProperty,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
