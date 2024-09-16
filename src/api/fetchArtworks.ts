interface Artwork {
  id: string;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: string;
  date_end: string;
}

export default async function fetchData(
  page: number = 1, 
  setLoading: (loading: boolean) => void, // Explicitly setLoading expects a boolean
  setArtworks: (artworks: Artwork[]) => void, // setArtworks expects an array of Artwork objects
  setTotalRecords: (total: number) => void // setTotalRecords expects a number
): Promise<void> { // The function itself returns a Promise that resolves to void
  try {
    setLoading(true); // Set loading to true while fetching data

    const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
    const data = await response.json();

    setArtworks(data.data); // Set the artwork data
    setTotalRecords(data.pagination.total); // Assuming total records are provided in the API response
  } catch (error) {
    console.error('Error fetching data:', error); // Handle any errors during the fetch
  } finally {
    setLoading(false); // Set loading to false once data fetching is complete
  }
}
export async function fetchDataSelection(page: number = 1, rows: number) {
  try {
    const arr: any[] = []; // Proper array initialization
    const totalPages = Math.ceil(rows / 10); // Fetch in chunks of 10

    for (let i = 0; i < totalPages; i++) {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page + i}`);
      const data = await response.json();

      // Extract the data and push it to the array
      arr.push(...data.data); // Using spread to push multiple items
    }

    // Trim the array to the required size
    const slicedArr = arr.slice(0, rows); // Ensure the array is of length `rows`

    return slicedArr; // Return the sliced array
  } catch (error) {
    console.error('Error fetching data:', error); // Handle any errors during the fetch
  }
}