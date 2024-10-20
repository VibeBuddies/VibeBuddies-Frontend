import React, { createContext, useState } from 'react';

interface UserContextType {
  username: string;
  setUsername: (username: string) => void;
}

export const UserContext = React.createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string>('');

  function setUsername(username: string): void {
    setUser(username);
  }

  return (
    <UserContext.Provider value={{ username: user, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
