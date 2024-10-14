import React from "react";
import { Autocomplete, FormControl, FormLabel, Box } from "@mui/joy";
import { AutocompleteOption, SelectedAlbum } from '../../types';


interface AlbumOrArtistProps {
  options: AutocompleteOption[];
  selectedAlbum: SelectedAlbum | null;
  handleInputChange: (event: React.ChangeEvent<{}>, value: string) => void;
  handleAlbumSelect: (
    event: React.SyntheticEvent,
    newValue: AutocompleteOption | null
  ) => void;
}

const AlbumOrArtist: React.FC<AlbumOrArtistProps> = ({
  options,
  selectedAlbum,
  handleInputChange,
  handleAlbumSelect,
}) => {
  return (
    <FormControl>
      <FormLabel>Album or Artist name</FormLabel>
      <Autocomplete
        options={options}
        onInputChange={handleInputChange}
        onChange={handleAlbumSelect}
      />
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
    </FormControl>
  );
};

export default AlbumOrArtist;
