import React from "react";
import logo from "../../music.jpg";
import AddPlaylist from "../modals/addplaylist";

const Songs = (props) => {
  const { songList, selected, playlists } = props;

  return (
    <div className="songsList">
      {songList.map((song) => (
        <React.Fragment key={song.id}>
          <div
            id="songCard"
            className="card m-3 overflow"
            style={{
              width: "17em",
              height: "20em",
            }}
          >
            <img src={logo} className="card-img-top logoSongs" alt="" />
            <div id="songCardBody" className="card-body">
              <h6 className="card-title title overflow">
                <i
                  className="fa fa-play-circle"
                  style={{ marginRight: "10px" }}
                  aria-hidden="true"
                ></i>
                {song.title}
              </h6>
              <h6 className="overflow" style={{ color: "#4B0082" }}>
                <i
                  className="fa fa-music"
                  style={{ marginRight: "10px" }}
                  aria-hidden="true"
                ></i>
                {song.album}
              </h6>
              <h6 className="overflow" style={{ color: "#000000" }}>
                <i
                  className="fa fa-user-circle"
                  style={{ marginRight: "10px" }}
                  aria-hidden="true"
                ></i>
                {song.artist}
              </h6>
              {selected === "Songs" ? (
                <AddPlaylist
                  playlists={playlists}
                  songID={song.id}
                  handleSave={props.handlePlaylist}
                />
              ) : null}
            </div>
            <div id="playSong">
              <svg
                className="playSong"
                height="28"
                role="img"
                width="28"
                viewBox="0 0 24 24"
              >
                <polygon
                  points="21.57 12 5.98 3 5.98 21 21.57 12"
                  fill="white"
                ></polygon>
              </svg>
            </div>
            <h6 className="duration">
              <i
                className="fa fa-clock-o"
                style={{ marginRight: "5px", color: "red" }}
                aria-hidden="true"
              ></i>
              {`${song.durEdited.min}:${song.durEdited.sec}`}
            </h6>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Songs;
