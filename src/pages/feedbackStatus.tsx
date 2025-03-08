import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, Stack, Paper } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import FeedbackList from "./feedbackList";

interface FeedbackStats {
  rating: number;
  count: number;
  avg_rating: number;
}

const FeedbackStatus: React.FC = () => {
  const [stats, setStats] = useState<FeedbackStats[]>([]);
  const [avgRating, setAvgRating] = useState<number | null>(null);

  // Fetch feedback stats from API
  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/feedback/stats");
      const data = await response.json();
      setStats(data);
      setAvgRating(data.length > 0 ? data[0].avg_rating : null);
    } catch (error) {
      console.error("Error fetching feedback stats:", error);
    }
  };

  // Auto-update stats every 5 seconds
  useEffect(() => {
    fetchStats(); // Initial fetch
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (!stats.length) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{
        height: { xs: "auto", md: "80vh" }, // Adjusts height for small screens
        width: "100%",
        maxWidth: "1200px",
        margin: "auto",
        padding: 2,
        overflow: "hidden",
        flexWrap: "wrap", // Prevents breaking on smaller screens
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
          minWidth: 0, // Prevents layout breaking on small screens
          overflow: "hidden",
          minHeight: "300px", // Ensures visibility in small screens
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
          Average Rating: {avgRating !== null ? avgRating.toFixed(1) : "N/A"} ⭐
        </Typography>

        {/* Wrap ResponsiveContainer inside a div for better responsiveness */}
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
          maxHeight: { xs: "auto", md: "80vh" }, // Adjusts max height for small screens
          minWidth: 0, // Prevents layout issues
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>Feedbacks</Typography>  

        <Paper
          elevation={0} // Removes shadow
          sx={{
            flex: 1,
            padding: 2,
            overflowY: "auto",
            maxHeight: { xs: "50vh", md: "65vh" }, // Adjust for small screens
            minWidth: 0, // Prevents layout issues
            border: "none", // Removes border
            boxShadow: "none", // Ensures no shadow
          }}
        >
          <FeedbackList />
        </Paper>
      </Paper>
    </Stack>
  );
};

export default FeedbackStatus;
