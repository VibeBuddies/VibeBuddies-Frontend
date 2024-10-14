/* modal from the createVibeCheck button that will display a form prompting the user to create
 a vibeCheck. Album name, album art, and artist name will all come from last.fm api */
import * as React from "react"
import Modal from "@mui/joy/Modal"
import ModalDialog from "@mui/joy/ModalDialog"
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

const materialTheme = extendMaterialTheme()

interface CreateVibeCheckModalProps {
  open: boolean
  handleClose: () => void
}

const CreateVibeCheckModal: React.FC<CreateVibeCheckModalProps> = ({
  openVibeCheck,
  handleCloseVibeCheck,
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

  const handleInputChange = async (
    event: React.ChangeEvent<{}>,
    value: string
  ) => {
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

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create a New VibeCheck</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateVibeCheckModal
