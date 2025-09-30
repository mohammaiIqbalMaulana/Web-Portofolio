# Task: Fix Mobile and Tablet Layout and Hover Effect in Project Section

## Steps

1. Edit `frontend/src/components/ui/ProjectCard.tsx`
   - Add state to toggle hover content visibility on tap/click for touch devices.
   - Detect touch devices or use screen width to enable this behavior.
   - Always show hover content on small screens using CSS or conditional rendering.
   - Ensure the UI is neat and usable on mobile/tablet.
   - Adjust styles if needed for better mobile/tablet appearance.

2. Edit `frontend/src/components/sections/ProjectsSection.tsx`
   - Adjust grid layout for mobile/tablet (e.g., grid columns, gaps).
   - Adjust container padding, margins, and spacing for neatness.
   - Adjust font sizes or other UI elements if needed for better appearance.

3. Test changes on mobile and tablet viewports to ensure:
   - Layout is neat and tidy.
   - Hover content is accessible on touch devices via tap toggle or always visible.
   - No visual glitches or usability issues.

4. Final review and cleanup.

## Notes
- Use Tailwind CSS responsive utilities for layout adjustments.
- Use framer-motion and React state for hover/tap effects.
