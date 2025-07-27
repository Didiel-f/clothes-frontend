import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENT
import BlogCard from "./blog-card";
// API FUNCTIONS
import api from "utils/__api__/gadget-2";

export default async function Section6() {
  const blogs = await api.getBlogs();

  if (!blogs || !blogs.length) return null;

  return (
    <Container>
      <Typography
        variant="h2"
        sx={{
          mt: "4rem",
          mb: "2rem",
          textAlign: "center",
          fontSize: { sm: 34, xs: 28 }
        }}>
        Latest Post
      </Typography>

      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid size={{ lg: 3, md: 6, xs: 12 }} key={blog.id}>
            <BlogCard date={blog.createdAt} title={blog.title} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
