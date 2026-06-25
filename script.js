// ==========================
// HEALTHCARE CLAIMS PORTAL
// ==========================

let claims = JSON.parse(localStorage.getItem("claims")) || [];

// Load Data When Page Opens
document.addEventListener("DOMContentLoaded", () => {
    displayClaims();
    updateDashboardStats();
});

// ==========================
// ADD CLAIM
// ==========================

function addClaim() {

    const claimId =
        document.getElementById("claimId").value;

    const patientName =
        document.getElementById("patientName").value;

    const providerName =
        document.getElementById("providerName").value;

    const amount =
        document.getElementById("claimAmount").value;

    const status = "Pending";

    if (
        claimId === "" ||
        patientName === "" ||
        providerName === "" ||
        amount === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    const claim = {
        claimId,
        patientName,
        providerName,
        amount,
        status
    };

    claims.push(claim);

    saveClaims();

    displayClaims();

    updateDashboardStats();

    document.getElementById("claimForm").reset();

    alert("Claim Submitted Successfully");
}

// ==========================
// SAVE TO LOCAL STORAGE
// ==========================

function saveClaims() {
    localStorage.setItem(
        "claims",
        JSON.stringify(claims)
    );
}

// ==========================
// DISPLAY CLAIMS
// ==========================

function displayClaims() {

    const tableBody =
        document.getElementById("claimsTableBody");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    claims.forEach((claim, index) => {

        let row = `
        <tr>

            <td>${claim.claimId}</td>

            <td>${claim.patientName}</td>

            <td>${claim.providerName}</td>

            <td>₹${claim.amount}</td>

            <td>
                <span class="status ${claim.status.toLowerCase()}">
                    ${claim.status}
                </span>
            </td>

            <td>

                <button class="approve action-btn"
                onclick="approveClaim(${index})">
                Approve
                </button>

                <button class="reject action-btn"
                onclick="rejectClaim(${index})">
                Reject
                </button>

                <button class="delete action-btn"
                onclick="deleteClaim(${index})">
                Delete
                </button>

            </td>

        </tr>
        `;

        tableBody.innerHTML += row;
    });
}

// ==========================
// APPROVE CLAIM
// ==========================

function approveClaim(index) {

    claims[index].status = "Approved";

    saveClaims();

    displayClaims();

    updateDashboardStats();
}

// ==========================
// REJECT CLAIM
// ==========================

function rejectClaim(index) {

    claims[index].status = "Rejected";

    saveClaims();

    displayClaims();

    updateDashboardStats();
}

// ==========================
// DELETE CLAIM
// ==========================

function deleteClaim(index) {

    let confirmDelete =
        confirm("Delete this claim?");

    if (confirmDelete) {

        claims.splice(index, 1);

        saveClaims();

        displayClaims();

        updateDashboardStats();
    }
}

// ==========================
// SEARCH CLAIM
// ==========================

function searchClaim() {

    const searchText =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const rows =
        document.querySelectorAll(
            "#claimsTableBody tr"
        );

    rows.forEach(row => {

        const text =
            row.textContent.toLowerCase();

        if (text.includes(searchText)) {

            row.style.display = "";

        } else {

            row.style.display = "none";
        }

    });
}

// ==========================
// DASHBOARD COUNTS
// ==========================

function updateDashboardStats() {

    const totalClaims =
        claims.length;

    const approvedClaims =
        claims.filter(
            claim =>
            claim.status === "Approved"
        ).length;

    const rejectedClaims =
        claims.filter(
            claim =>
            claim.status === "Rejected"
        ).length;

    const pendingClaims =
        claims.filter(
            claim =>
            claim.status === "Pending"
        ).length;

    if(document.getElementById("totalClaims"))
        document.getElementById(
            "totalClaims"
        ).innerText = totalClaims;

    if(document.getElementById("approvedClaims"))
        document.getElementById(
            "approvedClaims"
        ).innerText = approvedClaims;

    if(document.getElementById("pendingClaims"))
        document.getElementById(
            "pendingClaims"
        ).innerText = pendingClaims;

    if(document.getElementById("rejectedClaims"))
        document.getElementById(
            "rejectedClaims"
        ).innerText = rejectedClaims;
}

// ==========================
// SAMPLE DATA
// ==========================

if (claims.length === 0) {

    claims.push(
        {
            claimId: "CL101",
            patientName: "Rahul Sharma",
            providerName: "Apollo Hospital",
            amount: "15000",
            status: "Approved"
        },
        {
            claimId: "CL102",
            patientName: "Priya Patel",
            providerName: "Fortis Hospital",
            amount: "22000",
            status: "Pending"
        },
        {
            claimId: "CL103",
            patientName: "Amit Singh",
            providerName: "Ruby Hall",
            amount: "10500",
            status: "Rejected"
        }
    );

    saveClaims();
}