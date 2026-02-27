document.addEventListener("DOMContentLoaded", () => {
    const plansSection = document.getElementById("plans");

    const loanPlans = [
        { name: "Personal Loan", rate: "5%", duration: "1-5 years" },
        { name: "Home Loan", rate: "3.5%", duration: "10-30 years" },
        { name: "Car Loan", rate: "4.5%", duration: "1-7 years" }
    ];

    const API_BASE_URL = "http://localhost:8080"; // Updated port number

    loanPlans.forEach(plan => {
        const planDiv = document.createElement("div");
        planDiv.classList.add("plan");
        planDiv.innerHTML = `
            <h2>${plan.name}</h2>
            <p>Interest Rate: ${plan.rate}</p>
            <p>Duration: ${plan.duration}</p>
        `;
        plansSection.appendChild(planDiv);
    });

    // Update fetchApplications function to use the new base URL
    const fetchApplications = async () => {
        const response = await fetch(`${API_BASE_URL}/applications`);
        const applications = await response.json();

        applicationsTable.innerHTML = "";
        applications.forEach(app => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${app.id}</td>
                <td>${app.name}</td>
                <td>${app.email}</td>
                <td>${app.amount}</td>
                <td>${app.status}</td>
                <td>
                    <button onclick="updateStatus(${app.id}, 'Accepted')">Accept</button>
                    <button onclick="updateStatus(${app.id}, 'Rejected')">Reject</button>
                </td>
            `;
            applicationsTable.appendChild(row);
        });
    };

    fetchApplications();

    // Function to generate a random tracking code
    function generateTrackingCode() {
        const prefix = "TRACK";
        const randomNumber = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number
        return `${prefix}-${randomNumber}`;
    }

    // Event listener for form submission
    document.getElementById("loanForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Generate the tracking code
        const trackingCode = generateTrackingCode();

        // Display the tracking code to the user
        const trackingCodeDisplay = document.getElementById("trackingCodeDisplay");
        trackingCodeDisplay.textContent = `Your tracking code is: ${trackingCode}`;
        trackingCodeDisplay.style.display = "block";

        // Optionally, you can send the tracking code to the server here
        // Example: fetch('/submit', { method: 'POST', body: JSON.stringify({ trackingCode }) });
    });
});