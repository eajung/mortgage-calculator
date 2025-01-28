document.getElementById('mortgageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const income = parseFloat(document.getElementById('income').value);
    const debt = parseFloat(document.getElementById('debt').value);
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const loanTerm = parseFloat(document.getElementById('loanTerm').value);
    const homePrice = parseFloat(document.getElementById('homePrice').value);

    // Get toggle switch states
    const includePropertyTax = document.getElementById('includePropertyTax').checked;
    const includeHOA = document.getElementById('includeHOA').checked;
    const includeMaintenance = document.getElementById('includeMaintenance').checked;
    const includeInsurance = document.getElementById('includeInsurance').checked;

    // Constants (you can adjust these based on your location or preferences)
    const propertyTaxRate = 0.012923; // 1.2923% (Santa Cruz County average)
    const hoaFees = 250; // Example HOA fee (can be adjusted)
    const maintenanceRate = 0.01; // 1% of home price annually
    const insuranceRate = 2150 / 300000; // $2150 annually per $300,000 of home value

    // Calculate loan amount
    const loanAmount = homePrice - downPayment;

    // Calculate monthly interest rate and number of payments
    const monthlyInterestRate = interestRate / 12;
    const numberOfPayments = loanTerm * 12;

    // Calculate monthly mortgage payment
    const monthlyMortgage = loanAmount * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    // Calculate other monthly costs (if enabled)
    const monthlyPropertyTax = includePropertyTax ? (homePrice * propertyTaxRate) / 12 : 0;
    const monthlyHOA = includeHOA ? hoaFees : 0;
    const monthlyMaintenance = includeMaintenance ? (homePrice * maintenanceRate) / 12 : 0;
    const monthlyInsurance = includeInsurance ? (homePrice * insuranceRate) / 12 : 0;

    // Calculate total monthly payment
    const totalMonthlyPayment = monthlyMortgage + monthlyPropertyTax + monthlyHOA + monthlyMaintenance + monthlyInsurance;

    // Calculate percentage of income
    const percentageOfIncome = (totalMonthlyPayment / (income / 12)) * 100;

    // Display result in a table
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results

    // Create a table
    const table = document.createElement('table');
    table.classList.add('result-table');

    // Add table headers
    const headerRow = table.insertRow();
    const headerCell1 = headerRow.insertCell();
    const headerCell2 = headerRow.insertCell();
    headerCell1.textContent = 'Category';
    headerCell2.textContent = 'Amount';
    headerCell1.classList.add('header');
    headerCell2.classList.add('header');

    // Add rows for each cost component
    const addRow = (label, value) => {
        const row = table.insertRow();
        const cell1 = row.insertCell();
        const cell2 = row.insertCell();
        cell1.textContent = label;
        cell2.textContent = value;
    };

    addRow('Monthly Mortgage Payment', `$${monthlyMortgage.toFixed(2)}`);
    if (includePropertyTax) addRow('Monthly Property Tax', `$${monthlyPropertyTax.toFixed(2)}`);
    if (includeHOA) addRow('HOA Fees', `$${monthlyHOA.toFixed(2)}`);
    if (includeMaintenance) addRow('Monthly Maintenance', `$${monthlyMaintenance.toFixed(2)}`);
    if (includeInsurance) addRow('Monthly Insurance', `$${monthlyInsurance.toFixed(2)}`);
    addRow('Total Monthly Payment', `$${totalMonthlyPayment.toFixed(2)}`);
    addRow('Percentage of Income', `${percentageOfIncome.toFixed(2)}%`);

    // Append the table to the result div
    resultDiv.appendChild(table);
});