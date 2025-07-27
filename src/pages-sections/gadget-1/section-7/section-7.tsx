import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENT
import BlogCard from "./blog-card";
// API FUNCTIONS
import api from "utils/__api__/gadget-1";

export default async function Section7() {
  const blogs = await api.getBlogLists();

  return (
    <Container className="mt-4 mb-4">
      <Typography variant="h2" sx={{ mb: 3, lineHeight: 1 }}>
        Get Ideas from our Blog
      </Typography>

      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid size={{ md: 6, xs: 12 }} key={blog.id}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
