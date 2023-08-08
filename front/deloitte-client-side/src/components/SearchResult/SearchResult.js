import React from "react";
import Suggestion from "../Suggestion/Suggestion";
import style from "./SearchResult.module.css";

const SearchResult = (props) => {
  return (
    <>
      <div className={style["header_result"]}>
        <form>
          <Suggestion
            className={"result-engine"}
            suggestions={props.suggestions}
          />
        </form>
      </div>
    </>
  );
};
export default SearchResult;
