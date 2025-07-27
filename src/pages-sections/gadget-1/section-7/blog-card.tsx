import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { format } from "date-fns/format";
// MUI ICON COMPONENTS
import AccessTime from "@mui/icons-material/AccessTime";
import CommentOutlined from "@mui/icons-material/CommentOutlined";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import FlexBox from "components/flex-box/flex-box";
import { NavLink2 } from "components/nav-link";
// CUSTOM DATA MODEL
import Blog from "models/Blog.model";

// ===========================================================
type Props = { blog: Blog };
// ===========================================================

const ICON_STYLE = { fontSize: "1rem", color: "grey.600" };

export default function BlogCard({ blog }: Props) {
  return (
    <Box overflow="hidden" borderRadius={3}>
      <LazyImage width={588} height={272} alt="blog-image" src={blog.thumbnail} />

      <Box py={3}>
        <Typography variant="h3" sx={{ lineHeight: 1.3, color: "secondary.900" }}>
          {blog.title}
        </Typography>

        <FlexBox alignItems="center" mt="5px" gap={3}>
          <FlexBox alignItems="center" gap={0.5}>
            <AccessTime sx={ICON_STYLE} />
            <Typography variant="body1">
              {format(new Date(blog.createdAt), "dd MMMM, yyyy")}
            </Typography>
          </FlexBox>

          <FlexBox alignItems="center" gap={0.5}>
            <CommentOutlined sx={ICON_STYLE} />
            <Typography variant="body1">{blog.comments} comments</Typography>
          </FlexBox>
        </FlexBox>

        <Typography variant="body1" sx={{ mt: "1.2rem", mb: "0.7rem" }}>
          {blog.description}
        </Typography>

        <NavLink2 title="CONTINUE READING" url="#" />
      </Box>
    </Box>
  );
}
