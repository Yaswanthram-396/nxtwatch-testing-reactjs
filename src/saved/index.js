import { MdVideoLibrary } from "react-icons/md";
import { useContext, useEffect } from "react";
import "./index.css";

import React from "react";
import { Link } from "react-router-dom";
import ConfigurationContext from "../context";
export default function Saved() {
  const { savedList, mode } = useContext(ConfigurationContext);

  useEffect(() => {
    console.log(savedList);
  }, [savedList]);

  const dark = {
    backgroundColor: "rgb(24,24,24)",
  };
  const light = {
    backgroundColor: "rgb(241,241,241)",
  };

  return (
    <>
      {savedList.length > 0 ? (
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
              <MdVideoLibrary
                title="Saved Videos Icon"
                className="trendingImg"
              />
            </div>
            <h1 className="text-trend">Saved</h1>
          </div>
          {console.log(savedList)}

          <div
            className="ghnj"
            style={mode ? { backgroundColor: "rgb(0,0,0)" } : null}
          >
            {savedList.map((item) => (
              <Link to={`/video/${item.id}`}>
                <div className="BG-container-2" key={item.id}>
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
        </div>
      ) : (
        <div
          className="non-container"
          style={
            !mode ? { backgroundColor: "#FAF9F7" } : { backgroundColor: "#000" }
          }
        >
          <div style={{ display: "contents" }}>
            <div className="non">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png "
                alt="No savied videos"
                className="noSaved"
              />
            </div>
            <h2>No saved videos found</h2>
            <p>You can save your videos while watching them.</p>
          </div>
        </div>
      )}
    </>
  );
}
