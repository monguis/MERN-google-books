import React from "react";
import "./style.css";

// This file exports both the List and ListItem components

export function ResultList({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

export function ResultListItem({ children }) {
  return (<li className="list-group-item">{children}
    <div className="card">
      <div className="card-body">
        <div className="container p-0">
          <div className="row">
            <blockquote className="blockquote mb-0">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
          </p>
              <footer className="blockquote-footer">
                Author<cite title="Source Title">Source Title</cite>
              </footer>
              <footer className="blockquote-footer">
                Author<cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>
          </div>
          <div className="row">
            <div className="col-4">
              <img className="img-fluid pt-1" src="https://picsum.photos/500" alt />
            </div>
            <div className="col-8">
              <p className="pt-0"></p>
            </div>
          </div>
        </div>
      </div>
    </div></li>)

}
