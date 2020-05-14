import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class CreatePlaylist extends Component {
  state = { show: false, playlist: "" };
  handleModal = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  handleText = (e) => {
    this.setState({
      playlist: e.target.value,
    });
  };
  handleSave = () => {
    const { playlist } = this.state;
    playlist === ""
      ? alert("Oops, Cannot Create an empty Playlist !!")
      : this.sendPlaylist(playlist);
  };

  sendPlaylist = (playlist) => {
    this.props.handleSave(playlist);
    this.setState({
      playlist: "",
      show: !this.state.show,
    });
  };

  render() {
    const { show, playlist } = this.state;
    return (
      <React.Fragment>
        <div className="divPlayList">
          <button onClick={this.handleModal} className="btnPlayList">
            <i
              className="fa fa-plus"
              style={{ fontSize: "20px" }}
              aria-hidden="true"
            ></i>
          </button>
          <h5 className="m-2">Create Playlist</h5>
        </div>
        <Modal show={show}>
          <Modal.Header closeButton>
            <Modal.Title>Name the Playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              onChange={this.handleText}
              className="form-control"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModal}>
              Close
            </Button>
            <Button
              variant="success"
              onClick={() => {
                this.props.handleSave(playlist);
                this.handleModal();
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CreatePlaylist;
