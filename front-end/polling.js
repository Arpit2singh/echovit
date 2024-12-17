document.addEventListener("DOMContentLoaded", () => {
    const addPollButton = document.getElementById("addPollButton");
    const addOptionButton = document.getElementById("addOptionButton");
    const pollsContainer = document.getElementById("pollsContainer");
    const optionsContainer = document.getElementById("optionsContainer");

    // Add dynamic options functionality
    addOptionButton.addEventListener("click", () => {
        const currentOptions = optionsContainer.querySelectorAll(".poll-option");
        if (currentOptions.length >= 5) {
            alert("You can only add up to 5 options.");
            return;
        }

        const optionInput = document.createElement("input");
        optionInput.type = "text";
        optionInput.classList.add("input-field", "poll-option");
        optionInput.placeholder = `Option ${currentOptions.length + 1}`;
        optionsContainer.appendChild(optionInput);
    });

    // Add Poll Event Listener
    addPollButton.addEventListener("click", () => {
        const question = document.getElementById("pollQuestion").value.trim();
        const optionInputs = optionsContainer.querySelectorAll(".poll-option");
        const options = Array.from(optionInputs).map((input) =>
            input.value.trim()
        );

        // Validation
        if (!question) {
            alert("Poll question cannot be empty.");
            return;
        }

        if (options.length < 2) {
            alert("You must add at least 2 options.");
            return;
        }

        if (options.some((option) => option === "")) {
            alert("Options cannot be empty.");
            return;
        }

        // Create new poll element
        const pollDiv = document.createElement("div");
        pollDiv.classList.add("poll");

        const pollOptionsHTML = options
            .map((option, index) => `
                <div class="poll-option">
                    <button onclick="vote(this, ${index})">${option}</button>
                    <span class="vote-count">Votes: 0</span>
                    <span class="vote-percentage"> (0%)</span>
                </div>
            `)
            .join("");

        pollDiv.innerHTML = `
            <h3>${question}</h3>
            <div class="poll-options">
                ${pollOptionsHTML}
            </div>
            <div class="poll-total-votes">Total Votes: 0</div>
        `;

        // Append to polls container
        pollsContainer.appendChild(pollDiv);

        // Clear inputs
        document.getElementById("pollQuestion").value = "";
        optionsContainer.innerHTML = `
            <input type="text" class="input-field poll-option" placeholder="Option 1">
            <input type="text" class="input-field poll-option" placeholder="Option 2">
        `;
    });
});

// Vote function
function vote(button, index) {
    const pollDiv = button.closest(".poll");
    const voteCounts = pollDiv.querySelectorAll(".vote-count");
    const votePercentages = pollDiv.querySelectorAll(".vote-percentage");
    const totalVotesDiv = pollDiv.querySelector(".poll-total-votes");

    // Update the vote count for the selected option
    const voteCountSpan = voteCounts[index];
    const currentVotes = parseInt(voteCountSpan.textContent.replace("Votes: ", "")) || 0;
    const updatedVotes = currentVotes + 1;
    voteCountSpan.textContent = `Votes: ${updatedVotes}`;

    // Update the total votes
    const totalVotes = Array.from(voteCounts).reduce((sum, voteCount) => {
        return sum + parseInt(voteCount.textContent.replace("Votes: ", "")) || 0;
    }, 0);
    totalVotesDiv.textContent = `Total Votes: ${totalVotes}`;

    // Update percentages
    Array.from(voteCounts).forEach((voteCount, idx) => {
        const votes = parseInt(voteCount.textContent.replace("Votes: ", "")) || 0;
        const percentage = totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : 0;
        votePercentages[idx].textContent = ` (${percentage}%)`;
    });
}
