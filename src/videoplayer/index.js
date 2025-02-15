import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./index.css";
import Cookies from "js-cookie";
import { FaThumbsUp, FaThumbsDown, FaBookmark } from "react-icons/fa";
import ConfigurationContext from "../context";
import { ThreeDots } from "react-loader-spinner";

export default function VideoPlayer() {
  const [isSaved, setIsSaved] = useState(false);
  const [disliked, setDislike] = useState(false);
  const [disLikeList, setDisLikeList] = useState(() => {
    const savedItems = localStorage.getItem("dislikeList");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [liked, setLiked] = useState(false);
  const [likeList, setLikeList] = useState(() => {
    const savedItems = localStorage.getItem("likeList");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const { handleSavedList, mode } = useContext(ConfigurationContext);
  const { id } = useParams();
  const [allData, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const onClickHandleSavedList = () => {
    handleSavedList(allData);
    const savedList = JSON.parse(localStorage.getItem("savedList")) || [];
    const num = location.pathname.split("/").pop();
    const isAlreadySaved = savedList.some((item) => item.id === num);
    setIsSaved(isAlreadySaved);
  };

  const onClickHandleDislikeList = () => {
    const num = location.pathname.split("/").pop();
    const isAlreadyDisliked = disLikeList.some((item) => item.id === num);

    if (isAlreadyDisliked) {
      const updatedDislikeList = disLikeList.filter((item) => item.id !== num);
      setDisLikeList(updatedDislikeList);
      localStorage.setItem("dislikeList", JSON.stringify(updatedDislikeList));
      setDislike(false);
    } else {
      const updatedDislikeList = [...disLikeList, allData];
      setDisLikeList(updatedDislikeList);
      localStorage.setItem("dislikeList", JSON.stringify(updatedDislikeList));
      setDislike(true);

      const updatedLikeList = likeList.filter((item) => item.id !== num);
      setLikeList(updatedLikeList);
      localStorage.setItem("likeList", JSON.stringify(updatedLikeList));
      setLiked(false);
    }
  };

  const onClickHandleLikeList = () => {
    const num = location.pathname.split("/").pop();
    const isAlreadyLiked = likeList.some((item) => item.id === num);

    if (isAlreadyLiked) {
      const updatedLikeList = likeList.filter((item) => item.id !== num);
      setLikeList(updatedLikeList);
      localStorage.setItem("likeList", JSON.stringify(updatedLikeList));
      setLiked(false);
    } else {
      const updatedLikeList = [...likeList, allData];
      setLikeList(updatedLikeList);
      localStorage.setItem("likeList", JSON.stringify(updatedLikeList));
      setLiked(true);

      const updatedDislikeList = disLikeList.filter((item) => item.id !== num);
      setDisLikeList(updatedDislikeList);
      localStorage.setItem("dislikeList", JSON.stringify(updatedDislikeList));
      setDislike(false);
    }
  };

  const fetchData = async () => {
    const cookieToken = Cookies.get("jwt_token");
    setLoading(true);

    try {
      const response = await fetch(`https://apis.ccbp.in/videos/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setData(data.video_details);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("savedList")) || [];
    const disList = JSON.parse(localStorage.getItem("dislikeList")) || [];
    const likeList = JSON.parse(localStorage.getItem("likeList")) || [];

    const num = location.pathname.split("/").pop();
    setIsSaved(savedList.some((item) => item.id === num));
    setDislike(disList.some((item) => item.id === num));
    setLiked(likeList.some((item) => item.id === num));
  }, [location]);

  const videoUrl = allData.video_url;
  const videoId = videoUrl ? videoUrl.split("=")[1] : null;

  return (
    <>
      {!loading ? (
        <div
          className="totalVideo"
          style={
            mode ? { backgroundColor: "#000" } : { backgroundColor: "#fff" }
          }
        >
          <div className="video-player">
            <iframe
              width="600"
              height="400"
              src={videoId ? `https://www.youtube.com/embed/${videoId}` : ""}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div>
              <h2>{allData.title}</h2>
              <div className="media">
                <div className="ViewCount para">
                  <p>{`${allData.view_count} views`}</p>
                  <p>{allData.published_at}</p>
                </div>
                <div className="Liked para">
                  <div
                    className="intenction"
                    onClick={onClickHandleLikeList}
                    style={{ color: liked ? "blue" : "gray" }}
                  >
                    <FaThumbsUp /> <p>Like</p>
                  </div>
                  <div
                    className="intenction"
                    onClick={onClickHandleDislikeList}
                    style={{ color: disliked ? "blue" : "gray" }}
                  >
                    <FaThumbsDown /> <p>Dislike</p>
                  </div>
                  <div
                    className="intenction"
                    onClick={onClickHandleSavedList}
                    style={{ color: isSaved ? "blue" : "gray" }}
                  >
                    <FaBookmark /> <p>{isSaved ? "Saved" : "Save"}</p>
                  </div>
                </div>
              </div>

              {allData.channel && (
                <div className="outer OuterIm">
                  <div className="image">
                    <img
                      data-testid="channel-profile-image"
                      src={allData.channel.profile_image_url}
                      className="profileInVideo"
                      alt="profile_image_url"
                    />
                  </div>
                  <div className="inner">
                    <h3 data-testid="channel-name">{allData.channel.name}</h3>
                    <p
                      data-testid="video-description"
                      className="paragraphInThumb darkPara"
                    >
                      {allData.description}
                    </p>
                    <div className="count paragraphInThumb">
                      <p
                        data-testid="view-count"
                        className="paragraphInThumb "
                      >{`${allData.channel.subscriber_count} Subscribers`}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
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
    </>
  );
}
