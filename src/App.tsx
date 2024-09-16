import React, { useState, useEffect } from 'react';
import { DataTable, DataTableStateEvent } from 'primereact/datatable'; // Use DataTableStateEvent
import { RiArrowDropDownLine } from "react-icons/ri";
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './redux/Store';
import { deselectItem, selectItem } from './redux/Actions';
import { fetchData, fetchDataSelection } from './api/fetchArtworks';

interface Artwork {
  id: string;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: string;
  date_end: string;
}

const ArtworksTable = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0); // Total records for pagination
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Track current page
  const [selectAll, setSelectAll] = useState(false);

  const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);
  const dispatch = useDispatch<AppDispatch>();
console.log(selectedItems);
  // Fetch data on component load or page change
  useEffect(() => {
    fetchData(page , setLoading, setArtworks, setTotalRecords);
    console.log(page);
    setSelectAll(false);
  }, [page]);

  // Custom checkbox for each row
  const checkboxTemplate = (rowData: Artwork) => {
    const isChecked = selectedItems.includes(rowData.id);
    return (
      <Checkbox
        checked={isChecked}
        onChange={(e) => {
          if (e.checked) {
            dispatch(selectItem(rowData.id)); // Select item by adding id to global state
          } else {
            dispatch(deselectItem(rowData.id)); // Deselect item by removing id from global state
          }
        }}
        inputId={`checkbox_${rowData.id}`}
      />
    );
  };
  const [selectedArt, setSelectedArt]=useState([])
const handleSelectAcrosspages = async (rows: number) => {
  try {
    // Wait for the fetchDataSelection function to resolve
    const selected = await fetchDataSelection(page, rows);
    if (selected) {
      // Set the selectedArt only when the data is available
      setSelectedArt(selected);
      // Now loop through the selected items and dispatch actions
      selectedArt.forEach((item) => {
        dispatch(selectItem(item.id));
      });
    }
  } catch (error) {
    console.error('Error in handleSelectAcrosspages:', error);
  }
};

const handleMultiSelect = (rows: number) => {
  if (rows <= 12) {
    // Select from the current page if rows are 12 or less
    const array = artworks.slice(0, rows);
    array.forEach((item) => dispatch(selectItem(item.id)));
  } else {
    // Fetch from multiple pages if rows > 12
    handleSelectAcrosspages(rows);
  }
};


  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    const array = artworks.slice(0, 12);
    array.forEach((item) => {
      if (selectAll) {
        dispatch(deselectItem(item.id));
      } else {
        dispatch(selectItem(item.id));
      }
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form's default behavior
    const formElements = e.target as typeof e.target & {
      rows: { value: string };
    };
    const numRows = parseInt(formElements.rows.value); // Parse the input to a number
    if (!isNaN(numRows) && numRows > 0) {
      handleMultiSelect(numRows);
    } else {
      console.error("Invalid number of rows entered");
    }
    setSelectExpanded(false);
  };

  const [selectExpanded, setSelectExpanded] = useState(false);

  const headerTemplate = () => (
    <div className="relative flex items-center justify-center">
      <div className="flex gap-4 items-center">
        <Checkbox
          checked={selectAll}
          onChange={toggleSelectAll}
          inputId="checkbox_SelectAll"
        />
        <div
          onClick={() => setSelectExpanded(!selectExpanded)}
          className="cursor-pointer flex items-center"
        >
          <RiArrowDropDownLine className={`w-6 h-6 transition-transform ${selectExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {selectExpanded && (
        <div className="absolute top-8 left-1 mt-2 bg-white shadow-lg rounded-lg p-2 z-10">
          <form onSubmit={(e) => handleFormSubmit(e)} className="flex flex-col gap-2 items-center text-sm">
            <input
              type="number"
              name="rows"
              placeholder="Enter Rows"
              className="w-24 border rounded-sm px-2 py-1 text-xs placeholder-gray-400"
            />
            <button type="submit" className="bg-blue-500 text-white rounded-md px-2 py-1 text-xs">
              Select Rows
            </button>
          </form>
        </div>
      )}
    </div>
  );

  // Handle pagination using DataTableStateEvent
  const onPage = (event: DataTableStateEvent) => {
  const currentPage = (event.page ?? 0) + 1; // Adjust to match API (page starts from 1)
  setPage(currentPage);
  fetchData(currentPage, setLoading, setArtworks, setTotalRecords);
};


  const rowClass = (rowData: Artwork) => selectedItems.includes(rowData.id) ? 'bg-purple-100/90 text-black' : '';

  return (
    <div className="w-screen h-full bg-white/70">
      <DataTable
        value={artworks}
        paginator
        rows={12}
        rowClassName={rowClass}
        className="w-screen h-screen"
        tableClassName="w-full h-full"
        totalRecords={totalRecords}
        lazy
        loading={loading}
        onPage={onPage} // Now using correct event type
        dataKey="id"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate="Showing {first} to {last}"
      >
        <Column body={checkboxTemplate} header={headerTemplate} className="text-center" />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Place of Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
      </DataTable>
    </div>
  );
};

export default ArtworksTable;