// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

/*----------------------- Services Files --------------------------*/
import { getTagsForMenuItem } from "../services/api";
/*------------------------------- CSS Files ------------------------------------*/
import "../static/tag.css";

const TagList = ({ menuItemId }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (menuItemId) {
      getTagsForMenuItem(menuItemId).then((data) => setTags(data));
    }
  }, [menuItemId]);

  if (!tags) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="tag-list" id="tagList">
      {tags.length > 0 && <h5>Tags :</h5>}
      <ul>
        {tags.map((tag) => (
          <li key={tag.id} className="badge bg-secondary">{tag.name}</li>
        ))}
      </ul>
    </div>
  );
};
TagList.propTypes = {
  menuItemId: PropTypes.string.isRequired,
};

export default TagList;

