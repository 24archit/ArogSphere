// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   CircularProgress,
//   Button,
//   IconButton,
//   Collapse,
// } from "@mui/material";
// import { Box } from "@mui/system";
// import ShareIcon from "@mui/icons-material/Share";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { Link } from "react-router-dom"; // Import Link for navigation

// const HealthArticles = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [likedArticles, setLikedArticles] = useState(
//     JSON.parse(localStorage.getItem("likedArticles")) || []
//   );
//   const [savedArticles, setSavedArticles] = useState(
//     JSON.parse(localStorage.getItem("savedArticles")) || []
//   );
//   const [expanded, setExpanded] = useState({});

//   useEffect(() => {
//     fetchHealthNews();
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("likedArticles", JSON.stringify(likedArticles));
//   }, [likedArticles]);

//   useEffect(() => {
//     localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
//   }, [savedArticles]);

//   const fetchHealthNews = async () => {
//     const apiKey = "da23b48ecb7241588c000b28f98b6f93";
//     const url = `https://newsapi.org/v2/top-headlines?category=health&apiKey=${apiKey}`;
//     try {
//       const response = await fetch(url);
//       if (!response.ok) throw new Error("Failed to fetch news.");
//       const data = await response.json();
//       setArticles(data.articles);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleLikeArticle = (article) => {
//     setLikedArticles((prev) =>
//       prev.some((item) => item.title === article.title)
//         ? prev.filter((item) => item.title !== article.title)
//         : [...prev, article]
//     );
//   };

//   const toggleSaveArticle = (article) => {
//     setSavedArticles((prev) =>
//       prev.some((item) => item.title === article.title)
//         ? prev.filter((item) => item.title !== article.title)
//         : [...prev, article]
//     );
//   };

//   return (
//     <Container>
//       <Typography variant="h2" textAlign="center" marginTop={8}>
//         Latest Health News & Articles
//       </Typography>

//       {/* Navigation to Liked & Saved Pages */}
//       <Box display="flex" justifyContent="center" gap={2} marginY={3}>
//         <Button variant="contained" component={Link} to="/liked-articles">
//           View Liked Articles
//         </Button>
//         <Button variant="contained" component={Link} to="/saved-articles">
//           View Saved Articles
//         </Button>
//       </Box>

//       {/* News Articles */}
//       <Grid container spacing={4} marginTop={2}>
//         {articles.map((article, index) => (
//           <Grid item xs={12} key={index}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 image={article.urlToImage || "https://via.placeholder.com/200"}
//                 alt={article.title}
//                 sx={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
//               />
//               <CardContent>
//                 <Typography variant="h6">{article.title}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {article.description || "No description available."}
//                 </Typography>

//                 {/* Buttons */}
//                 <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
//                   <Button variant="contained" href={article.url} target="_blank">
//                     Read Full Article
//                   </Button>
//                   <IconButton
//                     color={
//                       likedArticles.some((item) => item.title === article.title)
//                         ? "secondary"
//                         : "primary"
//                     }
//                     onClick={() => toggleLikeArticle(article)}
//                   >
//                     <ThumbUpIcon />
//                   </IconButton>
//                   <IconButton
//                     color={
//                       savedArticles.some((item) => item.title === article.title)
//                         ? "secondary"
//                         : "primary"
//                     }
//                     onClick={() => toggleSaveArticle(article)}
//                   >
//                     <BookmarkIcon />
//                   </IconButton>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default HealthArticles;


import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Link } from "react-router-dom";

const HealthArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedArticles, setLikedArticles] = useState(
    JSON.parse(localStorage.getItem("likedArticles")) || []
  );
  const [savedArticles, setSavedArticles] = useState(
    JSON.parse(localStorage.getItem("savedArticles")) || []
  );

  useEffect(() => {
    fetchHealthNews();
  }, []);

  useEffect(() => {
    localStorage.setItem("likedArticles", JSON.stringify(likedArticles));
  }, [likedArticles]);

  useEffect(() => {
    localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
  }, [savedArticles]);

  const fetchHealthNews = async () => {
    const apiKey = "da23b48ecb7241588c000b28f98b6f93";
    const url = `https://newsapi.org/v2/top-headlines?category=health&apiKey=${apiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch news.");
      const data = await response.json();
      setArticles(data.articles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleLikeArticle = (article) => {
    setLikedArticles((prev) =>
      prev.some((item) => item.title === article.title)
        ? prev.filter((item) => item.title !== article.title)
        : [...prev, article]
    );
  };

  const toggleSaveArticle = (article) => {
    setSavedArticles((prev) =>
      prev.some((item) => item.title === article.title)
        ? prev.filter((item) => item.title !== article.title)
        : [...prev, article]
    );
  };

  return (
    <Container>
      <Typography variant="h2" textAlign="center" marginTop={8}>
        Latest Health News & Articles
      </Typography>

      {/* Navigation to Liked & Saved Pages */}
      <Box display="flex" justifyContent="center" gap={2} marginY={3}>
        <Button variant="contained" component={Link} to="/liked-articles">
          View Liked Articles
        </Button>
        <Button variant="contained" component={Link} to="/saved-articles">
          View Saved Articles
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      ) : (
        <Grid container spacing={4} marginTop={2}>
          {articles.map((article, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  image={article.urlToImage || "https://via.placeholder.com/200"}
                  alt={article.title}
                  sx={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6">{article.title}</Typography>

                  {/* Author and Published Date */}
                  <Typography variant="body2" color="text.secondary">
                    By {article.author || "Unknown"} |{" "}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" marginTop={1}>
                    {article.description || "No description available."}
                  </Typography>

                  {/* Buttons */}
                  <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
                    <Button variant="contained" href={article.url} target="_blank">
                      Read Full Article
                    </Button>
                    <IconButton
                      color={
                        likedArticles.some((item) => item.title === article.title)
                          ? "secondary"
                          : "primary"
                      }
                      onClick={() => toggleLikeArticle(article)}
                    >
                      <ThumbUpIcon />
                    </IconButton>
                    <IconButton
                      color={
                        savedArticles.some((item) => item.title === article.title)
                          ? "secondary"
                          : "primary"
                      }
                      onClick={() => toggleSaveArticle(article)}
                    >
                      <BookmarkIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default HealthArticles;
