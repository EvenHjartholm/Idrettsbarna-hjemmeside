import os
from PIL import Image
import sys

def process_logo(input_path, output_path):
    try:
        img = Image.open(input_path)
        
        # Convert to RGBA
        img = img.convert("RGBA")
        
        # Get dimensions
        width, height = img.size
        
        # 1. Crop the bottom 20% to remove text
        # The text is at the bottom. Let's crop to 80% height.
        crop_height = int(height * 0.8)
        img = img.crop((0, 0, width, crop_height))
        
        # 2. Find bounding box of content (non-black pixels)
        # Since it's a drawing on black, we can treat dark pixels as background.
        # Or better, just crop to the bounding box of non-black pixels.
        # Let's assume background is black (0,0,0).
        
        # Create a mask for non-black pixels
        # Threshold: sum of RGB > 30 (to avoid compression artifacts)
        datas = img.getdata()
        newData = []
        non_transparent_pixels = []
        
        for i, item in enumerate(datas):
            # item is (r,g,b,a)
            # Check if pixel is "black-ish"
            if item[0] < 30 and item[1] < 30 and item[2] < 30:
                # Make it transparent
                newData.append((0, 0, 0, 0))
            else:
                newData.append(item)
                # Track coordinates of non-transparent pixels for cropping
                x = i % width
                y = i // width
                non_transparent_pixels.append((x, y))
        
        img.putdata(newData)
        
        # Crop to content
        if non_transparent_pixels:
            min_x = min(p[0] for p in non_transparent_pixels)
            max_x = max(p[0] for p in non_transparent_pixels)
            min_y = min(p[1] for p in non_transparent_pixels)
            max_y = max(p[1] for p in non_transparent_pixels)
            
            img = img.crop((min_x, min_y, max_x + 1, max_y + 1))
        
        # 3. Square it up
        w, h = img.size
        new_size = max(w, h)
        new_img = Image.new("RGBA", (new_size, new_size), (0, 0, 0, 0))
        
        # Paste centered
        x_offset = (new_size - w) // 2
        y_offset = (new_size - h) // 2
        new_img.paste(img, (x_offset, y_offset))
        
        # Save
        new_img.save(output_path, "PNG")
        print(f"Successfully processed logo to {output_path}")
        
    except Exception as e:
        print(f"Error processing image: {e}")
        sys.exit(1)

if __name__ == "__main__":
    input_file = r"C:/Users/evenh/.gemini/antigravity/brain/f856e19f-dd97-4835-b917-c178449c94e0/uploaded_image_1764148185545.jpg"
    output_file = "public/favicon.png"
    process_logo(input_file, output_file)
