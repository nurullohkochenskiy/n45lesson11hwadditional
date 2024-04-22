import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import useStudentsStore from "../store/studentsStore";

const StudentsSearch = ({ filteringItems, setFilteringItems }) => {
  const [search, setSearch] = useState("");
  const { filterStudent } = useStudentsStore();
  useEffect(() => {
    filterStudent(filteringItems);
  }, [filteringItems]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const newFilteringItems = { ...filteringItems, search: e.target.value };
    setFilteringItems(newFilteringItems);
  };

  return (
    <>
      <TextField
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={search}
        onChange={handleSearch}
      />
    </>
  );
};

export default StudentsSearch;
