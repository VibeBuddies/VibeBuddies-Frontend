/* Create a LastFM object 
Should be obfuscated but not critical for this project 
since account hold very little personal information
*/
const lastfm_api = {
    apiKey: "e956ffce6c831598099fd47d2dc4a275",
    apiSecret: "b560b97ea325c7ff6cec1792c0c30021",
  };
  
  // Define types for the album information
  interface AlbumInfo {
    name: string;
    artist: string;
    cover_url: string;
  }
  //function to retrieve data from api
  async function searchAlbum(query: string): Promise<AlbumInfo[]> {
    try {
      const res = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${query}&api_key=${lastfm_api.apiKey}&format=json`
      );
  
      // Check if the response is OK
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
  
      const data = await res.json();
  
      // Ensure that data structure exists
      if (
        !data.results ||
        !data.results.albummatches ||
        !data.results.albummatches.album
      ) {
        return []; // Return empty array if no albums found
      }
  
      // Map the albums data
      const albumInfo: AlbumInfo[] = data.results.albummatches.album.map(
        (album: any) => ({
          name: album.name,
          artist: album.artist,
          cover_url: album.image[3]["#text"] || "", // Use a default value if cover URL is not available
        })
      );
  
      console.log(albumInfo);
      return albumInfo;
    } catch (error) {
      throw new Error(
        `Failed to fetch albums: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  }
  
  export { searchAlbum };
  