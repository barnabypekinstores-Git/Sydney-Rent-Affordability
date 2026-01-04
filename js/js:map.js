// js/map.js - Map initialization and rendering
console.log('map.js loaded');

let map;
let markers = [];

// Initialize map
function initMap() {
    console.log('Initializing map...');
    
    // Check if map container exists
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) {
        console.error('ERROR: Cannot find #map-container element!');
        return;
    }
    
    // Create Leaflet map
    map = L.map('map-container').setView([-33.8688, 151.2093], 11);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    console.log('✅ Map initialized successfully');
    
    // Add scale control
    L.control.scale().addTo(map);
    
    // Show initial data
    if (window.sydneySuburbs) {
        console.log(`✅ Data loaded: ${sydneySuburbs.length} suburbs`);
        updateMap(490, 1, 45); // Show initial view
    } else {
        console.error('❌ No suburb data found!');
        // Show error marker
        L.marker([-33.8688, 151.2093])
            .bindPopup('Data not loaded. Check console.')
            .addTo(map);
    }
}

// Update map with filters
function updateMap(maxRent, bedrooms, maxCommute) {
    console.log(`🔄 Updating map: Rent ≤ $${maxRent}, ${bedrooms} bed, Commute ≤ ${maxCommute}min`);
    
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // Check if data exists
    if (!window.sydneySuburbs || !Array.isArray(sydneySuburbs)) {
        console.error('❌ No suburb data available');
        return;
    }
    
    // Filter suburbs based on criteria
    const filteredSuburbs = sydneySuburbs.filter(suburb => {
        // Get rent for selected bedroom count
        const suburbRent = suburb.medianRent[bedrooms] || suburb.medianRent["1"];
        
        // Check if suburb meets criteria
        const meetsRentCriteria = suburbRent <= maxRent;
        const meetsCommuteCriteria = suburb.commuteCBD <= maxCommute;
        
        return meetsRentCriteria && meetsCommuteCriteria;
    });
    
    console.log(`✅ Found ${filteredSuburbs.length} matching suburbs`);
    
    // Add markers for each matching suburb
    filteredSuburbs.forEach(suburb => {
        const rent = suburb.medianRent[bedrooms] || suburb.medianRent["1"];
        
        // Determine color based on affordability
        let color;
        const affordabilityRatio = rent / maxRent;
        
        if (affordabilityRatio < 0.7) {
            color = '#4CAF50'; // Green - Highly Affordable
        } else if (affordabilityRatio < 0.9) {
            color = '#FFC107'; // Yellow - Moderate
        } else {
            color = '#F44336'; // Red - Less Affordable
        }
        
        // Create custom icon
        const icon = L.divIcon({
            className: 'custom-marker',
            html: `
                <div style="
                    background-color: ${color};
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                "></div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        
        // Create marker
        const marker = L.marker([suburb.lat, suburb.lng], { icon })
            .addTo(map)
            .bindPopup(`
                <div style="min-width: 220px;">
                    <h3 style="margin: 0 0 10px 0; color: #333;">${suburb.name}</h3>
                    <div style="margin-bottom: 8px;">
                        <strong>${bedrooms}-bed rent:</strong> 
                        <span style="color: ${color}; font-weight: bold; font-size: 18px;">$${rent}</span>
                    </div>
                    <div style="margin-bottom: 5px;"><strong>Commute to CBD:</strong> ${suburb.commuteCBD} min</div>
                    <div style="margin-bottom: 5px;"><strong>Transport Score:</strong> ${suburb.transportScore}/10</div>
                    <div style="margin-bottom: 10px;"><strong>Postcode:</strong> ${suburb.postcode}</div>
                    <p style="font-style: italic; color: #666; margin: 0;">${suburb.description}</p>
                </div>
            `);
        
        markers.push(marker);
    });
    
    // Update recommendations list
    updateRecommendations(filteredSuburbs, bedrooms);
    
    // Adjust map view to show all markers
    if (filteredSuburbs.length > 0) {
        const bounds = L.latLngBounds(filteredSuburbs.map(s => [s.lat, s.lng]));
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
    } else {
        // If no matches, show Sydney area
        map.setView([-33.8688, 151.2093], 11);
        console.log('ℹ️ No suburbs match criteria. Showing Sydney area.');
    }
}

// Update recommendations list
function updateRecommendations(suburbs, bedrooms) {
    const container = document.getElementById('recommendations-list');
    if (!container) {
        console.error('Cannot find #recommendations-list element');
        return;
    }
    
    if (suburbs.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 30px; color: #666;">
                <i class="fas fa-search" style="font-size: 40px; margin-bottom: 15px; opacity: 0.5;"></i>
                <h4 style="color: #F44336;">No suburbs match your criteria</h4>
                <p>Try adjusting your budget or commute time</p>
            </div>
        `;
        return;
    }
    
    // Sort by rent (cheapest first)
    suburbs.sort((a, b) => {
        const rentA = a.medianRent[bedrooms] || a.medianRent["1"];
        const rentB = b.medianRent[bedrooms] || b.medianRent["1"];
        return rentA - rentB;
    });
    
    // Take top 5
    const top5 = suburbs.slice(0, 5);
    
    let html = '';
    top5.forEach((suburb, index) => {
        const rent = suburb.medianRent[bedrooms] || suburb.medianRent["1"];
        
        // Determine affordability color
        let dotColor = '#4CAF50'; // Default green
        if (index > 2) dotColor = '#FFC107'; // Yellow for middle
        if (index > 4) dotColor = '#F44336'; // Red for last
        
        html += `
            <div class="recommendation-item" style="
                background: white;
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 10px;
                border-left: 4px solid ${dotColor};
                box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            ">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="font-size: 16px;">${index + 1}. ${suburb.name}</strong>
                        <div style="color: #666; font-size: 14px; margin-top: 5px;">
                            ${suburb.postcode} • ${suburb.commuteCBD} min to CBD
                        </div>
                    </div>
                    <div style="font-weight: bold; color: #667eea; font-size: 18px;">
                        $${rent}
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Make functions available globally
window.updateMap = updateMap;

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
} else {
    // DOM already loaded
    initMap();
}

console.log('✅ map.js ready');