document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners or any client-side logic here
  
    const logoutBtn = document.getElementById('logout-btn');
  
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        // Add logic to handle logout
        fetch('/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response.ok) {
              // Redirect to login page or handle as needed
              window.location.replace('/login');
            } else {
              console.error('Failed to logout');
            }
          })
          .catch((error) => {
            console.error('Error during logout:', error);
          });
      });
    }
  });
  