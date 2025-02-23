document.getElementById('businessForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form input values
    const businessType = document.getElementById('businessType').value;
    const customers = document.getElementById('customers').value;
    const strengths = document.getElementById('strengths').value;
    const weaknesses = document.getElementById('weaknesses').value;
    const opportunities = document.getElementById('opportunities').value;
    const threats = document.getElementById('threats').value;
    const financialGoals = document.getElementById('financialGoals').value;

    // Create an object to store the business information
    const businessInfo = {
        businessType,
        customers,
        strengths,
        weaknesses,
        opportunities,
        threats,
        financialGoals
    };

    // Save to localStorage
    localStorage.setItem('businessInfo', JSON.stringify(businessInfo));

    // Display saved data
    displaySavedData(businessInfo);
});

// Function to display saved data in the 'Saved Business Info' section
function displaySavedData(info) {
    const savedDataDiv = document.getElementById('savedData');
    savedDataDiv.innerHTML = `
        <div>
            <strong>Business Type:</strong> ${info.businessType}
        </div>
        <div>
            <strong>Target Customers:</strong> ${info.customers}
        </div>
        <div>
            <strong>Strengths:</strong> ${info.strengths}
        </div>
        <div>
            <strong>Weaknesses:</strong> ${info.weaknesses}
        </div>
        <div>
            <strong>Opportunities:</strong> ${info.opportunities}
        </div>
        <div>
            <strong>Threats:</strong> ${info.threats}
        </div>
        <div>
            <strong>Financial Goals:</strong> ${info.financialGoals}
        </div>
    `;
}
