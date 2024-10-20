import React, { useState } from 'react';

interface UserContextType {
  username: string;
  isEditing: boolean;
  setUsername: (username: string) => void;
  setIsEditing: (editingBoolean: boolean) => void;
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

  function setUsername(username: string): void {
    setUser({ ...user, username: username });
  }

  function setIsEditing(editingBoolean: boolean): void {
    setUser({
      ...user,
      isEditing: editingBoolean,
    });
  }

  return (
    <UserContext.Provider
      value={{
        username: user.username,
        isEditing: user.isEditing,
        setUsername,
        setIsEditing,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
