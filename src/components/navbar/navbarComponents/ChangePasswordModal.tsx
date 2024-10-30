import React, { useContext, useState } from 'react'
import { Modal, Box, Typography, Input, FormLabel, Button, Stack, DialogTitle } from '@mui/joy';
import sendChangePassword from '../../../api/changePasswordApi';
import { AuthContext } from '../../Context/AuthContext';

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  onPasswordChange: (message: string, success: boolean) => void,
}

//component for modal to update user password
const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  open,
  onClose,
  onPasswordChange,
}) => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const clearStates = () => {
    // Reset all states and close the modal
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setError('');
    onClose();
  };
//sanitizing characters on passwords
  function containsIllegalCharacters(str:string) {
    const illegalChars = /[<>\[\]{}()=|:;,+\*\?%&\s]/
    return illegalChars.test(str)
  }

  const {token} = useContext(AuthContext)!;
  const handleSubmit = async () => {
    try{
      //checks for password format validity
      if (newPassword.length < 7 || newPassword.length > 20) {
        setError("Passwords must be at least 7 characters long, 20 at most");
        return;
      }
      if(containsIllegalCharacters(newPassword)){
        setError("Passwords must not contain [<>\[\]{}()=|:;,+\*\?%&\s]")
        return;
      }
      if (newPassword !== confirmNewPassword) {
        setError("Passwords do not match");
        return;
      }
      // sending the request
      const response = await sendChangePassword(token, currentPassword, newPassword);
      if(response.status === 'success'){
        onPasswordChange('Password changed succesfully!', true)
      }else{
        onPasswordChange('Password change unsuccessful!', false)
      }
      //clear after response
      clearStates();
    }catch(error){
      onPasswordChange('An error occurred when changing password, try again', false)
      clearStates();
    }
  };


  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
        <Box sx={{
          width: 400,
          p: 4,
          bgcolor: 'background.body',
          borderRadius: 8,
          boxShadow: 3,
        }}
        >
          <DialogTitle>Change Password</DialogTitle>
          <Stack spacing={2}>
            <Box>
              <FormLabel htmlFor="current-password">Current Password</FormLabel>
              <Input
                id="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                fullWidth
                type="password" 
              />
            </Box>
            <Box>
              <FormLabel htmlFor="new-password">New Password</FormLabel>
              <Input
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                fullWidth
                type="password" 
              />
            </Box>
            <Box>
              <FormLabel htmlFor="confirm-new-password">Confirm New Password</FormLabel>
              <Input
                id="confirm-new-password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
                fullWidth
                type="password" 
                error={!!error} // Displays error state
              />
              {error && <Typography color="danger">{error}</Typography>}
            </Box>
          </Stack>

          <Stack direction="row" justifyContent="flex-end" mt={4} spacing={2}>
            <Button variant="plain" color="neutral" onClick={clearStates}>
              Cancel
            </Button>
            <Button variant="solid" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  )
}
export default ChangePasswordModal