import React, { Component } from "react";
import "./App.css";
import Menu from "./components/menu";
import Playlist from "./components/playlist";
import Container from "./components/container/container";

class App extends Component {
  state = {
    library: "Songs",
    playlist: "",
    playlists: [],
    selectedPlaylist: "",
    selectedSong: "",
    songState: false,
  };

  handleSelect = (selection) => {
    this.setState({
      library: selection,
    });
  };

  handlePlayList = (playlist) => {
    this.setState({
      playlist: playlist,
      library: playlist.name,
    });
  };

  getPlaylist = (playlists) => {
    this.setState({
      playlists: playlists,
    });
  };

  handlePlaylist = (playlist, songID, songState) => {
    // console.log(this, playlist, songID);
    this.setState({
      songState,
      selectedPlaylist: playlist,
      selectedSong: songID,
    });
  };

  clearSongState = () => {
    this.setState({
      songState: false,
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-3 bg-black">
          <h5 className="header">Spotify</h5>
          <Menu onSelect={this.handleSelect} selected={this.state.library} />
          <Playlist
            getPlaylist={this.getPlaylist}
            onSelect={this.handlePlayList}
            clearSongState={this.clearSongState}
            selected={this.state.playlist.title}
            playlist={this.state.selectedPlaylist}
            song={this.state.selectedSong}
            songState={this.state.songState}
          />
        </div>
        <div className="col-md-9 bg-grey">
          <Container
            selected={this.state.library}
            playlist={this.state.playlist}
            allPlaylists={this.state.playlists}
            handlePlaylist={this.handlePlaylist}
          />
        </div>
      </div>
    );
  }
}

export default App;
