import React from "react";
import style from "./Suggestion.module.css";
import AvatarImage01 from "../../Image/avatar-1.png";
import AvatarImage02 from "../../Image/avatar-2.png";
import AvatarImage03 from "../../Image/avatar-3.png";
import AvatarImage04 from "../../Image/avatar-4.png";
import AvatarImage05 from "../../Image/avatar-5.png";
import AvatarImage06 from "../../Image/avatar-6.png";
import AvatarImage07 from "../../Image/avatar-7.png";
import AvatarImage08 from "../../Image/avatar-8.png";
import AvatarImage09 from "../../Image/avatar-9.png";
import AvatarImage10 from "../../Image/avatar-10.png";

const Autocomplete = (props) => {
  const avatarImg = {
    1: AvatarImage01,
    2: AvatarImage02,
    3: AvatarImage03,
    4: AvatarImage04,
    5: AvatarImage05,
    6: AvatarImage06,
    7: AvatarImage07,
    8: AvatarImage08,
    9: AvatarImage09,
    10: AvatarImage10,
  };

  return (
    <div className={`${style[props.className]} ${style["search-engine-box"]}`}>
      <div className={`${style[props.className]} ${style["flex-box-wrap"]}`}>
        <div className={style["search-engine-articles"]}>
          <ul
            className={`${style[props.className]} ${
              style["search-engine-articles-list"]
            }`}
          >
            {props.suggestions && props.suggestions.length ? (
              props.suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={
                    props.clickHandler
                      ? () => props.clickHandler(suggestion.id)
                      : null
                  }
                >
                  <div className={style["worker-imag"]}>
                    <img
                      src={avatarImg[parseInt(suggestion.imageUrl, 10)]}
                      alt="search"
                    />
                  </div>
                  <div
                    className={style.info}
                    dangerouslySetInnerHTML={{
                      __html: `<h5>${suggestion.name}</h5> <span>${suggestion.workTitle}</span>`,
                    }}
                  >
                    {/* <h5>{suggestion.name}</h5>
                    <span>{suggestion.workTitle}</span> */}
                  </div>
                </li>
              ))
            ) : (
              <li>
                <div className={style["error-info"]}>
                  <h5>No Results Found</h5>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Autocomplete;
