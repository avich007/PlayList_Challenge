import React from "react";

const Pagination = (props) => {
  const { onNext, onPrev, pageNumber, pageCount } = props;
  if (pageCount <= 1) {
    return null;
  }
  console.log(pageCount);
  return (
    <div
      id="pagination"
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        margin: "20px",
      }}
    >
      <button
        className="btn btn-secondary btn-sm m-1 shadow-none"
        onClick={onPrev}
      >
        <i className="fa fa-arrow-left" aria-hidden="true"></i>
      </button>
      <span className="badge badge-info" style={{ fontSize: "20px" }}>
        {pageNumber}
      </span>
      <button
        className="btn btn-secondary btn-sm m-1 shadow-none"
        onClick={onNext}
      >
        <i className="fa fa-arrow-right" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default Pagination;
