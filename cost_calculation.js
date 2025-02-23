document.getElementById('costProfitForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from the form
    const costPrice = parseFloat(document.getElementById('costPrice').value);
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);
    const marketingCost = parseFloat(document.getElementById('marketingCost').value);
    const otherCosts = parseFloat(document.getElementById('otherCosts').value);
    const productName = document.getElementById('productName').value;

    // Calculate profit
    const grossProfit = sellingPrice - costPrice;
    const netProfit = grossProfit - (marketingCost + otherCosts);

    // Calculate percentages
    const grossProfitPercentage = ((grossProfit / costPrice) * 100).toFixed(2);
    const netProfitPercentage = ((netProfit / costPrice) * 100).toFixed(2);

    // Display results
    const resultContainer = document.getElementById('profitResult');
    resultContainer.innerHTML = `
        <p><strong>Gross Profit:</strong> $${grossProfit} (${grossProfitPercentage}%)</p>
        <p><strong>Net Profit (after marketing and other costs):</strong> $${netProfit} (${netProfitPercentage}%)</p>
    `;

    // Prepare data to save in localStorage
    const productData = {
        productName: productName,
        costPrice: costPrice,
        sellingPrice: sellingPrice,
        marketingCost: marketingCost,
        otherCosts: otherCosts,
        grossProfit: grossProfit,
        netProfit: netProfit,
        grossProfitPercentage: grossProfitPercentage,
        netProfitPercentage: netProfitPercentage
    };

    // Save data in localStorage
    const savedData = JSON.parse(localStorage.getItem('profitData')) || [];
    savedData.push(productData);
    localStorage.setItem('profitData', JSON.stringify(savedData));

    // Update the saved data display
    displaySavedData();
});

// Function to display saved data
function displaySavedData() {
    const savedData = JSON.parse(localStorage.getItem('profitData')) || [];
    const savedDataContainer = document.getElementById('savedData');
    savedDataContainer.innerHTML = ''; // Clear previous display

    savedData.forEach((data, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('productData');

        productDiv.innerHTML = `
            <p><strong>Product Name:</strong> ${data.productName}</p>
            <p><strong>Cost Price:</strong> $${data.costPrice}</p>
            <p><strong>Selling Price:</strong> $${data.sellingPrice}</p>
            <p><strong>Gross Profit:</strong> $${data.grossProfit} (${data.grossProfitPercentage}%)</p>
            <p><strong>Net Profit:</strong> $${data.netProfit} (${data.netProfitPercentage}%)</p>
            <button onclick="editProduct(${index})">Edit</button>
            <button onclick="deleteProduct(${index})">Delete</button>
        `;
        savedDataContainer.appendChild(productDiv);
    });
}

// Function to edit a product
function editProduct(index) {
    const savedData = JSON.parse(localStorage.getItem('profitData')) || [];
    const product = savedData[index];

    document.getElementById('costPrice').value = product.costPrice;
    document.getElementById('sellingPrice').value = product.sellingPrice;
    document.getElementById('marketingCost').value = product.marketingCost;
    document.getElementById('otherCosts').value = product.otherCosts;
    document.getElementById('productName').value = product.productName;

    // Delete the original product before updating
    deleteProduct(index);
}

// Function to delete a product
function deleteProduct(index) {
    const savedData = JSON.parse(localStorage.getItem('profitData')) || [];
    savedData.splice(index, 1);
    localStorage.setItem('profitData', JSON.stringify(savedData));

    // Update the saved data display
    displaySavedData();
}

// Call the display function on page load to show saved data
window.onload = displaySavedData;
