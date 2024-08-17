import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetils() {
  let params = useParams();
  let [movieDetils, setMovieDetils] = useState([]);

  async function getMovieDetils(id) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=f1aca93e54807386df3f6972a5c33b50`
    );
    setMovieDetils(data);
  }

  useEffect(() => {
    getMovieDetils(params.id);
  });

  return (
    <>
      <div>
        {movieDetils ? (
          <div className="row">
            <div className="col-md-3">
              <img
                className="w-100"
                src={
                  `https://image.tmdb.org/t/p/w500` + movieDetils.poster_path
                }
                alt=""
              />
            </div>
            <div className="col-md-9">
              <h2>{movieDetils.title}</h2>
              <p className="py-3 ">{movieDetils.overview}</p>
              <ul>
                <li>Budget: {movieDetils.budget}</li>
                <li>Rate: {movieDetils.vote_average}</li>
                <li>Popularity: {movieDetils.popularity}</li>
                <li>vote count: {movieDetils.vote_count}</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="vh-100 d-flex align-items-center justify-content-center">
            <i className="fas fa-spinner fa-spin "></i>
          </div>
        )}
      </div>
    </>
  );
}
