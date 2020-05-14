import React from "react";

const library = ["Songs", "Albums", "Artists"];

const Menu = (props) => {
  return (
    <div className="menu">
      <h5 style={{ color: "#FFD700", marginBottom: "20px" }}>YOUR LIBRARY</h5>
      {library.map((item) => (
        <a key={item} onClick={() => props.onSelect(item)}>
          <span
            style={{
              color: props.selected === item ? "ROYALBLUE" : "white",
            }}
          >
            {item}
          </span>
        </a>
      ))}
    </div>
  );
};

export default Menu;
