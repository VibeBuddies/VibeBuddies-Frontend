/* modal from the createVibeCheck button that will display a form prompting the user to create
 a vibeCheck. Album name, album art, and artist name will all come from last.fm api */

 import * as React from "react";

import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Autocomplete from "@mui/joy/Autocomplete";
import { searchAlbum } from "../SearchAlbum";
import type {} from "@mui/material/themeCssVarsAugmentation";
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  createTheme as extendMaterialTheme,
  THEME_ID,
} from "@mui/material/styles";

// Material UI components
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Stack,
  Rating,
} from "@mui/material";

// Joy UI components
import {
  Button,
  FormControl,
  FormLabel,
  Textarea,
} from "@mui/joy";

import {
  CssVarsProvider as JoyCssVarsProvider,
} from "@mui/joy/styles";

const materialTheme = extendMaterialTheme();

interface CreateVibeCheckModalProps {
  open: boolean
  handleClose: () => void;
}

const CreateVibeCheckModal: React.FC<CreateVibeCheckModalProps> = ({
  open,
  handleClose,
}) => {
  const [inputValue, setInputValue] = React.useState<string>(""); // State for input value
  const [ratingValue, setRatingValue] = React.useState<number | null>(2);
  const [options, setOptions] = React.useState<AutocompleteOption[]>([]); // State for options array
  const [selectedAlbum, setSelectedAlbum] =
    React.useState<SelectedAlbum | null>(null); // State for selected album
  const [value, setValue] = React.useState<string>("");

  interface AutocompleteOption {
    label: string;
    album: SelectedAlbum;
  }

  interface SelectedAlbum {
    name: string;
    artist: string;
    cover_url: string;
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleInputChange = async (
    event: React.ChangeEvent<{}>,
    value: string
  ) => {
    setInputValue(value); // Update input value state

    if (value.length >= 3) {
      const results = await searchAlbum(value); // Call searchAlbum with the input value
      const formattedOptions: AutocompleteOption[] = results.map((album) => ({
        label: `${album.name} - ${album.artist}`, // Combine name and artist for display
        album: album, // Store the full album information
      }));
      setOptions(formattedOptions); // Update the options state with the results
    } else {
      setOptions([]); // Clear options if less than 3 characters
    }
  };

  const handleAlbumSelect = (
    event: React.SyntheticEvent,
    newValue: AutocompleteOption | null
  ) => {
    if (newValue) {
      setSelectedAlbum(newValue.album); // Store selected album's data
    } else {
      setSelectedAlbum(null); // Reset when no album is selected
    }
  };


  return (
    <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <CssBaseline enableColorScheme />
        <Modal open={open} onClose={handleClose}>
        <ModalDialog
              sx={{
                maxHeight: "90vh", // Set maximum height to 90% of the viewport height
                overflowY: "auto", // Enable vertical scrolling if content overflows
                width: '40vw',    // Set width to 40% of the viewport width
                maxWidth: 'none', 
              }}
            >
              <DialogTitle>Create new VibeCheck</DialogTitle>
              <DialogContent
                sx={{
                  maxHeight: "75vh", // Set maximum height for content to ensure scrollability
                  overflowY: "auto", // Enable scrolling within the content if needed
                }}
              >
                Start by searching for an album.
                <form
                  onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    handleClose();
                  }}
                >
                  <Stack spacing={2}>
                    <FormControl>
                      <FormLabel>Album or Artist name</FormLabel>
                      <Autocomplete
                        options={options}
                        onInputChange={handleInputChange} // Handle input changes
                        onChange={handleAlbumSelect} // Handle option selection
                        // renderInput={(params) => (
                        //   <Input {...params} label="name" />
                        // )}
                      />
                    </FormControl>

                    {selectedAlbum && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: 2,
                        }}
                      >
                        <img
                          src={selectedAlbum.cover_url}
                          alt={`${selectedAlbum.name} cover art`}
                          style={{ width: "200px", height: "200px" }}
                        />
                      </Box>
                    )}

                    <FormControl>
                      <FormLabel>Review</FormLabel>
                      <Box
                        sx={{
                          display: "inline-block",
                          resize: "vertical", // Allow resizing
                          minHeight: "40px", // Minimum height
                        }}
                      >
                        <Textarea
                          value={value}
                          onChange={handleChange}
                          placeholder="Type your review here"
                          minRows={3} // Minimum number of rows
                          sx={{
                            width: "100%", // Make the textarea take full width of the container
                            resize: "vertical", // Allow vertical resizing
                            borderRadius: "4px", // Optional: for styling
                          }}
                        />
                      </Box>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Rating</FormLabel>
                      <Box sx={{ "& > legend": { mt: 2 } }}>
                        <Rating
                          name="simple-controlled"
                          value={ratingValue}
                          onChange={(event, newRatingValue) => {
                            setRatingValue(newRatingValue);
                          }}
                          sx={{
                            fontSize: "24px", // Set the desired size manually
                          }}
                        />
                      </Box>
                    </FormControl>
                    <Button type="submit">Submit</Button>
                  </Stack>
                </form>
              </DialogContent>
            </ModalDialog>
        </Modal>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  )
}

export default CreateVibeCheckModal
