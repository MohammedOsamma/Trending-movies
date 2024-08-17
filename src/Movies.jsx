import React, { useEffect, useState } from "react";
import Axios from "axios";
// import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function Movies() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  let nums = new Array(13).fill(1).map((elem, index) => index + 1);

  async function getTrending(pageNumber) {
    let { data } = await Axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`
    );
    setTrendingMovies(data.results);
  }

  useEffect(() => {
    getTrending(1);
  }, []);

  return (
    <div>
      <div className="row justify-content-center">
        {trendingMovies.map((movie, i) => (
          <div key={i} className="col-md-2">
            <div className="movie">
              <Link to={`/moviedetils/${movie.id}`}>
                <img
                  className="w-100"
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                  alt=""
                />
                <h3 className="h6 mt-2">{movie.title}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <nav aria-label="..." className="py-5">
        <ul className="pagination pagination-sm d-flex justify-content-center">
          {nums.map((pageNum) => (
            <li
              key={pageNum}
              className="page-item"
              onClick={() => getTrending(pageNum)}
            >
              <a className="page-link bg-transparent text-white ">{pageNum}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
