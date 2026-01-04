// js/calculator.js - Calculator logic
console.log('calculator.js loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing calculator...');
    
    // Get DOM elements
    const incomeSlider = document.getElementById('income-slider');
    const incomeDisplay = document.getElementById('income-display');
    const commuteSlider = document.getElementById('commute-slider');
    const commuteDisplay = document.getElementById('commute-display');
    const bedButtons = document.querySelectorAll('.bed-btn');
    const calculateBtn = document.getElementById('calculate-btn');
    
    // Budget displays
    const weeklyRentDisplay = document.getElementById('weekly-rent');
    const monthlyBudgetDisplay = document.getElementById('monthly-budget');
    const annualBudgetDisplay = document.getElementById('annual-budget');
    
    // Current selections
    let currentIncome = 85000;
    let currentBedrooms = 1;
    let currentCommute = 45;
    
    // ===== VALIDATE ELEMENTS =====
    if (!incomeSlider) console.error('Missing #income-slider');
    if (!incomeDisplay) console.error('Missing #income-display');
    if (!commuteSlider) console.error('Missing #commute-slider');
    if (!commuteDisplay) console.error('Missing #commute-display');
    if (!calculateBtn) console.error('Missing #calculate-btn');
    
    // ===== INCOME SLIDER =====
    if (incomeSlider) {
        incomeSlider.addEventListener('input', function() {
            currentIncome = parseInt(this.value);
            incomeDisplay.textContent = formatCurrency(currentIncome);
            updateBudget();
        });
    }
    
    // ===== COMMUTE SLIDER =====
    if (commuteSlider) {
        commuteSlider.addEventListener('input', function() {
            currentCommute = parseInt(this.value);
            commuteDisplay.textContent = currentCommute + ' min';
        });
    }
    
    // ===== BEDROOM BUTTONS =====
    if (bedButtons.length > 0) {
        console.log(`Found ${bedButtons.length} bedroom buttons`);
        
        bedButtons.forEach(button => {
            button.addEventListener('click', function() {
                console.log('Bedroom button clicked:', this.dataset.beds);
                
                // Remove active class from all buttons
                bedButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                this.style.backgroundColor = '#667eea';
                this.style.color = 'white';
                
                // Update selected bedrooms
                currentBedrooms = parseInt(this.dataset.beds);
                console.log('Selected bedrooms:', currentBedrooms);
                updateBudget();
            });
        });
        
        // Set first button as active initially
        if (bedButtons[0]) {
            bedButtons[0].classList.add('active');
            bedButtons[0].style.backgroundColor = '#667eea';
            bedButtons[0].style.color = 'white';
        }
    } else {
        console.error('No bedroom buttons found!');
    }
    
    // ===== CALCULATE BUDGET =====
    function updateBudget() {
        console.log('Calculating budget for income:', currentIncome);
        
        // Monthly income
        const monthlyIncome = currentIncome / 12;
        
        // 30% of monthly income for housing
        const monthlyHousing = monthlyIncome * 0.3;
        
        // Convert to weekly (approx 4.33 weeks per month)
        const weeklyRent = monthlyHousing / 4.33;
        
        // Update displays
        if (weeklyRentDisplay) {
            const roundedWeekly = Math.round(weeklyRent);
            weeklyRentDisplay.textContent = formatCurrency(roundedWeekly);
        }
        
        if (monthlyBudgetDisplay) {
            const roundedMonthly = Math.round(monthlyHousing);
            monthlyBudgetDisplay.textContent = formatCurrency(roundedMonthly);
        }
        
        if (annualBudgetDisplay) {
            const annualHousing = monthlyHousing * 12;
            const roundedAnnual = Math.round(annualHousing);
            annualBudgetDisplay.textContent = formatCurrency(roundedAnnual);
        }
        
        console.log('Budget calculated:', {
            weekly: Math.round(weeklyRent),
            monthly: Math.round(monthlyHousing)
        });
    }
    
    // ===== FORMAT CURRENCY =====
    function formatCurrency(amount) {
        return '$' + amount.toLocaleString('en-US');
    }
    
    // ===== CALCULATE BUTTON =====
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            console.log('=== CALCULATE BUTTON CLICKED ===');
            console.log('Current settings:', {
                income: currentIncome,
                bedrooms: currentBedrooms,
                commute: currentCommute
            });
            
            // Get the maximum weekly rent
            let maxRent = 490; // Default
            if (weeklyRentDisplay) {
                const rentText = weeklyRentDisplay.textContent;
                maxRent = parseInt(rentText.replace(/[^0-9]/g, '')) || 490;
            }
            
            console.log('Calling updateMap with:', {
                maxRent: maxRent,
                bedrooms: currentBedrooms,
                maxCommute: currentCommute
            });
            
            // Call the map update function
            if (typeof window.updateMap === 'function') {
                window.updateMap(maxRent, currentBedrooms, currentCommute);
                
                // Show loading message in recommendations
                const recList = document.getElementById('recommendations-list');
                if (recList) {
                    recList.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <div style="font-size: 20px; margin-bottom: 10px;">🔄</div>
                            <p>Filtering suburbs...</p>
                        </div>
                    `;
                }
            } else {
                console.error('ERROR: updateMap function not found!');
                alert('Map system is not ready. Please refresh the page.');
            }
        });
    }
    
    // ===== INITIALIZE =====
    // Set initial budget
    updateBudget();
    
    // Log success
    console.log('✅ Calculator initialized successfully');
    
    // Test: simulate a click to show initial data
    setTimeout(() => {
        if (calculateBtn) {
            console.log('Auto-clicking calculate button to show initial data...');
            calculateBtn.click();
        }
    }, 1000);
});