import React from "react";

const renderList = (props) => {
  return this.props.todos.map((list) => {
    return (
      <div className="item" key={list.id}>
        <div className="content">{list}</div>
      </div>
    );
  });
};

export default renderList;
