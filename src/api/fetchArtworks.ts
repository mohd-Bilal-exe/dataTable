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
export async function fetchDataSelection(page: number, rows: number): Promise<Artwork[]> { // Define return type as Artwork[]
  try {
    const arr: Artwork[] = []; // Define array type explicitly as Artwork[]
    const rowsPerPage = 12;
    const totalPagesNeeded = Math.ceil(rows / rowsPerPage);
    console.log(`Fetching ${totalPagesNeeded} pages for ${rows} rows from page ${page}`);

    for (let i = 1; i <= totalPagesNeeded + page; i++) {
      const currentPage = page + i;
      console.log(`Fetching page ${currentPage}`);
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${currentPage}`);
      const data = await response.json();

      arr.push(...data.data);
    }

    const slicedArr = arr.slice(0, rows);
    console.log('Selected items:', slicedArr);
    return slicedArr; // Return the correctly typed array
  } catch (error) {
    console.error('Error fetching data in fetchDataSelection:', error);
    return []; // Return an empty array in case of error
  }
}
