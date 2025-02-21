export const decodeImageUrl = (url) => {
  if (!url) return null;

  try {
    const decodedUrl = decodeURIComponent(url);
    return `https://d1up383l0okfvw.cloudfront.net/${decodedUrl}`;
  } catch {
    return `https://d1up383l0okfvw.cloudfront.net/${url}`;
  }
};