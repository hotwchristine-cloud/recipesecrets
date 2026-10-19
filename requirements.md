# Recipe Secrets Website Requirments

Build a complete, production-ready website for a restaurant called "Recipe Secrets."

## Restaurant details (use these in the copy)
- Cuisine/style: [e.g., modern Italian, family-style comfort food]
- Location: [address]
- Phone / email: [details]
- Opening hours: [e.g., Tue–Sun 11am–10pm, closed Mon]
- Vibe/brand personality: [e.g., warm, rustic, upscale but friendly]
- Tagline (or write one for me): [optional]

## Tech stack
- Plain HTML, CSS, and vanilla JavaScript. No frameworks, no build step.
- One shared stylesheet (styles.css) and one script (main.js).
- Folder structure: /index.html, /about.html, /specials.html, /reservations.html, /contact.html, /css, /js, /images.
- Must open and work correctly just by double-clicking index.html.

## Pages (exactly 5)
1. Home: full-screen hero with a striking food image, restaurant name, tagline, and two buttons ("Reserve a Table", "View Specials"). Below it: a short welcome section, a 3-item highlight strip (e.g., fresh ingredients, chef's recipes, cozy atmosphere), a teaser of 3 specials, a testimonials section, and a final call-to-action banner.
2. About: the restaurant's story, a "Meet the Chef" section with photo, values/philosophy, and an image gallery of the interior and dishes.
3. Specials: a visually rich grid of 6–9 dish cards, each with photo, name, short description, price, and tags (e.g., Vegetarian, Spicy, Chef's Pick). Optional filter buttons by category.
4. Reservations: a booking form with name, email, phone, date, time, party size (1–12), and special requests. Validate all fields in JavaScript, block past dates, and show a friendly confirmation message on submit. Leave a clearly commented spot to connect a form service like Formspree later.
5. Contact: address, phone, email, opening hours, an embedded Google Map iframe, a simple contact form, and social media links.

## Design requirements
- Visually striking and appetizing: rich, warm color palette (suggest one, e.g., deep burgundy, cream, gold accents), elegant serif font for headings and clean sans-serif for body (Google Fonts).
- Image-heavy: use high-quality food and restaurant photos from Unsplash (direct images.unsplash.com URLs) throughout every page. Every image needs descriptive alt text. Use object-fit: cover so images never stretch.
- Sticky navigation bar that highlights the current page and collapses into a hamburger menu on mobile.
- Consistent footer on every page with hours, contact info, social icons, and copyright.
- Subtle polish: hover effects on cards and buttons, smooth scrolling, and fade-in-on-scroll animations (use IntersectionObserver, respect prefers-reduced-motion).
- Fully responsive: test layouts at 375px, 768px, and 1440px widths.

## Quality bar
- Semantic HTML, accessible color contrast, keyboard-navigable menu and forms.
- Proper <title> and meta description on each page for SEO.
- Lazy-load images below the fold.
- Clean, commented code that a beginner could edit (e.g., where to change prices, photos, or hours).

## When finished
Give me a short summary of the file structure, how to preview the site locally, and a list of every place I should replace placeholder content (images, text, contact details) with my real information.
