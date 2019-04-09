import React, { Component } from "react";
import Banner from "../components/Banner";
import styled from "@emotion/styled";
import { withTheme } from "emotion-theming";
import { client } from "../util/client";
import Post from "../components/Post";

const Main = styled.div`
  max-width: 720px;
  margin: 2rem auto;
  padding: 0 1rem;
  color: ${props => props.theme.colors.black};
`;

const Footer = styled.div`
  text-align: center;
  padding: 2rem;
`;

class Home extends Component {
  state = {
    posts: []
  };
  componentDidMount() {
    client
      .getEntries({
        order: "-sys.createdAt",
        content_type: "post",
        "fields.relatedProject.sys.contentType.sys.id": "project",
        "fields.relatedProject.fields.title[match]": "WoW Passport"
      })
      .then(response => {
        this.setState({
          posts: response.items
        });
      })
      .catch(console.error);
  }
  render() {
    const { posts } = this.state;
    return (
      <div>
        <Banner />
        <Main>
          {posts.map(post => (
            <Post post={post} key={post.sys.id} />
          ))}
        </Main>
        <Footer>
          <a
            href="https://www.ryanmckenna.io/"
            rel="noopener noreferrer"
            target="_blank"
          >
            ryanmckenna.io
          </a>
        </Footer>
      </div>
    );
  }
}
export default withTheme(Home);
