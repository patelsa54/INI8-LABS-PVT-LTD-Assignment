document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
  
    // Collect form data
    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData.entries()); // Convert form data to JSON
  
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
  
      if (response.ok) {
        document.getElementById('message').innerHTML = '<p style="color: green;">Registration successful!</p>';
      } else {
        document.getElementById('message').innerHTML = '<p style="color: red;">Registration failed. Please try again.</p>';
      }
    } catch (error) {
      console.error('Error during registration:', error);
      document.getElementById('message').innerHTML = '<p style="color: red;">An error occurred. Please try again.</p>';
    }
  });  