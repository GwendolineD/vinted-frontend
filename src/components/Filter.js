const Filter = ({
  setSearch,
  setPriceMax,
  priceMax,
  setPriceMin,
  priceMin,
  setSort,
  sort,
}) => {
  return (
    <div className="headerElement">
      <input
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        type="search"
        placeholder="Recherche"
        name=""
        id=""
      />

      <div className="toggleAndText">
        <span>Trier par prix </span>
        <label className="toggleSwitch">
          <input
            onChange={() => {
              setSort(!sort);
            }}
            type="checkbox"
            checked={sort}
          />
          <span className="switch" />
        </label>

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
