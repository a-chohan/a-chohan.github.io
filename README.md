# Personal Portfolio: Web Design Document

**Live site:** `https://a-chohan.github.io/a-chohan/`
**Repository:** `https://github.com/a-chohan/a-chohan.github.io`

---

## 1. Project Overview

A single-page portfolio that presents me as an IT student aspiring to become a software engineer. Visitors can read my background, explore hands-on systems I built, download my resume, and contact me. The site uses plain HTML, CSS, and JavaScript with no frameworks, and is hosted on GitHub Pages.

## 2. Target Audience

Primary: hiring managers and recruiters(for example, internships and fellowships). Secondary: professors, Cybersecurity Club peers, and other students who might collaborate.

What they need: to understand who I am within seconds, see proof of skills, and find a way to contact me or get my resume with one click.

## 3. Content Strategy

### Part 1: Content (answers)

1. **Full name:** Ahad Chohan.
2. **Purpose of the website:** To show employers real evidence of my skills and make it easy to contact me or download my resume.
3. **Target audience:** Employers and recruiters first; professors and peers second.
4. **Skills to highlight:** Java
5. **Projects to showcase:** (FYI: THERE IS ONLY ONE PROJECT TO SHOWCASE FOR THE TIME BEING, I WILL ADD MORE ONCE THE OTHERS ARE COMPLETE.)
   - 3D Software Renderer
6. **Short professional bio:** "I'm a Computer Programming & Information Systems student at Farmingdale State College with an A.S. in Information Technology from Nassau Community College. I build software related to computer graphics, and I'm looking for an internship role and keep learning."
7. **Pages (sections):** Home, About, Projects, Contact. They live on one scrolling page with a sticky menu, so visitors never lose their place.
8. **Career goal:** Contribute to building rasterization software and operating systems.
9. **Technologies and tools:** Java, C, Python.
10. **Achievements and experience:**
    - A.S. in Information Technology, Nassau Community College (Dec 2024)
    - B.S. in progress, Farmingdale State College (expected Dec 2027)
    - Member of the Cybersecurity Club since October 2025
11. **Call to action:** Primary: "View my projects." Secondary: "Download resume (PDF)." Final: the contact form.
12. **Resume:** Yes, as a PDF because PDFs keep their layout on every device and employers expect them.
13. **Links:** GitHub, LinkedIn, and email (with a copy button).

## 4. Information Organization

| Section | Job it does | Content |
|---|---|---|
| Home | Say who I am and what I want in 5 seconds | Headline, one-paragraph summary, two buttons |
| About | Build trust | Bio, education, coursework, tools |
| Projects | Prove skills | Projects in a tabbed viewer |
| Contact | Convert visitors | Links, validated form, copy-email button |

Order follows a hiring manager's questions: who is this, can they do the work, how do I reach them.

## 5. Visual Design

### Part 2: Design (answers)

1. **Overall style:** Clean and professional with a technical feel: plenty of white space, strong headings, and one distinctive graphic.
2. **Color scheme:** Cool paper background (`#F3F6F9`), near-black ink (`#15202B`), and a deep teal accent (`#0B6B6B`). Teal reads as calm and technical, and avoids the red/blue "security cliche". A dark theme uses `#101820` with a lighter teal (`#5CC8C8`). Text pairs meet WCAG AA contrast.
3. **Fonts:** Bricolage Grotesque for headings (confident, a little distinctive) and Public Sans for body text (very readable at small sizes). Both are free on Google Fonts, with system fallbacks.
4. **Reflecting my field:** The project viewer is organized around real systems with screenshots included.
5. **Homepage layout:** Two columns on desktop (text left); stacked on mobile. See the wireframe below.
6. **Project organization:** One tab per project. Each panel has a title, a one-sentence description, a short list of what I configured, and tags for the tools used.
7. **Mobile-friendly:** Yes. The layout uses CSS Grid and `clamp()` for fluid type and spacing, a single breakpoint (52rem) collapses columns, and the menu becomes a toggle button. I test at 360px, 768px, and 1280px widths.
8. **Visual hierarchy:** Largest element is the headline, then the two buttons (filled teal for primary, outlined for secondary), then section headings, then body text. Color is reserved for actions and the current section.
9. **Consistency:** All colors, fonts, and spacing come from CSS variables defined once in `css/style.css`. Every section uses the same container width and padding.
10. **Accessibility:** Skip link; semantic landmarks (`header`, `nav`, `main`, `footer`); one `h1` and ordered headings; visible focus outlines; 17px base font with 1.65 line height; AA contrast in both themes; labeled form fields with error messages announced to screen readers; keyboard-operable tabs with arrow keys; `prefers-reduced-motion` respected; works without JavaScript (projects show as a list).
11. **Icons, images, illustrations:** No stock images. The only image is of the 3D Software Renderer so that loading times are minimal.
12. **Inspiration:**
    - Brittany Chiang's portfolio (https://brittanychiang.com): clear, sticky navigation and focused layout
    - Lee Robinson's site (https://leerob.com): minimal, text-first approach
    - Josh Comeau's site (https://www.joshwcomeau.com): thoughtful interactive details
	- SiteBuilderReport (https://www.sitebuilderreport.com/inspiration/software-engineer-portfolios): amazing layouts.

### Wireframes (desktop and mobile)

```
DESKTOP (1280px)
+----------------------------------------------------------+
| Ahad Chohan        Home  About  Projects  Contact [Dark] |
+----------------------------------------------------------+
|                                 |                        |
|                                 |                        |
|  Short summary paragraph...     |                        |
|  [View projects] [Resume PDF]   |                        |
|                                 |                        |
|                                 |                        |
|                                 |                        |
+----------------------------------------------------------+
|  ABOUT                                                   |
|  Bio paragraphs (left)   | Education / Coursework / Tools|
+----------------------------------------------------------+
|  PROJECTS                                                |
|  [Project 1] [Project 2]            <- tabs              |
|  +----------------------------------------------------+  |
|  | Project title, description, bullets, tool tags     |  |
|  +----------------------------------------------------+  |
+----------------------------------------------------------+
|  CONTACT                                                 |
|  Links + copy email (left) | Name / Email / Message form |
+----------------------------------------------------------+
|  footer                                                  |
+----------------------------------------------------------+

MOBILE (360px)
+--------------------+
| Ahad Chohan[Menu]  |
+--------------------+
| Headline           |
| Summary            |
| [View projects]    |
| [Resume PDF]       |
| Path diagram       |
+--------------------+
| About (stacked)    |
| Projects (tabs     |
|  wrap to 2 rows)   |
| Contact (stacked)  |
+--------------------+
```

## 6. Interaction and Functionality

### Part 3: Interactivity (answers)

1. **Interactive elements:** Responsive navigation menu with scroll highlighting, light/dark theme toggle, tabbed project viewer, copy-email button, and a contact form.
2. **Contact form:** Opens the visitor's email app with the message pre-filled (`mailto:`).
3. **JavaScript features (all in `js/main.js`):** mobile menu toggle with `aria-expanded`; theme toggle saved in `localStorage` (falls back to the system setting); tab widget with arrow-key support; scroll-spy using `IntersectionObserver`; form validation with inline errors; Clipboard API copy button; automatic footer year.
4. **Feedback to users:** Errors appear beside the field and focus moves to the first problem; the form shows a status message after sending; the copy button changes to "Copied"; the active tab and active nav link are visibly highlighted; buttons and links change on hover and focus.
5. **How interactivity improves the experience:** Tabs keep four projects short and scannable instead of one long page. The sticky menu and scroll highlighting show visitors where they are. Validation prevents wasted messages. The theme toggle respects reading preferences. Every feature has a keyboard path and the site still works if JavaScript fails.

## 7. Technical Overview

- **Files:** `index.html`, `css/style.css`, `js/main.js`, `assets/resume.pdf`, 'assets/img1.png'
- **Stack:** HTML5, CSS3 (custom properties, Grid, Flexbox), vanilla JavaScript (ES5-compatible)
- **Hosting:** GitHub Pages, served from the `main` branch root
- **Fonts:** Google Fonts (Bricolage Grotesque, Public Sans)
- **Browser support:** Current Chrome, Firefox, Safari, Edge; mobile Safari and Chrome
- **Code:** Written by hand for this project and commented section by section

### External resources used

- GitHub Pages guide: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- Google Fonts: https://fonts.google.com
- MDN Web Docs (HTML, CSS, JavaScript reference): https://developer.mozilla.org
- WCAG 2.2 quick reference: https://www.w3.org/WAI/WCAG22/quickref/
- WAI-ARIA Authoring Practices, Tabs pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- WebAIM contrast checker: https://webaim.org/resources/contrastchecker/

## 8. Timeline and Milestones

| Date | Milestone |
|---|---|
| Oct 27 | Finalize content answers, collect links, export resume to PDF, initial phase of development |
| Oct 28 | Continued development |
| Oct 29 | Test on phone and desktop; keyboard-only and screen reader check |
| Oct 29 | Run contrast and Lighthouse accessibility checks; fix issues |
| Oct 29 | Add wireframe image, finish README, confirm live URL works |
| Oct 30 | Create GitHub repo, add files, enable GitHub Pages |
| Oct 30 | Submit repo and website links on Brightspace |

## 9. Extra Credit

- **Accessible:** see Part 2, question 10.
- **Responsive:** see Part 2, question 7.
