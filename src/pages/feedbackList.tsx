import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Stack } from "@mui/material";
import RatingStar from "../components/ratingStart";

interface Feedback {
  id: number;
  customer_name: string;
  phone_number: string;
  rating: number;
  feedback_text: string;
}

const FeedbackList: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  // Fetch feedbacks from API
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/feedback");
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  // Auto-update feedbacks every 5 seconds
  useEffect(() => {
    fetchFeedbacks(); // Initial fetch
    const interval = setInterval(fetchFeedbacks, 5000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (feedbacks.length === 0) return <Typography align="center">No feedback available.</Typography>;

  return (
    <Stack
      spacing={2}
      sx={{
        maxWidth: 500,
        margin: "auto",
        // maxHeight: feedbacks.length > 5 ? 400 : "auto",
        overflowY: feedbacks.length > 5 ? "auto" : "visible",
        padding: 2,
      }}
    >
      {feedbacks.map((feedback) => (
        <Card key={feedback.id} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6">{feedback.customer_name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {feedback.phone_number}
            </Typography>
            <RatingStar value={feedback.rating} onChange={() => {}} readonly={true} />
            <Typography variant="body2" color="text.secondary">
              {feedback.feedback_text}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default FeedbackList;
