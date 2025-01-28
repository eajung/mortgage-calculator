document.getElementById('mortgageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const income = parseFloat(document.getElementById('income').value);
    const debt = parseFloat(document.getElementById('debt').value);
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const loanTerm = parseFloat(document.getElementById('loanTerm').value);
    const homePrice = parseFloat(document.getElementById('homePrice').value);

    // Calculate loan amount
    const loanAmount = homePrice - downPayment;

    // Calculate monthly interest rate and number of payments
    const monthlyInterestRate = interestRate / 12;
    const numberOfPayments = loanTerm * 12;

    // Calculate monthly mortgage payment using the formula for a fixed-rate mortgage
    const monthlyPayment = loanAmount * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    // Calculate total monthly obligations (mortgage + debt)
    const totalMonthlyObligations = monthlyPayment + debt;

    // Calculate maximum allowable monthly payment (28% of gross monthly income)
    const maxMonthlyPayment = (income / 12) * 0.28;

    // Determine affordability
    const affordable = totalMonthlyObligations <= maxMonthlyPayment;

    // Display result
    const resultDiv = document.getElementById('result');
    if (affordable) {
        resultDiv.textContent = "You can afford this home!";
        resultDiv.style.color = "green";
    } else {
        resultDiv.textContent = "You cannot afford this home based on your current financial situation.";
        resultDiv.style.color = "red";
    }
});