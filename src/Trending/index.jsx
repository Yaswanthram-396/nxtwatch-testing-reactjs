import { FaHome, FaGamepad, FaFire } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import "./index.css";
import { ThreeDots } from "react-loader-spinner";
import Cookies from "js-cookie";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import ConfigurationContext from "../context";

export default function Trending() {
  const [allData, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const { mode } = useContext(ConfigurationContext);
  const fetchData = async () => {
    const cookieToken = Cookies.get("jwt_token");
    setloading(true);

    try {
      const response = await fetch("https://apis.ccbp.in/videos/trending", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setData(data.videos);

      setloading(false);
    } catch (error) {
      console.log("CATCH EXICUTED");
      console.error("Error fetching data:", error.message);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dark = {
    backgroundColor: "rgb(24,24,24)",
  };
  const light = {
    backgroundColor: "rgb(241,241,241)",
  };

  return (
    <>
      <div className="trendingVIdeos">
        <div className="tendingIcon" style={mode ? dark : light}>
          <div
            className="iconback"
            style={
              mode
                ? { backgroundColor: "rgb(15,15,15)" }
                : { backgroundColor: "rgb(224, 233, 240)" }
            }
          >
            <FaFire title="Trending Icon" className="trendingImg" />
          </div>
          <h1 className="text-trend">Trending</h1>
        </div>
        {!loading ? (
          allData.length > 0 && (
            <div
              className="ghnj"
              style={mode ? { backgroundColor: "rgb(0,0,0)" } : null}
            >
              {allData.map((item) => (
                <Link to={`/video/${item.id}`}>
                  <div className="BG-container-2">
                    <img
                      src={item.thumbnail_url}
                      alt="thumbnail_url"
                      className="Video_photo"
                    />
                    <div className="outer">
                      <div className="inner">
                        <h1 className="heading changeHead">{item.title}</h1>
                        <p className="paragraphInThumb">{item.channel.name}</p>
                        <div className="count paragraphInThumb">
                          <p>{`${item.view_count} Views`}</p>
                          <p>{item.published_at}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )
        ) : (
          <div className="loader-container" data-testid="loader">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="blue"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        )}
      </div>
    </>
  );
}
