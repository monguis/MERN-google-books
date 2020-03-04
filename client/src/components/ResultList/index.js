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

export function ResultListItem(props) {
  return (<li className="list-group-item">{props.children}
    <div className="card">
      <div className="card-body">
        <div className="container p-0">
          <div className="row" style={{position:"relative"}}>
            <blockquote className="blockquote mb-0">
              <p>
                {props.values.volumeInfo.title}
              </p>
              {props.values.volumeInfo.categories ? <footer className="blockquote-footer">
                Categories: <cite title="Source Title">{props.values.volumeInfo.categories}</cite>
              </footer> : <></>}

              <footer className="blockquote-footer">
                Author<cite title="Source Title"> {props.values.volumeInfo.authors.join(", ")}</cite>
              </footer>
            </blockquote>
            <div class="btn-group" style={{position:"absolute", top:0 ,right:0}} role="group"
                        aria-label="Basic example">
                        <button type="button" class="btn btn-secondary">View</button>
                        <button type="button" class="btn btn-success">Add</button>
                    </div>
          </div>
          <div className="row">
            <div className="col-3">
              <img className="img-fluid pt-1" style={{ width: 128, height: 197 }} src={props.values.volumeInfo.imageLinks ? props.values.volumeInfo.imageLinks.thumbnail : "https://www.jstor.org/assets/collection-view_20200205T2342/build/images/cover_not_available.png"} alt />
            </div>
            <div className="col-9">
              <p className="pt-0">{props.values.volumeInfo.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div></li>)

}
