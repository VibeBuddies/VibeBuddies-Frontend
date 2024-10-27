import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import getVibeChecksByUsername from '../../api/getVibeChecksByUsername';
import VibeCheckCard from './vibeCheckCard';
import deleteVibeCheck from '../../api/deleteVibeCheck';

interface vibeCheckListProps {
  usernameProp: string;
}

const VibeCheckList: React.FC<vibeCheckListProps> = ({ usernameProp }) => {
  /**
   * functional compoenent to get the vibeChecks of a given user
   */

  // state to hold the user's vibeChecks
  const [vibeChecks, setVibeChecks] = useState<any>([]);

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

  // function to handle the deleting of a vibeCheck
  function handleDelete(vibeCheckId: string): void {
    deleteVibeCheck(vibeCheckId);
    setVibeChecks(
      vibeChecks.filter((vibeCheck: any) => {
        return vibeCheckId !== vibeCheck.vibe_check_id;
      })
    );
  }

  // JSX
  return (
    <Box>
      {vibeChecks.map((vibeCheck: any, index: number) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            width: '100%',
            marginBottom: 2,
            boxSizing: 'border-box',
          }}
        >
          <VibeCheckCard
            vibeCheckInfo={vibeCheck}
            handleDelete={handleDelete}
          ></VibeCheckCard>
        </Box>
      ))}
    </Box>
  );
};

export default VibeCheckList;
