#!/usr/bin/env python3
import re

# Read the galleries.js file
with open('/Users/liri/portfoliriV2/src/Content/galleries.js', 'r') as file:
    content = file.read()

# Define album sections and their boundaries
albums = ['drawings', 'estrogen', 'wall', 'king', 'branding101', 'design101', 'illustrator', 'photoshop', 'miniatures', 'drawings-old', 'designs-old', 'corvus', 'horrorun', 'junana', 'complicube', 'uiux']

# For each album, find its section and update paths
for album in albums:
    # Find the album section
    pattern = f'{album}: {{[^}}]+}}'
    match = re.search(f'{album}: {{.*?(?=\\n  [a-zA-Z-]+:|\\n}};)', content, re.DOTALL)
    if match:
        section = match.group(0)
        # Update all src paths in this section that don't already have the album name
        updated_section = re.sub(
            r'src: "\./(?!' + album + r'/)([^"]+)"',
            f'src: "./{album}/\\1"',
            section
        )
        content = content.replace(section, updated_section)

# Write the updated content back
with open('/Users/liri/portfoliriV2/src/Content/galleries.js', 'w') as file:
    file.write(content)

print("Updated all image paths in galleries.js")