import { useParams } from "react-router-dom";

const SearchBar = ({ onSearchChange, onFilterChange, onTypeChange, onSortChange }) => {
  const { companyName } = useParams();

  return (
    <div className='search-bar-container' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', flex: 1 }}
      />
      <div className="options" style={{ marginLeft: '10px' }}>
        <select  onChange={(e) => onFilterChange(e.target.value)} style={{ padding: '10px', fontSize: '16px' }}>
          <option value="">ALL</option>
          <option value="HP">HP</option>
          <option value="LENOVO">LENOVO</option>
          <option value="ACER">APPLE</option>
          <option value="DELL">DELL</option>
        </select>

        <select  onChange={(e) => onTypeChange(e.target.value)} style={{ padding: '10px', fontSize: '16px' }}>
          <option value="">ALL</option>
          <option value="Laptop">Laptops</option>
          <option value="Touch">Touch Models</option>
          <option value="Other">Other Models</option>
          <option value="Desktop">Desktop Computers</option>
          <option value="Graphics">Graphics and Gaming</option>
        </select>
        <select onChange={(e) => onSortChange(e.target.value)} style={{ padding: '10px', fontSize: '16px', marginLeft: '10px' }}>
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
