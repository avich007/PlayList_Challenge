import React from "react";
import logo from "../../artists.png";

const Artists = (props) => {
  const { artistList } = props;

  return (
    <div className="albumList">
      {artistList.map((artist, index) => (
        <React.Fragment key={index}>
          <div
            id="artistCard"
            className="card m-3 overflow"
            style={{
              width: "17em",
              height: "17em",
            }}
          >
            <img src={logo} className="card-img-top logo" alt="" />
            <div className="card-body">
              <h6 style={{ color: "#4B0082" }}>
                <i
                  className="fa fa-user-circle"
                  style={{ marginRight: "10px" }}
                  aria-hidden="true"
                ></i>
                {artist.artist}
              </h6>
              <h6 style={{ color: "#000000" }}>
                <i
                  class="fa fa-eercast"
                  style={{ marginRight: "10px" }}
                  aria-hidden="true"
                ></i>
                {artist.count} Songs
              </h6>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Artists;
