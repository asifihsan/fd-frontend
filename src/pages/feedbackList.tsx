import React from "react";
import { Card, CardContent, Typography, Stack } from "@mui/material";
import RatingStar from "../components/ratingStart";import useFetch from "../hooks/useFecth";
import endpoints from "../enpoints";


interface Feedback {
  id: number;
  customer_name: string;
  phone_number: string;
  rating: number;
  feedback_text: string;
}

const FeedbackList: React.FC = () => {
  // Use the custom hook to fetch data
  const { data: feedbacks, loading, error } = useFetch<Feedback[]>(endpoints.feedback.get, 5000);

  if (loading) return <Typography align="center">Loading...</Typography>;
  if (error) return <Typography align="center" color="error">Error: {error}</Typography>;
  if (!feedbacks || feedbacks.length === 0) return <Typography align="center">No feedback available.</Typography>;

  return (
    <Stack
      spacing={2}
      sx={{
        maxWidth: 500,
        margin: "auto",
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
