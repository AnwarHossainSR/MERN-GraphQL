import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";
const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          data &&
          data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POSTS_QUERY = gql`

    query {
      getPosts {
        id
        username
        body
        likeCount
        likes {
          id
          username
          createdAt
        }
        commentCount
        comments {
          id
          username
          body
          createdAt
        }
      }
    }

`;

export default Home;
