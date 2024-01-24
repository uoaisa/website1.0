import os

directory_path = r'C:\Users\samue\python_work\Support Tools\website_tools\aisa\images'
images = []

for filename in os.listdir(directory_path):
    if filename.endswith('.png'):
        images.append(f'images/{filename}')

# Convert the list of image paths to a JavaScript-style array
js_array = '[' + ', '.join(["'" + image + "'" for image in images]) + ']'

print(js_array)
