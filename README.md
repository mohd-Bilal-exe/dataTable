Here’s a sample `README.md` for your project:

---

# Artworks Table

This repository contains the code for an internship assignment at **GrowMeOrganic Pvt Ltd**. The project is a React application featuring a dynamic artworks table, with data fetched from the Art Institute of Chicago API. The application is styled using **PrimeReact** components and supports features like pagination, row selection, and multi-page selection.

## Live Demo
Check out the live version of the project: [Artworks Table](https://artworkstable.netlify.app/)

## Features
- **React & TypeScript**: Built with React and TypeScript for type-safe and scalable development.
- **PrimeReact**: UI components like DataTable, Checkbox, and Pagination are from PrimeReact, providing a sleek and functional design.
- **Redux**: Used for managing the state of selected artworks across the table.
- **API Integration**: Fetches artworks dynamically from the Art Institute of Chicago's API.
- **Pagination**: Supports lazy loading with server-side pagination, fetching only 12 records at a time.
- **Row Selection**: Users can select artworks across multiple pages, with global state management of selected items.
- **Multi-page Selection**: Select multiple artworks beyond the visible page, handled via API calls.

## How It Works
1. **Data Fetching**: The app fetches data from the Art Institute of Chicago API, handling pagination to load artworks dynamically when a user navigates between pages.
2. **Row Selection**: Users can select rows using checkboxes. The selection is handled via Redux, allowing for persistent state across pages.
3. **Multi-select Functionality**: Users can specify a custom number of rows to select across multiple pages. This feature makes use of API requests to fetch and select artworks in bulk.
4. **ESLint**: The project uses an enhanced ESLint configuration, with type-aware rules and the React plugin to maintain code quality and consistency.

## Technologies Used
- **React**: Frontend framework for building the UI.
- **TypeScript**: Ensures type safety and helps prevent bugs.
- **PrimeReact**: Provides the data table, pagination, and UI components.
- **Redux**: State management for selected artworks.
- **Art Institute of Chicago API**: Provides the artworks data.
- **ESLint**: For linting and code quality, with type-checking enabled.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/artworks-table.git
   cd artworks-table
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000` in your browser to view the app locally.

## ESLint Configuration
The ESLint configuration has been expanded to enable type-checking and React-specific rules. Below is a part of the configuration:

```js
import react from 'eslint-plugin-react'

export default tseslint.config({
  settings: { react: { version: '18.3' } },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## License
This project is licensed under the MIT License.

---

Feel free to adjust any details as needed.
