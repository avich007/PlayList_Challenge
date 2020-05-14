import React, { Component } from "react";
import { Button, Modal, DropdownButton, Dropdown } from "react-bootstrap";

class AddPlaylist extends Component {
  state = { show: false, playlist: "", DD: "Select Playlist" };

  handleModal = () => {
    this.setState({
      show: !this.state.show,
      DD: "Select Playlist",
    });
  };

  handleDD(value) {
    this.setState({
      playlist: value,
      DD: value,
    });
  }

  render() {
    const { show, playlist, DD } = this.state;
    const { playlists, songID } = this.props,
      songState = true;
    return (
      <React.Fragment>
        <div className="divAddtoPlaylist">
          <button
            onClick={this.handleModal}
            className="btnAddtoPlaylist shadow-none"
          >
            <i
              className="fa fa-plus"
              style={{ fontSize: "20px" }}
              aria-hidden="true"
            ></i>
          </button>
        </div>
        <Modal show={show}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center">
            <DropdownButton id="dropdown-basic-button" title={DD}>
              {playlists.map((list) => (
                <Dropdown.Item
                  onClick={() => this.handleDD(list.name)}
                  key={list.id}
                >
                  {list.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModal}>
              Close
            </Button>
            <Button
              variant="success"
              onClick={() => {
                this.props.handleSave(playlist, songID, songState);
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

export default AddPlaylist;
