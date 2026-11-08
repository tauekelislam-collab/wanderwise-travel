# WanderWise — Travel Recommendation Website

A responsive, standalone HTML/CSS/JavaScript travel recommendation website developed for the Coursera final project.

## Pages
- `index.html` — home page, navigation bar, search & clear, category cards, destination search results
- `about.html` — mission, company details, and team guidelines
- `contact.html` — contact information and validated email contact form (front-end demo)
- `style.css` — original responsive layout and styles
- `app.js` — searchable destination data and page interactions

## How to search
Open the website and enter **beach**, **temple** or **country** in the top search field. Each search displays at least two different recommendations, each with two images. Also try **Japan**, **Brazil**, **Thailand**, **Australia**, **Bali**, **Italy**, or **all**. Select **Clear** to reset.

## Publish with GitHub Pages
In this repository open **Settings → Pages → Build and deployment → Deploy from a branch**, choose **main** and **/(root)**, then Save.

After the deployment succeeds, the expected URL is:
https://tauekelislam-collab.github.io/wanderwise-travel/

## Coursera submission (20 points)
1. Public repository: https://github.com/tauekelislam-collab/wanderwise-travel
2. Home: https://tauekelislam-collab.github.io/wanderwise-travel/
3. About Us: https://tauekelislam-collab.github.io/wanderwise-travel/about.html
4. Contact Us: https://tauekelislam-collab.github.io/wanderwise-travel/contact.html
5. Copy the navigation HTML from `index.html`.
6. Screenshot search results for **beach** (two or more recommendations with photos).
7. Screenshot search results for **temple** (two or more recommendations with photos).
8. Screenshot search results for **country** (two or more recommendations with photos).

The links above are expected routes, not confirmation that Pages is deployed. Open each link and verify before submitting. Grading is determined by Coursera.

## Notes
The site needs no account, API key, build step, or paid package. Destination photos load from Unsplash and require internet connectivity. The Contact Us form validates input and shows a demo confirmation. It does not email submissions because no real destination inbox/backend is configured.

## Technical details
Vanilla HTML5, CSS3, JavaScript. Responsive and keyboard-accessible components. Search is case-insensitive, supports common synonyms, and does not use external APIs.
