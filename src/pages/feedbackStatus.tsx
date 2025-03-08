import React from "react";
import { Typography, CircularProgress, Stack, Paper } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import FeedbackList from "./feedbackList";
import useFetch from "../hooks/useFecth";
import endpoints from "../enpoints";

interface FeedbackStats {
  rating: number;
  count: number;
  avg_rating: number;
}

const FeedbackStatus: React.FC = () => {
  // Use `useFetch` hook to get feedback stats with auto-refresh every 5 seconds
  const { data: stats, loading, error } = useFetch<FeedbackStats[]>(endpoints.feedback.status, 5000);

  // Calculate average rating from the first item (assuming API sends sorted data)
  const avgRating = stats && stats.length > 0 ? stats[0].avg_rating : null;

  if (loading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
  if (error) return <Typography color="error" align="center">{error}</Typography>;
  if (!stats || stats.length === 0) return <Typography align="center">No feedback data available.</Typography>;

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{
        height: { xs: "auto", md: "80vh" },
        width: "100%",
        maxWidth: "1200px",
        margin: "auto",
        padding: 2,
        overflow: "hidden",
        flexWrap: "wrap",
      }}
    >
      {/* Left: Graph Section */}
      <Paper
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          minWidth: 0,
          overflow: "hidden",
          minHeight: "300px",
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
          Average Rating: {avgRating !== null ? avgRating.toFixed(1) : "N/A"} ⭐
        </Typography>

        <div style={{ width: "100%", height: "100%", minHeight: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats}>
              <XAxis dataKey="rating" tick={{ fontSize: 14 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Paper>

      {/* Right: Scrollable Feedback List */}
      <Paper
        sx={{
          flex: 1,
          padding: 2,
          maxHeight: { xs: "auto", md: "80vh" },
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>Feedbacks</Typography>  

        <Paper
          elevation={0}
          sx={{
            flex: 1,
            padding: 2,
            overflowY: "auto",
            maxHeight: { xs: "50vh", md: "65vh" },
            minWidth: 0,
            border: "none",
            boxShadow: "none",
          }}
        >
          <FeedbackList />
        </Paper>
      </Paper>
    </Stack>
  );
};

export default FeedbackStatus;
