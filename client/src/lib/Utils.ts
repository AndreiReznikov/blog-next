export const truncate = (string, lettersNum) =>
  string?.length > lettersNum ? string?.slice(0, lettersNum - 1) + "…" : string;
