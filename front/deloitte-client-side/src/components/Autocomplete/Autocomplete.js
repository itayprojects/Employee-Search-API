import React, { useState, useEffect, useRef } from "react";
import Suggestion from "../Suggestion/Suggestion";

import style from "./Autocomplete.module.css";
import SearchImage from "../../Image/icons-search.png";

const Autocomplete = (props) => {
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [autoText, setAutoText] = useState("");
  const autocompleteRef = useRef();
  const [highlightData, setHighlightData] = useState([]);

  useEffect(() => {
    const highlightDataHandler = () => {
      const searchText = autoText;
      if (searchText.length > 1) {
        const userHighlightData = [...props.suggestions];
        const textToSearch = searchText.replace(/[.*+?^${}()[\]\\]/g, "\\$&");
        const pattern = new RegExp(`${textToSearch}`, "gi");

        var HighlightDataResult = userHighlightData.map((element) => {
          var newHighlightelement = Object.assign({}, element);

          newHighlightelement.workTitle = newHighlightelement.workTitle.replace(
            pattern,
            (match) => `<mark>${match}</mark>`
          );
          newHighlightelement.name = newHighlightelement.name.replace(
            pattern,
            (match) => `<mark>${match}</mark>`
          );

          return newHighlightelement;
        });

        setHighlightData(HighlightDataResult);
      } else {
        setHighlightData([]);
      }
    };
    highlightDataHandler();
  }, [autoText, props.suggestions]);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target)
      ) {
        setShowSuggestion(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const changeHandler = (e) => {
    var text = e.target.value;
    setAutoText(text);
    if (text.length > 1 || text.length === 0) {
      props.changeSearchValue(text);
    }
  };

  const clickHandler = (id) => {
    if (id.length > 1) {
      const objectText = props.suggestions.filter((s) => s.id === id);
      const text = objectText[0]?.name.trim();
      if (text) {
        setAutoText(text);
        setShowSuggestion(false);
        props.changeSearchValue(text);
      }
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (autoText) {
      props.setSearchResult(true);
      props.UpdateHandler();
    }

    setShowSuggestion(false);
  };
  const onFocusHandler = (e) => {
    e.preventDefault();
    setShowSuggestion(true);
  };
  return (
    <>
      <div className={style["header_search"]}>
        <form ref={autocompleteRef} onSubmit={formSubmitHandler}>
          <span className={style.wrapper}>
            <input
              placeholder="Search"
              value={autoText}
              onChange={changeHandler}
              onFocus={onFocusHandler}
            />
            <button className={style.searchBtn} type="submit">
              <img src={SearchImage} alt="search" />
            </button>
          </span>
          {showSuggestion && (
            <Suggestion
              suggestions={
                highlightData?.length > 0 ? highlightData : props.suggestions
              }
              clickHandler={clickHandler}
            />
          )}
        </form>
      </div>
    </>
  );
};
export default Autocomplete;
