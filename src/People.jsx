import React, { useEffect, useState } from "react";
import Axios from "axios";
import avatar from "./avatar.png";

export default function People() {
  const [trendingPerson, setTrendingPerson] = useState([]);

  let nums = new Array(13).fill(1).map((elem, index) => index + 1);

  async function getTrending(pageNumber) {
    let { data } = await Axios.get(
      ` https://api.themoviedb.org/3/person/popular?api_key=f1aca93e54807386df3f6972a5c33b50&page=${pageNumber}`
    );
    setTrendingPerson(data.results);
  }
  useEffect(() => {
    getTrending(1);
  });

  return (
    <div>
      <div className="row py-5">
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

// https://api.themoviedb.org/3/discover/person?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&sort_by=popularity.desc&include_adult=false&page=1
