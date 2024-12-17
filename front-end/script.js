
// Fade-in Effect on Scroll for Sections
const sections = document.querySelectorAll(
  ".hero-section, .about-us, .testimonials, .contact-us"
);
const options = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

const onScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, options);

sections.forEach((section) => {
  onScroll.observe(section);
});

// Back-to-Top Button
const topButton = document.createElement("button");
topButton.innerText = "↑";
topButton.className = "back-to-top";
document.body.appendChild(topButton);

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    topButton.classList.add("show");
  } else {
    topButton.classList.remove("show");
  }
});

topButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ...........................
// script.js

// Add event listener to contact form submit
document
  .querySelector(".contact-us form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get form data
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    // Prepare data to send
    const formData = { name, email, message };

    // Make POST request to the backend API
    axios
      .post("http://localhost:5000/contact", formData)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          alert("Your message has been sent successfully!");
          // Reset form
          document.querySelector(".contact-us form").reset();
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        alert("Failed to send message. Please try again later.");
      });
  });

mongoose
  .connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
