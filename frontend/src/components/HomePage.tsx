import { Box, Card, CardHeader, Stack, Typography } from "@mui/material";
import RoomAvailability from "../reservations/RoomAvailability";

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: "#0E103D", minHeight: "100vh", overflow: "hidden" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          clipPath: "ellipse(120% 100% at 50% 0%)",
          justifyContent: "center",
        }}
      >
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source
            // the video will be placed in a s3 buckect currently use a presigned url; but will use cloudfront url for prod
            src="https://project2-storm-hotel-frontend-dev.s3.us-east-1.amazonaws.com/homeVideo.mp4?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCYP3L7%2FmEskEpwlljnAST52UWF2L8UM6Q%2BtlwEfazV6wIhAM5nRrJkCM6fk5lRuwJ6xY5tqTh83c%2B1J2cM7wS9TjHjKs4ECE8QARoMMzk3MzQ1NDExMzY1IgytnA0IiPfOg%2FlMCLQqqwS4NQyd3IFLLdFgK8Q8VwCLln2Q%2FoTcYCO2YGQ1paVRks7vc%2F8STnnjD6pIjpNqjTtVbWdU4vg4lRIW80SIVX5sYsHb3ZFI5RvR4fG%2FzkhUE361ZEj5rr4rKPeXxrIwcAfvH69xfPqwDSVAMZnYSpq0kFFfmr%2BKuaQcPwHFEai9umPlOw%2Bp%2F0FvSOpALoy%2FjD22DMAOJ8%2B4wephhkKTYqMyZOaDjBUNfDI9KL3mKnLBXdzj0DQJcMb9EV35djj9G318k2VnSkg35bv1u1CyaygSZfK3Q5v8BfPsj1WlmapZP4tb3tHaKd9UCw%2Fp5CTJ7F3NReFo1s%2Frv%2BgQjoz%2FhXxH8cv9mpb0z873f7%2Bbczmu8dTISAwq%2F0W0EbyI35vx04nVpZXrUVb2c8vu%2BXKqUVMMBM7iSRMzFivaglY3%2F2Axzd%2FE31gpko%2BBpX1R006RX0fHVsxsLDNNEXBIIy18ueKmDQ2yjrIAbGF5Zr4phsaLyienwYGjsEnGarlakyUQSVbSh3LawOzcx%2FP52FrnpRhJQ%2FDtZu1gbP2BczN9BEk%2Fubeihq6kXmGz%2Bl3nmKh70rf%2FcUThvd6ss6uT%2BhMuprLDIWJK%2Fo1VzdSh6oP6DfArSLvyLtUswohmcN0bWhvQY3cm7bGU%2B%2FDFugXHl1DzAhMBNK0oWVLpGaO4GXTXVBJpgsK5wRnmVlrfsqZ2GSWFi6Xtc88Ffuuj1T0Z1BPkJF9LAvrEMt8y1gq0CNowndnwygY6wgJLsk39fEcoFWlUVE6RDQdFobOzgjc4BBYoQRp0irguMTs7XLSXTKZNCq0Tr1QwbP4cmW96LUE7QuI4QoyZEiYiIfNTkgzb2Nq3ZoBtHBnUMCEOrG9uglVV6ZrbWy%2BRZ6EzbfgnmOui12seGdISmv4DH1fBhfSTok3tOq5rATPjn2mlojYUAt4jWrdhQAJHjyzxm4viS5WXqy17w9z6XOpJadCYJwcU4kLF4EjoWfGZyktKRBhxvYXMD2or3sHLexi1G3NnZHaqX4Mt03XlApIbtsNuIkJ9SUJHpts5tfpwP8qHOZ%2FlEoVv63OBAYYdZIGJvHiR1JvU8Znl12waNkRXOqkR3R%2B2uoIpxuGfJUI7osjyWTa6wCEeYOfjZa2cdVHVwrJWQvoW4Vqsxrah9ZFKdlsy4ahj%2BMozpWnuYimNGNIv&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAVZA5B2ES7EJ6VRH2%2F20260105%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260105T213330Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=2f989ae9cd218fe372121167d0388956ac09e3704a764ac635c69215523f49ba"
            type="video/mp4"
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle, rgba(14,16,61,0.35) 0%, rgba(14,16,61,0.9) 100%)",
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            width: "100%",
            px: 2,
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "#FF8533",
              letterSpacing: 6,
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            Welcome to the future of luxury
          </Typography>

          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "3.5rem", md: "5.5rem" },
              fontWeight: 900,
              color: "white",
              lineHeight: 1,
              mb: 6,
              textShadow: "0px 10px 30px rgba(0,0,0,0.6)",
            }}
          >
            STORM <span style={{ color: "#FF8533" }}>STAY</span>
          </Typography>

          <Box
            sx={{
              maxWidth: "1100px",
              margin: "0 auto",

              "& .MuiPaper-root": {
                bgcolor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.25)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
                borderRadius: "22px",
                p: 4,
              },

              "& .MuiTypography-h4": { display: "none" },

              /* INPUT BACKGROUND */
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#FFFFFF",
                borderRadius: "14px",
                fontWeight: 600,

                "& fieldset": {
                  borderColor: "#0E103D",
                  borderWidth: 2,
                },

                "&:hover fieldset": {
                  borderColor: "#FF8533",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#9F2042",
                  borderWidth: 2,
                },
              },

              "& .MuiInputBase-input": {
                color: "#0E103D",
                fontSize: "1.05rem",
              },

              /* LABEL */
              "& .MuiInputLabel-root": {
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "0.95rem",
                backgroundColor: "rgba(14,16,61,0.9)",
                padding: "2px 10px",
                borderRadius: "8px",
                transform: "translate(14px, -10px) scale(1)",
              },

              "& .MuiInputLabel-root.Mui-focused": {
                backgroundColor: "#9F2042",
                color: "#FFFFFF",
              },

              /* BUTTON */
              "& .MuiButton-root": {
                bgcolor: "#9F2042",
                height: "56px",
                fontSize: "1.1rem",
                fontWeight: 700,
                borderRadius: "14px",
                "&:hover": { bgcolor: "#FF8533" },
              },
            }}
          >
            <RoomAvailability />
          </Box>
        </Box>
      </Box>
      <Box
        component="section"
        sx={{
          height: "100vh",
          backgroundColor: "#FFFF",
          clipPath: "ellipse(130% 100% at 15% 100%)",
        }}
      >
        <Stack>
          <Card sx={{ display: "flex", maxWidth: "300px" }}>
            <CardHeader>Title</CardHeader>
          </Card>
        </Stack>
      </Box>
      <Box
        component="footer"
        sx={{
          bgcolor: "#090A2E",
          color: "white",
          py: 4,
          textAlign: "center",
        }}
      >
        <Typography fontWeight={700}>STORM STAY</Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          © 2026 Storm Stay Luxury Group. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
