// types.ts
export interface AutocompleteOption {
    label: string;
    album: SelectedAlbum;
  }
  
  export interface SelectedAlbum {
    name: string;
    artist: string;
    cover_url: string;
  }
  