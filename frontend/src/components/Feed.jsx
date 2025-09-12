import React, { useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log("feed data ", res);
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFeed();
  }, []);
  return feed && <UserCard details={feed[0]} />;
};

export default Feed;
