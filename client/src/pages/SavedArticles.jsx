import React from "react";
import { Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";



const SavedArticles = () => {
  const savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];

  return (
    <Container>
      <Typography variant="h2" textAlign="center" marginTop={5}>
        Saved Articles
      </Typography>
      
      <Button variant="contained" component={Link} to="/articles-awareness" sx={{ marginTop: 3 }}>
        Back to News
      </Button>

      <Grid container spacing={3} marginTop={2}>
        {savedArticles.length > 0 ? (
          savedArticles.map((article, index) => (
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
            No Saved Articles Found
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default SavedArticles;