import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
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
interface PageEvent {
  page: number;
}
const ArtworksTable = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0); // Total records for pagination
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // Track current page
  const [selectAll, setSelectAll]=useState(false);

  const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);
  const dispatch = useDispatch<AppDispatch>();

  // Fetch data on component load or page change
  useEffect(() => {
    fetchData(page + 1, setLoading, setArtworks, setTotalRecords);
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
const handleMultiSelect = (num: number) => {
    const array = artworks.slice(0, num);
    array.forEach((item) => {
      dispatch(selectItem(item.id));
    });
  };
  const toggleSelectall=()=>{
    setSelectAll(!selectAll);
    if(selectAll){
    const array = artworks.slice(0, 10);
    array.forEach((item) => {
      dispatch(deselectItem(item.id));
    });
    }else{
    const array = artworks.slice(0, 10);
    array.forEach((item) => {
      dispatch(selectItem(item.id));
    });
    }
  }
  const handleFormSubmit = (e: React.FormEvent) => {
  e.preventDefault(); // Prevent form's default behavior
  // Access the form elements to get the number of rows
  const formElements = e.target as typeof e.target & {
    rows: { value: string }; // Value is a string, so we'll convert it to a number
  };
  const numRows = parseInt(formElements.rows.value); // Parse the input to a number
  if (!isNaN(numRows) && numRows > 0) {
    // Call handleMultiSelect with the input value
    handleMultiSelect(numRows);
  } else {
    console.error("Invalid number of rows entered");
  }
  // Collapse the dropdown after submitting
  setSelectExpanded(false);
};
  const [selectExpaned, setSelectExpanded]=useState(false);
  const headerTemplate = () => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="flex gap-4 items-center">
        {/* Main Checkbox for "Select All" */}
        <Checkbox
          checked={selectAll}
          onChange={toggleSelectall}
          inputId="checkbox_SelectAll"
        />

        {/* Icon to expand the multi-select option */}
        <div
          onClick={() => setSelectExpanded(!selectExpaned)}
          className="cursor-pointer flex items-center"
        >
          <RiArrowDropDownLine className={`w-6 h-6 transition-transform ${selectExpaned ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Expandable form for multi-select */}
      {selectExpaned && (
        <div className="absolute top-8 left-1  mt-2 bg-white shadow-lg rounded-lg p-2 z-10">
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className="flex flex-col gap-2 items-center text-sm"
          >
            <input
              type="number"
              name="rows"
              placeholder="Enter Rows"
              className="w-24 border rounded-sm px-2 py-1 text-xs placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-2 py-1 text-xs"
            >
              Select Rows
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
  // Handle pagination
  const onPage = (event: PageEvent) => {
    setPage(event.page);
    fetchData(event.page + 1, setLoading, setArtworks, setTotalRecords);
  };

  // Row class logic for highlight
  const rowClass = (rowData: Artwork) => {
    return selectedItems.includes(rowData.id) ? 'bg-purple-100/90 text-black' : '';
  };

  return (
    <div className="w-screen h-full bg-white/70">
      <DataTable
        value={artworks}
        paginator
        rows={5}
        rowClassName={rowClass}
        className='w-screen h-screen'
        tableClassName='w-full h-full'
        totalRecords={totalRecords}
        lazy
        loading={loading}
        onPage={onPage} 
        dataKey="id"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink  PageLinks NextPageLink LastPageLink "
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
