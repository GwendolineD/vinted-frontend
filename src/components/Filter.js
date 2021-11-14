const Filter = ({
  setSearch,
  setPriceMax,
  priceMax,
  setPriceMin,
  priceMin,
  setSort,
  sort,
}) => {
  const handleSort = () => {
    if (sort === "price_asc") {
      setSort("price_desc");
    } else {
      setSort("price_asc");
    }
  };
  return (
    <div>
      <input
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        type="search"
        placeholder="Recherche"
        name=""
        id=""
      />
      <div>
        <span>Trier par prix </span>
        {sort === "price_asc" ? (
          <input onChange={handleSort} type="checkbox" checked />
        ) : (
          <input onChange={handleSort} type="checkbox" />
        )}

        <span className="prixEntre">Prix entre</span>
        <input
          onChange={(event) => {
            setPriceMin(event.target.value);
          }}
          type="number"
          value={priceMin}
        />
        <span>et</span>
        <input
          onChange={(event) => {
            setPriceMax(event.target.value);
          }}
          type="number"
          value={priceMax}
        />
      </div>
    </div>
  );
};

export default Filter;
