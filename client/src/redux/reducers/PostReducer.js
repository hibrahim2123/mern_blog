import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from "../constants";

export default (posts = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ALL:
      return payload;
    case LIKE:
      return posts.map((post) => (post._id === payload._id ? payload : post));
    case CREATE:
      return [...posts, payload];
    case UPDATE:
      return posts.map((post) => (post._id === payload._id ? payload : post));
    case DELETE:
      return posts.filter((post) => post._id !== payload._id);
    default:
      return posts;
  }
};
