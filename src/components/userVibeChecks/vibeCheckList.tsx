import React, { useContext, useEffect, useState } from 'react';
import getVibeChecksByUsername from '../../api/getVibeChecksByUsername';
import { UserContext } from '../Context/UserContext';

interface vibeCheckListProps {
  usernameProp: string;
}

const VibeCheckList: React.FC<vibeCheckListProps> = ({ usernameProp }) => {
  /**
   * functional compoenent to get the vibeChecks of a given user
   */

  // state to hold the user's vibeChecks
  const [vibeChecks, setVibeChecks] = useState<any>([]);

  // getting information from the context
  const { username: loggedInUser } = useContext(UserContext)!;

  // block to make api call to get vibeChecks from the backend
  useEffect(() => {
    const fetchVibeChecks = async () => {
      try {
        // api function call
        const data = await getVibeChecksByUsername(usernameProp);

        // checking if viebChecks are present, setting state to have current vibeChecks
        if (data?.data?.data?.returnedVibeChecks) {
          setVibeChecks(data.data.data.returnedVibeChecks);
        }
      } catch (error) {
        console.log(`There was an error while retrieving vibeChecks: ${error}`);
      }
    };
    fetchVibeChecks();
  }, [usernameProp]);

  console.log(vibeChecks);

  // JSX
  return <div>this is the vibeChecks for {usernameProp}</div>;
};

export default VibeCheckList;
