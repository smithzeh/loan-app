document.addEventListener("DOMContentLoaded", () => {
    const applicationsTable = document.querySelector("#applications tbody");

    const fetchApplications = async () => {
        const response = await fetch("http://localhost:8080/applications");
        const applications = await response.json();

        applicationsTable.innerHTML = "";
        applications.forEach(app => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${app.id}</td>
                <td>${app.trackingNumber}</td>
                <td>${app.name}</td>
                <td>${app.email}</td>
                <td>${app.amountFrom} - ${app.amountTo}</td>
                <td>${app.status}</td>
                <td>
                    <button class="confirm" onclick="updateStatus(${app.id}, 'Confirmed')">Confirm</button>
                    <button class="pending" onclick="updateStatus(${app.id}, 'Pending')">Pending</button>
                    <button class="reject" onclick="updateStatus(${app.id}, 'Rejected')">Reject</button>
                </td>
            `;
            applicationsTable.appendChild(row);
        });
    };

    const updateStatus = async (id, status) => {
        await fetch(`http://localhost:8080/applications/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        });
        fetchApplications();
    };

    fetchApplications();
});