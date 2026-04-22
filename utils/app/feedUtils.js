export const isPostLiked = (likedPostIds, postId) => {
  return likedPostIds.includes(postId);
};

export const getPostKey = item => {
  return item.id.toString();
};
