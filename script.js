// Function to download PDF
function downloadPDF() {
    const link = document.createElement('a');
    link.href = 'assets/ErikaHooperResumeODU.pdf';  // Ensure the correct path to your PDF
    link.download = 'HooperErikaResume.pdf'; 
    link.click();
}

// Wait for the DOM to load before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Get all the RouterLink elements
    const links = document.querySelectorAll('.RouterLink');

    // Loop through each link and add an event listener
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            const page = this.getAttribute('href'); // Get the href attribute
            loadPage(page); // Call function to load page content
        });
    });

    // Function to fetch and load page content into the rightView div
    function loadPage(page) {
        // Check if the page is 'about.html' and load JSON content
        if (page === 'about.html') {
            fetch('aboutMe.json')  // Fetch the JSON file
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Dynamically inject JSON data into the 'rightView' container
                document.querySelector('.rightView').innerHTML = `
                    <div class="about">
                        <h1>About Me</h1>
                        <p>${data.paragraph1}</p>
                        <p>${data.paragraph2}</p>
                    </div>
                `;
            })
            .catch(error => {
                console.error('Error loading JSON:', error);
                document.querySelector('.rightView').innerHTML = '<p>Error loading the content.</p>';
            });
        } else {
            // Otherwise, load the HTML content for other pages
            fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                document.querySelector('.rightView').innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading the page:', error);
                document.querySelector('.rightView').innerHTML = '<p>Error loading the content.</p>';
            });
        }
    }

    // Optionally, load the default content (e.g., "about.html") when the page first loads
    loadPage('about.html');
});
