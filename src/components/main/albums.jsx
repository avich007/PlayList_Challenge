import React from "react";
import logo from "../../album.jpg";

const Albums = (props) => {
  const { albumList } = props;
  return (
    <div className="albumList">
      {albumList.map((album, index) => (
        <React.Fragment key={index}>
          <div
            id="albumCard"
            className="card m-3 overflow"
            style={{
              width: "17em",
              height: "19em",
            }}
          >
            <img src={logo} className="card-img-top logo" alt="" />
            <div className="card-body">
              <h6 className="album overflow">
                <i
                  className="fa fa-music"
                  aria-hidden="true"
                  style={{ marginRight: "10px" }}
                ></i>
                {album.album}
              </h6>
              <h6 className="overflow" style={{ color: "#4B0082" }}>
                <i
                  className="fa fa-user-circle"
                  style={{ marginRight: "10px" }}
                  aria-hidden="true"
                ></i>
                {album.artist}
              </h6>
              <h6 className="overflow" style={{ color: "#000000" }}>
                <i
                  className="fa fa-eercast"
                  style={{ marginRight: "10px" }}
                  aria-hidden="true"
                ></i>
                {album.count} Songs
              </h6>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Albums;
