

## "Clone Yourself" Webinar Funnel

### Pages
1. **Landing Page** (`/`) — Dark-themed, high-conversion webinar registration funnel
2. **Thank You Page** (`/thank-you`) — Post-registration confirmation with calendar add link

### Landing Page Sections
- **Hero**: Bold headline + subheadline about leveraging AI with what you already know, countdown timer to webinar date, prominent CTA button
- **Problem**: Pain points — AI overwhelm, constant change, not knowing where to start
- **Solution**: Introduce the webinar as the bridge to the AI Challenge
- **What You'll Learn**: 3-4 key takeaways in card format
- **About the Speaker**: Photo placeholder + bio section
- **Registration Form**: Name + email, clean validation, submits to Supabase
- **FAQ**: Accordion with common questions
- **Footer**: Privacy policy link, terms link, copyright

### Thank You Page
- Confirmation message with webinar details (date, time, link placeholder)
- "Add to Calendar" button (generates .ics file)
- Social sharing options
- Teaser for the AI Challenge

### Design System
- **Background**: Near-black (`#0d0d0d`), white text, blue accent (`#498cdf`)
- **Font**: Inter (Google Fonts), JetBrains Mono for code/numbers
- **Components**: Rounded-md buttons, clean cards, glass-effect modals
- **Animations**: Subtle Framer Motion scroll reveals

### Backend (Lovable Cloud / Supabase)
- **`registrants` table**: id, name, email, registered_at, webinar_date — with unique constraint on email
- **RLS**: Insert-only for anonymous users (registration), service-role for admin reads
- **Resend Edge Function**: Sends confirmation email on registration (will set up Resend API key)
- **Countdown timer**: Hardcoded webinar date/time, live countdown on the page

### Compliance
- Cookie consent banner
- Privacy policy page (linked from footer)
- Clear consent checkbox on registration form for marketing emails
- GDPR/CCPA compliant data collection notice

### Performance
- Lazy-loaded sections with Framer Motion
- Optimized font loading with `display=swap`
- Minimal JS bundle — no unnecessary dependencies

