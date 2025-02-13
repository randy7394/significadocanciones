#!/usr/bin/env python3

# Import required JSON module for handling JSON data
import json

# Define the input and output file paths
input_file = 'canciones.json'
output_file = 'canciones_sin_duplicados.json'

# Function to remove duplicates based on 'titulo' field
def remove_duplicates(data):
    # Create a dictionary to store unique entries
    # Using titulo as key to identify duplicates
    unique_entries = {}
    duplicates = []
    
    # Iterate through all entries in the data
    for entry in data:
        # Get the title from the current entry
        titulo = entry['titulo']
        
        # Check if we've seen this title before
        if titulo in unique_entries:
            duplicates.append(titulo)
        else:
            unique_entries[titulo] = entry
    
    # Return both the unique entries and the list of duplicates
    return list(unique_entries.values()), duplicates

# Main execution block
def main():
    try:
        # Read the input JSON file
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Remove duplicates from the data and get list of duplicates
        unique_data, duplicates = remove_duplicates(data)
        
        # Write the unique entries to a new JSON file
        with open(output_file, 'w', encoding='utf-8') as f:
            # Write with proper formatting and UTF-8 encoding
            json.dump(unique_data, f, ensure_ascii=False, indent=4)
        
        # Print success message with counts
        print(f"Original number of entries: {len(data)}")
        print(f"Number of entries after removing duplicates: {len(unique_data)}")
        print(f"Removed {len(duplicates)} duplicate entries")
        if duplicates:
            print("\nDuplicate titles found:")
            for title in duplicates:
                print(f"- {title}")
        print(f"\nResults saved to {output_file}")

    except Exception as e:
        print(f"An error occurred: {str(e)}")

# Execute the main function if script is run directly
if __name__ == "__main__":
    main()
