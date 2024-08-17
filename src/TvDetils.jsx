import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const TvDetils = () => {
  let params = useParams();
  let [tvDetils, setTvDetils] = useState([]);

  async function getTvDetils(id) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=f1aca93e54807386df3f6972a5c33b50`
    );
    setTvDetils(data);
  }

  useEffect(() => {
    getTvDetils(params.id);
  });

  return (
    <>
      <div>
        {tvDetils ? (
          <div className="row">
            <div className="col-md-3">
              <img
                className="w-100"
                src={`https://image.tmdb.org/t/p/w500` + tvDetils.poster_path}
                alt=""
              />
            </div>
            <div className="col-md-9">
              <h2>{tvDetils.title}</h2>
              <p className="py-3 ">{tvDetils.overview}</p>
              <ul>
                <li>Budget: {tvDetils.budget}</li>
                <li>Rate: {tvDetils.vote_average}</li>
                <li>Popularity: {tvDetils.popularity}</li>
                <li>vote count: {tvDetils.vote_count}</li>
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
};

export default TvDetils;
