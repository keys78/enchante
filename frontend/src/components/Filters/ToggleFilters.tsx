type FilterProps = {
    title: string;
    selectedFilter: string;
    options: string[];
    handleFilterClick: (value: string) => void;
  };
  
  const ToggleFilters: React.FC<FilterProps> = ({ title, selectedFilter, options, handleFilterClick, }) => (
    <div>
      <h1>{title}</h1>
      <ul>
        <li
          className={selectedFilter === "all" ? "active-hero-text pl-2" : "pl-2 active-hero-text-before cursor-pointer py-2"}
          onClick={() => handleFilterClick("all")}
        >
          All
        </li>
        {options.map((option) => (
          <li
            key={option}
            className={selectedFilter === option ? "active-hero-text pl-2" : "pl-2 active-hero-text-before cursor-pointer py-2"}
            onClick={() => handleFilterClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );

  export default ToggleFilters