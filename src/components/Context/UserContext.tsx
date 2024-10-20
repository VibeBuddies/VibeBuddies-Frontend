import React, { useState } from 'react';

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
  const [user, setUser] = useState<userProps>({
    username: '',
    isEditing: false,
  });

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
