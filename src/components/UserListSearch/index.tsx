import React, { useEffect, useState } from "react";
import useDebounce from "../../utils/useDebounce";
import OrderASC from "../svgs/OrderASC";
import OrderDESC from "../svgs/OrderDESC";
import "./styles.css";

interface Props {
  handleSearch: (search: string) => void;
  handleOrderChange: (isOrderASC: boolean) => void;
}

// component with search input and sorting order selection
const UserListSearch = ({ handleOrderChange, handleSearch }: Props) => {
  const [search, setSearch] = useState("");
  const [isOrderASC, setIsOrderASC] = useState(true);

  const debouncedSearch = useDebounce(search, 300);

  const onOrderClick = () => {
    setIsOrderASC((prevValue) => !prevValue);
  };

  useEffect(() => {
    handleOrderChange(isOrderASC);
  }, [isOrderASC]);

  useEffect(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="list_search">
      <input
        placeholder="Search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="order_icon" onClick={onOrderClick}>
        {isOrderASC ? <OrderASC /> : <OrderDESC />}
      </div>
    </div>
  );
};

export default UserListSearch;
