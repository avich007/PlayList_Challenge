import React, { Component } from "react";
import paginate from "../../utils/paginate";
import Pagination from "../pagination";
import axios from "axios";
import Songs from "../main/songs";
import Albums from "../main/albums";
import Artist from "../main/artists";
import { Dropdown, DropdownButton } from "react-bootstrap";

class Container extends Component {
  state = {
    songs: [],
    songList: [],
    albumList: [],
    artistList: [],
    pageSize: 6,
    currentPage: 1,
    selected: "",
    duration: "duration",
  };

  getSongList = (songList) => {
    songList.map((song) => {
      let { duration: durEdited } = song,
        min = Math.floor(durEdited / 60).toString(),
        sec = (durEdited % 60).toString();

      min = min.length < 2 ? `0${min}` : min;
      sec = sec.length < 2 ? `0${sec}` : sec;
      durEdited = {
        min,
        sec,
      };

      return (song.durEdited = durEdited);
    });
    return songList;
  };

  getAlbumList = (songList) => {
    let list = songList.map((song) => {
      return (song = { artist: song.artist, album: song.album });
    });
    const set = new Set(list.map((item) => JSON.stringify(item)));
    list = [...set].map((item) => JSON.parse(item));
    let count;
    list.map((album) => {
      count = 0;
      songList.filter((song) => {
        if (song.album === album.album) {
          count++;
        }
      });
      album.count = count;
      return album;
    });
    return list;
  };

  getArtistList = (songList) => {
    let list = songList.map((song) => {
      return (song = { artist: song.artist });
    });
    const set = new Set(list.map((item) => JSON.stringify(item)));
    list = [...set].map((item) => JSON.parse(item));
    let count;
    list.map((artist) => {
      count = 0;
      songList.filter((song) => {
        if (song.artist === artist.artist) {
          count++;
        }
      });
      artist.count = count;
      return artist;
    });
    return list;
  };

  getPlayList = (songList, playlist) => {
    const songIDs = playlist.songs;
    let list = [];
    if (songIDs) {
      for (let ID in songIDs) {
        list.push(songList.filter((song) => song.id === songIDs[ID])[0]);
      }
    }
    return list;
  };

  handleNext = () => {
    let { currentPage, songList, albumList, artistList, pageSize } = this.state;
    const { selected, playlist: totalPlaylist } = this.props;
    const playlist = this.getPlayList(songList, totalPlaylist);
    const List =
      selected === "Songs"
        ? songList
        : selected === "Albums"
        ? albumList
        : selected === "Artists"
        ? artistList
        : playlist;
    let pageCount = Math.ceil(List.length / pageSize);
    currentPage++;
    if (currentPage <= pageCount) {
      this.setState({ currentPage });
    }
  };

  handlePrev = () => {
    let { currentPage, songList, pageSize, albumList, artistList } = this.state;
    const { selected, playlist: totalPlaylist } = this.props;
    const playlist = this.getPlayList(songList, totalPlaylist);
    const List =
      selected === "Songs"
        ? songList
        : selected === "Albums"
        ? albumList
        : selected === "Artists"
        ? artistList
        : playlist;
    let pageCount = Math.ceil(List.length / pageSize);
    currentPage--;
    if (currentPage <= pageCount && currentPage > 0) {
      this.setState({ currentPage });
    }
  };

  handleDuration(min, max, duration) {
    let { songs } = this.state;
    let list = [...songs];
    if (duration !== "All") {
      let durMin = min * 60,
        durMax = max * 60;
      list = songs.filter(
        (song) => song.duration >= durMin && song.duration <= durMax
      );
    }
    this.setState({
      currentPage: 1,
      songList: list,
      duration,
    });
  }

  async componentDidMount() {
    const { data } = await axios.get("http://localhost:5000/library"),
      songList = this.getSongList(data),
      albumList = this.getAlbumList(data),
      artistList = this.getArtistList(data);
    this.setState({
      songs: songList,
      songList,
      albumList,
      artistList,
      selected: this.props.selected,
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.selected !== state.selected) {
      return {
        currentPage: 1,
        selected: props.selected,
      };
    }
    return null;
  }

  render() {
    const {
      songList: allSongList,
      albumList: allAlbumList,
      artistList: allArtistList,
      currentPage,
      pageSize,
      duration,
    } = this.state;

    const { selected, playlist: totalPlaylist, allPlaylists } = this.props;

    const playlist = this.getPlayList(allSongList, totalPlaylist);

    const totalList =
      selected === "Songs"
        ? allSongList
        : selected === "Albums"
        ? allAlbumList
        : selected === "Artists"
        ? allArtistList
        : playlist;

    const pageCount = Math.ceil(totalList.length / pageSize),
      List = paginate(totalList, currentPage, pageSize);

    return (
      <div className="songsContainer">
        <div className="songsHeader">
          <h3 style={{ color: "#4169E1" }}>
            {selected}({(currentPage - 1) * pageSize + List.length}/
            {totalList.length})
          </h3>
          {selected === "Songs" ? (
            <div id="filterSongs">
              {/* <input
                className="searchBar"
                placeholder="Search Songs"
                type="text"
              ></input> */}
              <DropdownButton
                style={{ display: "inline-block" }}
                id="dropdown-basic-button"
                title={duration}
              >
                <Dropdown.Item
                  onClick={() => this.handleDuration(0, 12, "All")}
                >
                  All
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => this.handleDuration(0, 3, "0~3 minutes")}
                >
                  0~3 minutes
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => this.handleDuration(3, 6, "3~6 minutes")}
                >
                  3~6 minutes
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => this.handleDuration(6, 12, "6~12 minutes")}
                >
                  6~12 minutes
                </Dropdown.Item>
              </DropdownButton>
            </div>
          ) : null}
          <Pagination
            onNext={this.handleNext}
            onPrev={this.handlePrev}
            pageNumber={currentPage}
            pageCount={pageCount}
          />
        </div>

        {selected === "Songs" ? (
          <Songs
            songList={List}
            selected={selected}
            playlists={allPlaylists}
            handlePlaylist={this.props.handlePlaylist}
          />
        ) : selected === "Albums" ? (
          <Albums albumList={List} />
        ) : selected === "Artists" ? (
          <Artist artistList={List} />
        ) : (
          <Songs songList={List} selected={selected} />
        )}
      </div>
    );
  }
}

export default Container;
