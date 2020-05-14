import React, { Component } from "react";
import axios from "axios";
import Pagination from "./pagination";
import paginate from "../utils/paginate";
import CreatePlaylist from "./modals/createplaylist";

class Playlist extends Component {
  state = {
    playlists: [],
    pageSize: 6,
    currentPage: 1,
    lenPlaylist: 0,
    status: "",
  };

  async componentDidMount() {
    const { data: playlists } = await axios.get(
      "http://localhost:5000/playlist"
    );
    const lenPlaylist = playlists.length;
    this.setState({
      playlists,
      lenPlaylist,
    });
    this.props.getPlaylist(playlists);
  }

  handleNext = () => {
    let { currentPage, playlists, pageSize } = this.state;
    let pageCount = Math.ceil(playlists.length / pageSize);
    currentPage++;
    if (currentPage <= pageCount) {
      this.setState({ currentPage });
    }
  };

  handlePrev = () => {
    let { currentPage, playlists, pageSize } = this.state;
    let pageCount = Math.ceil(playlists.length / pageSize);
    currentPage--;
    if (currentPage <= pageCount && currentPage > 0) {
      this.setState({ currentPage });
    }
  };

  handlePlaylist = async (playlist) => {
    const { playlists } = this.state;

    if (playlist === "") {
      alert("Oops, Playlist cannot be Empty!!");
    } else {
      alert("New Playlist created");
      playlists.push({
        id: playlists.length,
        name: playlist,
        songs: [],
      });
      this.setState({
        playlists,
        lenPlaylist: playlists.length,
      });
    }
  };

  componentDidUpdate() {
    let { playlists } = this.state;
    const { playlist, song, songState, clearSongState } = this.props;
    if (songState) {
      playlists = playlists.map((list) => {
        if (list.name === playlist) {
          if (!list.songs.includes(song)) {
            alert("Song Added Successfully");
            list.songs.push(song);
          } else {
            alert("Song already exist in the selected playlist");
          }
        }
        return list;
      });
      clearSongState();
      return { playlists };
    } else {
      return null;
    }
  }

  render() {
    const {
      playlists: allPlaylists,
      pageSize,
      currentPage,
      lenPlaylist,
    } = this.state;

    const pageCount = Math.ceil(allPlaylists.length / pageSize);

    const playlists = paginate(allPlaylists, currentPage, pageSize);

    return (
      <div className="playList">
        <CreatePlaylist handleSave={this.handlePlaylist} />
        <h5
          style={{
            color: "#FFD700",
            marginBottom: "20px",
          }}
        >
          PLAYLISTS ({(currentPage - 1) * 6 + playlists.length}/{lenPlaylist})
        </h5>
        {playlists.map((list) => (
          <a key={list.id} onClick={() => this.props.onSelect(list)}>
            <span>{list.name}</span>
          </a>
        ))}
        <Pagination
          onNext={this.handleNext}
          onPrev={this.handlePrev}
          pageNumber={currentPage}
          pageCount={pageCount}
        />
      </div>
    );
  }
}

export default Playlist;
