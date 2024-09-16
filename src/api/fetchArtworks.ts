interface Artwork {
  id: string;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: string;
  date_end: string;
}

export async function fetchData(
  page: number = 1, // Set default to 1, as API starts from page 1
  setLoading: (loading: boolean) => void,
  setArtworks: (artworks: Artwork[]) => void,
  setTotalRecords: (total: number) => void
): Promise<void> {
  try {
    setLoading(true);
console.log("fetching page", page)
    const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page+1}`);
    const data = await response.json();

    setArtworks(data.data); // Set artworks from API data
    setTotalRecords(data.pagination.total); // Set total records from API response
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
}

export async function fetchDataSelection(page: number, rows: number) {
  try {
    const arr: any[] = [];
    const rowsPerPage = 12; // API returns 12 items per page
    const totalPagesNeeded = Math.ceil(rows / rowsPerPage); // Calculate total pages required
    console.log(`Fetching ${totalPagesNeeded} pages for ${rows} rows from page ${page}`);

    // Loop through the pages and fetch data
    for (let i = 1; i <= totalPagesNeeded+page; i++) {
      const currentPage = page + i; // Adjust for current page offset
      console.log(`Fetching page ${currentPage}`);
console.log(`while being on  page ${page}`);
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${currentPage}`);
      const data = await response.json();

      // Push data into the array
      arr.push(...data.data);
    }

    // Trim the array to the exact number of rows requested
    const slicedArr = arr.slice(0, rows);
    console.log('Selected items:', slicedArr);
    return slicedArr; // Return the sliced array
  } catch (error) {
    console.error('Error fetching data in fetchDataSelection:', error);
  }
}
