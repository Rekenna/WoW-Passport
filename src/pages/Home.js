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
    post: false
  };
  componentDidMount() {
    client
      .getEntry("6O1WJL95aGinX278Vd5ut7")
      .then(response => {
        this.setState({
          post: response
        });
      })
      .catch(console.error);
  }
  render() {
    const { post } = this.state;
    return (
      <div>
        <Banner />
        <Main>
          {post ? <Post post={post} key={post.sys.id} /> : <p>Loading...</p>}
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
