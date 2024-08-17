import React, { useEffect, useState } from "react";
import Axios from "axios";
import avatar from "./avatar.png";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [trendingPerson, setTrendingPerson] = useState([]);
  async function getTrending(mediaType, callback) {
    let { data } = await Axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`
    );
    callback(data.results.slice(0, 10));
    console.log(data);
  }
  useEffect(() => {
    getTrending("movie", setTrendingMovies);
    getTrending("tv", setTrendingTV);
    getTrending("person", setTrendingPerson);
  }, []);
  return (
    <>
      <div className="row mt-5">
        <div className="col-md-4 d-flex align-items-center">
          <div className="">
            <div className="brdr w-25 mb-4"></div>
            <h2>
              Trending
              <br />
              Movies <br />
              To Watch Now
            </h2>
            <p className="text-dark">most watched movies by day</p>
            <div className="brdr w-100 mt-4"></div>
          </div>
        </div>
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
      <div className="row mt-5 ">
        <div className="col-md-4 d-flex align-items-center">
          <div className="">
            <div className="brdr w-25 mb-4"></div>
            <h2>
              Trending
              <br />
              TV <br />
              To Watch Now
            </h2>
            <p className="text-dark">most watched TV by day</p>
            <div className="brdr w-100 mt-4"></div>
          </div>
        </div>
        {trendingTV.map((tv, i) => (
          <div key={i} className="col-md-2">
            <div className="tv">
              <Link to={`/tvdetils/${tv.id}`}>
                <img
                  className="w-100"
                  src={"https://image.tmdb.org/t/p/w500" + tv.poster_path}
                  alt=""
                />
                <h3 className="h6 mt-2">{tv.name}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div className="">
            <div className="brdr w-25 mb-4"></div>
            <h2>
              Trending
              <br />
              People <br />
              To Know Now
            </h2>
            <p className="text-dark">most watched people by day</p>
            <div className="brdr w-100 mt-4"></div>
          </div>
        </div>
        {trendingPerson.map((person, i) => (
          <div key={i} className="col-md-2">
            <div className="person">
              {person.profile_path === null ? (
                <img className="avater w-100" src={avatar} alt="" />
              ) : (
                <img
                  className="w-100"
                  src={"https://image.tmdb.org/t/p/w500" + person.profile_path}
                  alt=""
                />
              )}

              <h3 className="h6 mt-2">{person.name}</h3>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
