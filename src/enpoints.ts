const api='http://localhost:3000/api'
const endpoints = {
    feedback: {
      get: `${api}/feedback`,
      submit: `${api}/feedback`,
      status: `${api}/feedback/stats`,
    },
  };
  
  export default endpoints;
  