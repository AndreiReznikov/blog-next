import { truncate } from "@/lib/Utils";

export const getNotificationText = (notification) => {
  const {
    type = "UNKNOWN",
    articleId = "unknown-article",
    authorName = "Unknown author",
    comment = "",
  } = notification || {};

  const truncatedComment = truncate(comment, 100);
  const baseText = `"${truncatedComment}" by ${authorName} on article ${articleId}`;

  switch (type.toUpperCase()) {
    case "ADD":
      return `New comment: ${baseText}`;
    case "DELETE":
      return `Comment removed: ${baseText}`;
    default:
      return `Unknown notification (${type}) for article ${articleId}`;
  }
};
