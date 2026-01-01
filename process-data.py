# process-data.py - Converts CSV to JSON for website
import pandas as pd
import json
import os

print("Starting NSW Rent Data Processing...")

# Paths - UPDATE IF YOUR CSV HAS DIFFERENT NAME
csv_file = "data/nsw-rent.csv"  
output_file = "js/real-data.js"

# Check if file exists
if not os.path.exists(csv_file):
    print(f"ERROR: Cannot find {csv_file}")
    print("Please make sure your CSV is in the 'data' folder")
    exit()

# Read CSV
try:
    data = pd.read_csv(csv_file)
    print(f"✓ Loaded {len(data)} rows from CSV")
    print(f"Columns found: {list(data.columns)}")
except Exception as e:
    print(f"ERROR reading CSV: {e}")
    exit()

# Simple processing - take first 50 postcodes for testing
unique_postcodes = data['Postcode'].unique()[:50]
print(f"Processing {len(unique_postcodes)} postcodes...")

website_data = []

for i, postcode in enumerate(unique_postcodes):
    postcode_data = data[data['Postcode'] == postcode]
    
    rents = {'1': 0, '2': 0, '3': 0, '4': 0}
    
    for _, row in postcode_data.iterrows():
        bedrooms = str(row['Number of Bedrooms'])
        rent_value = row['Median Weekly Rent for New Bonds\n$']
        
        if '1 Bedroom' in bedrooms:
            rents['1'] = int(rent_value)
        elif '2 Bedrooms' in bedrooms:
            rents['2'] = int(rent_value)
        elif '3 Bedrooms' in bedrooms:
            rents['3'] = int(rent_value)
        elif '4 or more' in bedrooms:
            rents['4'] = int(rent_value)
    
    # Create coordinates (spread around Sydney)
    lat = -33.8688 + (i % 10) * 0.02
    lng = 151.2093 + (i % 10) * 0.02
    
    website_data.append({
        'name': f'Postcode {postcode}',
        'postcode': str(postcode),
        'lat': round(lat, 4),
        'lng': round(lng, 4),
        'medianRent': rents,
        'commuteCBD': (i % 10) * 5 + 10,
        'transportScore': 7
    })

# Save as JavaScript file
js_content = f"""// NSW Rent Data - Generated from CSV
const realSydneyData = {json.dumps(website_data, indent=2)};
const sydneySuburbs = realSydneyData;

// Total: {len(website_data)} postcodes
// Source: {csv_file}
"""

with open(output_file, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"✓ Created {output_file} with {len(website_data)} postcodes")
print("✓ Data ready for website!")
print("\nNext: Update index.html to use 'real-data.js'")