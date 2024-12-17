// Lottie Animation Script
var animationContainer = document.getElementById('animation');
var animation = lottie.loadAnimation({
    container: animationContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './Animation.json',
});

// Add Typing Animation for the Header
const headerText = document.querySelector(".header-container h1");
const phrases = ["Notes Sharing Platform", "Share and Learn Together", "Easy Access to Knowledge"];
let currentIndex = 0;
let isDeleting = false;
let currentText = "";

function typeAnimation() {
    if (isDeleting) {
        currentText = phrases[currentIndex].slice(0, currentText.length - 1);
    } else {
        currentText = phrases[currentIndex].slice(0, currentText.length + 1);
    }

    headerText.textContent = currentText;

    if (!isDeleting && currentText === phrases[currentIndex]) {
        setTimeout(() => (isDeleting = true), 1000); // Pause before deleting
    } else if (isDeleting && currentText === "") {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % phrases.length; 
    }

    setTimeout(typeAnimation, isDeleting ? 50 : 100);
}

typeAnimation();

var topAnimationContainer = document.getElementById('top-animation');
lottie.loadAnimation({
    container: topAnimationContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './Animation.json', 
});

// Handle File Upload
const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const notesContainer = document.querySelector('.notes-container');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (fileInput.files.length === 0) {
        alert("Please select a file to upload.");
        return;
    }

    const file = fileInput.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json', // Optional, but good practice
        },
      });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            addNoteItem(data.name, data.url);
        } else {
            alert("Upload failed: " + data.message);
        }
    } catch (error) {
        console.error("Error uploading file:", error);
        alert("An error occurred while uploading.");
    }
});

// Dynamically Add Notes to the Notes Section
function addNoteItem(name, url) {
    const noteItem = document.createElement('div');
    noteItem.classList.add('note-item');

    noteItem.innerHTML = `
        <h3>${name}</h3>
        <p>Uploaded File</p>
        <a href="${url}" target="_blank">
            <button class="download-btn">View File</button>
        </a>
    `;

    notesContainer.appendChild(noteItem);
}
