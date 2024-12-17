function sendMail(email, subject, body) {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }
  const heading = document.getElementById("animated-heading");
const texts = [
    "Holiday Request",
    "Outing Permission",
    "Food Feedback",
    "Room Service Issue",
    "Wi-Fi/Network Issue"
];
let index = 0; // Keeps track of which text to display
let charIndex = 0; // Tracks the character to type/delete
let isDeleting = false; // Determines if we are typing or deleting
const typingSpeed = 100; // Speed of typing
const deletingSpeed = 50; // Speed of deleting
const pauseDelay = 1500; // Pause before typing/deleting starts

function type() {
    const currentText = texts[index];
    
    if (isDeleting) {
        // Remove characters
        charIndex--;
        heading.textContent = currentText.substring(0, charIndex);
    } else {
        // Add characters
        charIndex++;
        heading.textContent = currentText.substring(0, charIndex);
    }

    if (!isDeleting && charIndex === currentText.length) {
        // Pause after typing the full word
        isDeleting = true;
        setTimeout(type, pauseDelay);
    } else if (isDeleting && charIndex === 0) {
        // Move to the next text
        isDeleting = false;
        index = (index + 1) % texts.length; // Loop back to the first text
        setTimeout(type, 500);
    } else {
        // Continue typing or deleting
        const delay = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, delay);
    }
}

// Start the animation
type();
