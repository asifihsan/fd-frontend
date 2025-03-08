import React, { useState } from "react";
import { TextField, Button, Stack, Snackbar, Alert, FormHelperText, Typography, Box } from "@mui/material";
import RatingStar from "../components/ratingStart"; // Ensure correct file name

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    rating: 0,
    feedback: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    rating: "",
    feedback: "",
  });

  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  // Handle text input changes (name, phone, feedback)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle rating change
  const handleRatingChange = (newValue: number) => {
    setFormData({ ...formData, rating: newValue });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = { name: "", phone: "", rating: "", feedback: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
      isValid = false;
    }

    if (formData.rating === 0) {
      newErrors.rating = "Please provide a rating.";
      isValid = false;
    }

    if (!formData.feedback.trim()) {
      newErrors.feedback = "Feedback cannot be empty.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:3000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setToast({ open: true, message: "Feedback submitted successfully!", severity: "success" });

      // Reset form
      setFormData({ name: "", phone: "", rating: 0, feedback: "" });
      setErrors({ name: "", phone: "", rating: "", feedback: "" });
    } catch (error) {
      setToast({ open: true, message: "Error submitting feedback!", severity: "error" });
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
          <TextField
            label="Customer Name"
            name="name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            required
          />

          <TextField
            label="Phone Number"
            name="phone"
            variant="outlined"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            required
          />

          {/* Rating with Label (Professional Look) */}
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1">Rating:</Typography>
            <RatingStar value={formData.rating} onChange={handleRatingChange} readonly={false} />
          </Box>
          {errors.rating && <FormHelperText error>{errors.rating}</FormHelperText>}

          <TextField
            label="Feedback"
            name="feedback"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            value={formData.feedback}
            onChange={handleChange}
            error={!!errors.feedback}
            helperText={errors.feedback}
            required
          />

          <Button type="submit" variant="contained" color="primary">
            Submit Feedback
          </Button>
        </Stack>
      </form>

      {/* Snackbar (Toast) Notification */}
      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity as "success" | "error"}>
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FeedbackForm;
