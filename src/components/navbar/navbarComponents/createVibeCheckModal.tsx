/* modal from the createVibeCheck button that will display a form prompting the user to create
 a vibeCheck. Album name, album art, and artist name will all come from last.fm api */
import * as React from "react"
import Modal from "@mui/joy/Modal"
import ModalDialog from "@mui/joy/ModalDialog"
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from "@mui/joy/DialogTitle"
import DialogContent from "@mui/joy/DialogContent"
import { searchAlbum } from "../../createVibeCheck/SearchAlbum"
import AlbumOrArtist from "../../createVibeCheck/AlbumOrArtist"
import ReviewInput from "../../createVibeCheck/ReviewInput"
import RatingInput from "../../createVibeCheck/RatingInput"
import sendCreateVibeCheck from "../../../api/vibeCheckApi"
import { AutocompleteOption, SelectedAlbum } from "../../../types"
import type {} from "@mui/material/themeCssVarsAugmentation"
import CssBaseline from "@mui/material/CssBaseline"
import { Stack } from "@mui/material"
import { Button } from "@mui/joy"
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles"
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  createTheme as extendMaterialTheme,
  THEME_ID,
} from "@mui/material/styles"
import { AuthContext } from "../../Context/AuthContext";

const materialTheme = extendMaterialTheme()

interface CreateVibeCheckModalProps {
  openVibeCheck: boolean
  handleCloseVibeCheck: () => void,
  onVibeCheckResponse: (message: string, success: boolean) => void,
}

//Component for modal to create vibeChecks
const CreateVibeCheckModal: React.FC<CreateVibeCheckModalProps> = ({
  openVibeCheck,
  handleCloseVibeCheck,
  onVibeCheckResponse
}) => {
  const [ratingValue, setRatingValue] = React.useState<number | null>(null)
  const [options, setOptions] = React.useState<AutocompleteOption[]>([]) // State for options array
  const [selectedAlbum, setSelectedAlbum] =
    React.useState<SelectedAlbum | null>(null) // State for selected album
  const [reviewValue, setReviewValue] = React.useState<string>("")

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReviewValue(event.target.value)
  }

  //handling input for autocomplete selection of Album
  const handleInputChange = async (
    event: React.ChangeEvent<{}>,
    value: string
  ) => {
    //simple debounce
    if (value.length >= 3) {
      const results = await searchAlbum(value) // Call searchAlbum with the input value
      const formattedOptions: AutocompleteOption[] = results.map((album) => ({
        label: `${album.name} - ${album.artist}`, // Combine name and artist for display
        album: album, // Store the full album information
      }))
      setOptions(formattedOptions) // Update the options state with the results
    } else {
      setOptions([]) // Clear options if less than 3 characters
    }
  }

  //Setting state of album selection
  const handleAlbumSelect = (
    event: React.SyntheticEvent,
    newValue: AutocompleteOption | null
  ) => {
    if (newValue) {
      setSelectedAlbum(newValue.album) // Store selected album's data
    } else {
      setSelectedAlbum(null) // Reset when no album is selected
    }
  }

  // State to track validation
  const [isFormValid, setIsFormValid] = React.useState<boolean>(false)

  // Check form validity whenever the user updates a required field
  React.useEffect(() => {
    const isAlbumOrArtistValid = selectedAlbum !== null
    const isReviewValid = reviewValue.trim().length > 0
    const isRatingValid = ratingValue !== null

    // Form is valid if all the required fields are filled
    setIsFormValid(isAlbumOrArtistValid && isReviewValid && isRatingValid)
  }, [selectedAlbum, reviewValue, ratingValue])

  //handling when close button is pressed
  const handleCloseButton = () =>{
    setSelectedAlbum(null);  // Clear selected album
    setReviewValue('');       // Clear review text
    setRatingValue(null);    //clear rating
  }

  //get token from context
  const {token} = React.useContext(AuthContext)!;
  //Send creation request
  const handleSubmitButton = async () => {
    try{
      const response = await sendCreateVibeCheck(
                                                  token,
                                                  isFormValid,
                                                  selectedAlbum,
                                                  reviewValue,
                                                  ratingValue
                                                )
      if(response.status === 'success'){
        onVibeCheckResponse('VibeCheck created successfully!', true);
        setSelectedAlbum(null) // Clear selected album
        setReviewValue("") // Clear review text
        setRatingValue(null)
      }else{
        onVibeCheckResponse('Failed to create VibeCheck.', false);
      }
    }catch(error){
        onVibeCheckResponse('An error occurred while creating VibeCheck.', false);
    }
  }

  return (
    <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <CssBaseline enableColorScheme />
        <Modal open={openVibeCheck} onClose={handleCloseVibeCheck}>
          <ModalDialog
            sx={{
              maxHeight: "90vh", // Set maximum height to 90% of the viewport height
              overflowY: "auto", // Enable vertical scrolling if content overflows
              width: "40vw", // Set width to 40% of the viewport width
              maxWidth: "none",
            }}
          >
            <ModalClose onClick={handleCloseButton} variant="plain" sx={{ m: 1 }} />
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
                  event.preventDefault()
                  handleSubmitButton()
                  
                  handleCloseVibeCheck()
                }}
              >
                <Stack spacing={2}>
                  <AlbumOrArtist
                    options={options}
                    selectedAlbum={selectedAlbum}
                    handleInputChange={handleInputChange}
                    handleAlbumSelect={handleAlbumSelect}
                  />
                  <ReviewInput
                    value={reviewValue}
                    handleChange={handleReviewChange}
                  />
                  <RatingInput
                    ratingValue={ratingValue}
                    setRatingValue={setRatingValue}
                  />
                  <Button type="submit" disabled={!isFormValid}>
                    Submit
                  </Button>
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
