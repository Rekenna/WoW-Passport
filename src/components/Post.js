import React from "react";
import styled from "@emotion/styled";
const showdown = require("showdown"),
  converter = new showdown.Converter();

const Article = styled.article`
  margin-bottom: 2rem;
`;

const Post = ({ post }) => {
  const { fields } = post;
  let raw = converter.makeHtml(post.fields.content);
  return (
    <Article>
      <h2>{fields.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: raw }} />
    </Article>
  );
};

export default Post;
