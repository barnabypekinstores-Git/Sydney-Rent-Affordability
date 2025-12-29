// Sydney Rent Affordability Calculator
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with default values
    updateBudgetDisplay();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initial calculation
    calculateAndDisplay();
});

// Update budget display based on income
function updateBudgetDisplay() {
    const income = parseInt(document.getElementById('income').value) || 85000;
    const weeklyMax = Math.floor((income / 52) * 0.3);
    const monthlyBudget = Math.floor((income / 12) * 0.3);
    
    document.getElementById('max-rent').textContent = `$${weeklyMax}`;
    document.getElementById('monthly-budget').textContent = `$${monthlyBudget}`;
    document.getElementById('income-percent').textContent = '30%';
}

// Set up all event listeners
function setupEventListeners() {
    // Income input and slider sync
    const incomeInput = document.getElementById('income');
    const incomeSlider = document.getElementById('income-slider');
    
    incomeInput.addEventListener('input', function() {
        incomeSlider.value = this.value;
        updateBudgetDisplay();
        calculateAndDisplay();
    });
    
    incomeSlider.addEventListener('input', function() {
        incomeInput.value = this.value;
        updateBudgetDisplay();
        calculateAndDisplay();
    });
    
    // Bedroom buttons
    document.querySelectorAll('.bed-btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.bed-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            calculateAndDisplay();
        });
    });
    
    // Calculate button
    document.getElementById('calculate-btn').addEventListener('click', calculateAndDisplay);
    
    // Sort dropdown
    document.getElementById('sort-by').addEventListener('change', calculateAndDisplay);
    
    // Commute dropdown
    document.getElementById('max-commute').addEventListener('change', calculateAndDisplay);
}

// Main calculation function
function calculateAndDisplay() {
    const income = parseInt(document.getElementById('income').value);
    if (!income || income < 10000) return;
    
    const bedrooms = document.querySelector('.bed-btn.active').dataset.beds;
    const maxCommute = parseInt(document.getElementById('max-commute').value);
    const maxWeeklyRent = Math.floor((income / 52) * 0.3);
    
    // Filter suburbs
    const affordableSuburbs = sydneySuburbs.filter(suburb => {
        const suburbRent = suburb.medianRent[bedrooms];
        return suburbRent <= maxWeeklyRent && suburb.commuteCBD <= maxCommute;
    });
    
    // Sort results
    const sortedSuburbs = sortSuburbs(affordableSuburbs, bedrooms, maxWeeklyRent);
    
    // Display results
    displayResults(sortedSuburbs, maxWeeklyRent);
}

// Sort suburbs based on selected option
function sortSuburbs(suburbs, bedrooms, maxRent) {
    const sortBy = document.getElementById('sort-by').value;
    
    return [...suburbs].sort((a, b) => {
        const rentA = a.medianRent[bedrooms];
        const rentB = b.medianRent[bedrooms];
        
        switch(sortBy) {
            case 'rent':
                return rentA - rentB;
            case 'commute':
                return a.commuteCBD - b.commuteCBD;
            case 'affordability':
                const ratioA = rentA / maxRent;
                const ratioB = rentB / maxRent;
                return ratioA - ratioB;
            default:
                return 0;
        }
    });
}

// Display results in the UI
function displayResults(suburbs, maxRent) {
    const resultsList = document.getElementById('results-list');
    const resultsCount = document.getElementById('results-count');
    
    resultsCount.textContent = suburbs.length;
    
    if (suburbs.length === 0) {
        resultsList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search fa-3x"></i>
                <h3>No areas found within your criteria</h3>
                <p>Try increasing your income or adjusting your preferences</p>
                <p><strong>Maximum weekly rent:</strong> $${maxRent}</p>
            </div>
        `;
        return;
    }
    
    let html = '<div class="results-grid">';
    
    suburbs.forEach(suburb => {
        const rent = suburb.medianRent[document.querySelector('.bed-btn.active').dataset.beds];
        const affordability = Math.round((rent / maxRent) * 100);
        
        html += `
            <div class="result-card">
                <div class="result-header">
                    <h3>${suburb.name} ${suburb.postcode}</h3>
                    <span class="rent-price">$${rent}/wk</span>
                </div>
                <div class="result-details">
                    <p><i class="fas fa-train"></i> ${suburb.commuteCBD} min to CBD</p>
                    <p><i class="fas fa-star"></i> Transport: ${suburb.transportScore}/10</p>
                    <p class="description">${suburb.description}</p>
                </div>
                <div class="affordability">
                    <div class="affordability-label">
                        Uses ${affordability}% of your budget
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${Math.min(affordability, 100)}%"></div>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    resultsList.innerHTML = html;
}