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
        <select  onChange={(e) => onFilterChange(e.target.value)} style={{ padding: '10px', fontSize: '16px' }} >
          <option value="">ALL</option>
          <option value="HP">HP</option>
          <option value="LENOVO">LENOVO</option>
          <option value="APPLE">APPLE</option>
          <option value="DELL">DELL</option>
          <option value="AMD">AMD</option>
          <option value="Intel">INTEL</option>
          <option value="Samsung">Samsung</option>
          <option value="NVIDIA">NVIDIA</option>
        </select>

        <select  onChange={(e) => onTypeChange(e.target.value)} style={{ padding: '10px', fontSize: '16px' }}>
          <option value="">ALL</option>
          <option value="Laptop">Laptop</option>
          <option value="Processor">Processor</option>
          <option value="Graphics Card">Graphics Card</option>
          <option value="NAS Storage">NAS Storage</option>
          <option value="MotherBoard">MotherBoard</option>
          <option value="RAM">RAM</option>
          <option value="Hard Disk">Hard Disk</option>
          <option value="Keyboard">Keyboard</option>
          <option value="Server">Server</option>
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
