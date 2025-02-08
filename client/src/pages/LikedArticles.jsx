import React from "react";
import { Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const LikedArticles = () => {
  const likedArticles = JSON.parse(localStorage.getItem("likedArticles")) || [];
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <Container>
      <Typography variant="h2" textAlign="center" marginTop={5}>
        Liked Articles
      </Typography>
      
      <Button variant="contained" component={Link} to="/articles-awareness" sx={{ marginTop: 3 }}>
        Back to News
      </Button>

      <Grid container spacing={3} marginTop={2}>
        {likedArticles.length > 0 ? (
          likedArticles.map((article, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{article.title}</Typography>
                  <Button variant="contained" href={article.url} target="_blank">
                    Read Full Article
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h5" textAlign="center">
            No Liked Articles Found
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default LikedArticles;
