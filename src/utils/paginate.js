import _ from "lodash";

export default function paginate(playlists, currentPage, pageSize) {
  const startIndex = (currentPage - 1) * pageSize;
  playlists = _(playlists).slice(startIndex).take(pageSize).value();
  return playlists;
}
