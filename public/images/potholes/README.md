# Pothole Images Directory

This folder contains local JPG/PNG image files for pothole detections.

## Required Images

Place the following image files in this directory:

1. **dhaka-gulshan.jpg** (or .png) - For hazard ID 1 (Gulshan, Dhaka)
2. **sylhet.jpg** (or .png) - For hazard ID 3 (Sylhet City)
3. **khulna.jpg** (or .png) - For hazard ID 5 (Khulna City)
4. **comilla.jpg** (or .png) - For hazard ID 7 (Comilla City)

## File Format

- **Supported formats**: JPG, JPEG, PNG
- **Recommended size**: 400-800px width for optimal performance
- **File naming**: Use lowercase with hyphens (e.g., `dhaka-gulshan.jpg`)

## Adding New Images

When adding new pothole images:

1. Save the image file in this directory (`public/images/potholes/`)
2. Update the `imageUrl` in `src/data/mockData.ts` to reference the new file:
   ```typescript
   imageUrl: '/images/potholes/your-image-name.jpg'
   ```

## Current Image Paths

The following image paths are configured in `src/data/mockData.ts`:
- `/images/potholes/dhaka-gulshan.jpg`
- `/images/potholes/sylhet.jpg`
- `/images/potholes/khulna.jpg`
- `/images/potholes/comilla.jpg`

**Note**: Make sure the file extensions match (`.jpg` or `.png`) in both the file name and the code.
