import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import Autocomplete from "./components/Autocomplete/Autocomplete";
import SearchResult from "./components/SearchResult/SearchResult";
function App() {
  const [searchVal, setSearchVal] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [dataResult, setDataResult] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      Axios.get(`https://localhost:7255/api/Employee/search?q=${searchVal}`)
        .then((res) => {
          setDataUser(res.data);
        })
        .catch((err) => {
          setDataUser([]);
          // console.log(err);
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            // console.log(err.response.headers);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log("Error", err.message);
          }
        });
    };
    fetchData();
  }, [searchVal]);

  const DataResultUpdateHandler = () => {
    setDataResult(dataUser);
  };

  return (
    <div className="container">
      {/* <div className="wrap-container">
        {searchResult && (
          <>
            <h1>SEARCH RESULTS</h1>
            <span>.</span>
          </>
        )}
        {!searchResult && (
          <>
            <h1>LOOKING FOR AN EMPLOYEE?</h1>
            <span>Click on search bar to learn our suggestions</span>
          </>
        )}
      </div> */}
      {searchResult && (
        <>
          <h1>SEARCH RESULTS</h1>
          <span></span>
        </>
      )}
      {!searchResult && (
        <>
          <h1>LOOKING FOR AN EMPLOYEE?</h1>
          <span>Click on search bar to learn our suggestions</span>
        </>
      )}
      <Autocomplete
        changeSearchValue={setSearchVal}
        suggestions={dataUser}
        setSearchResult={setSearchResult}
        UpdateHandler={DataResultUpdateHandler}
      />
      {searchResult && (
        <SearchResult
          changeSearchValue={setSearchVal}
          suggestions={dataResult}
        />
      )}
    </div>
  );
}

export default App;
