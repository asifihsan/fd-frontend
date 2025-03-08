import './App.css';
import Stack from '@mui/material/Stack';
import FeedbackForm from './pages/feedbackForm';
import FeedbackStatus from './pages/feedbackStatus';
function App() {

  return (
    <Stack spacing={1}>
       <h1>Feedback Hub</h1>
     <FeedbackStatus/>
     <FeedbackForm/>
    </Stack>
  );
}

export default App;
