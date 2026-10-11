# Contact Form Setup Guide

The "Start a Project" contact form is now integrated into the GROWW TECH website. To enable email delivery, you need to configure Resend as your email provider.

## Files Changed

1. **src/components/layout/site-header.tsx** - Added "Start a Project" button to navbar (desktop and mobile)
2. **src/components/sections/final-cta.tsx** - Added "Start a Project" button to the final CTA section
3. **src/components/sections/contact.tsx** - Created new contact section with the form
4. **src/app/page.tsx** - Added Contact section to the main page
5. **.env.example** - Created environment variable template

## Email Provider Setup (Resend)

The contact form uses [Resend](https://resend.com) for email delivery. Resend is a secure, modern email API that requires no additional npm dependencies.

### Step 1: Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Verify Your Sender Domain

1. In Resend, go to **Domains** or **Senders**
2. Add your domain (e.g., `groww.tech`) or verify a single email address
3. Follow the DNS verification steps if using a custom domain
4. Wait for the domain/email to be verified (this may take a few minutes)

### Step 3: Get Your API Key

1. In Resend, go to **API Keys**
2. Click **Create API Key**
3. Give it a name (e.g., "GROWW TECH Website")
4. Copy the generated API key (starts with `re_`)

### Step 4: Configure Environment Variables

Create a `.env.local` file in the project root (next to `package.json`) and add:

```env
RESEND_API_KEY=re_your_actual_api_key_here
CONTACT_FROM_EMAIL=GROWW TECH <hello@groww.tech>
CONTACT_TO_EMAIL=growwurself@gmail.com
```

**Important:**
- Replace `re_your_actual_api_key_here` with your actual Resend API key
- The `CONTACT_FROM_EMAIL` must match a verified sender in your Resend account
- `CONTACT_TO_EMAIL` is optional - it defaults to `growwurself@gmail.com`
- Never commit `.env.local` to Git (it's already in `.gitignore`)

### Step 5: Restart the Development Server

After adding the environment variables, restart your Next.js server:

```bash
npm run dev
```

## Testing the Contact Form

1. Navigate to the contact section (click "Start a Project" in navbar or scroll to the section)
2. Fill out the form with test data
3. Submit and check the recipient email for the inquiry
4. Verify the email formatting and content

## Security Features

The contact form includes several security measures:

- **Honeypot field**: Hidden field that bots fill but humans don't
- **Timing trap**: Rejects submissions completed too quickly (< 2 seconds)
- **Rate limiting**: 5 submissions per 10 minutes per IP address
- **Input sanitization**: Strips control characters and limits field lengths
- **Server-side validation**: All fields are validated on the server
- **Environment variables**: API keys are never exposed to the client

## Error Handling

If email delivery is not configured, the form will display an error message:
- "Email delivery is not configured yet. Please set the server environment variables RESEND_API_KEY and CONTACT_FROM_EMAIL."

This ensures users are never falsely told their inquiry was sent when it wasn't.

## Form Fields

The contact form collects:
- Full name (required, max 100 characters)
- Email address (required, validated format)
- Project type (required): Website, SaaS Application, E-commerce, AI Integration, Custom Software, Other
- Estimated budget (optional): Not sure yet, Under $1,000, $1,000–$5,000, etc.
- Project description (required, min 20 characters, max 5000)

## Privacy Note

The form includes a privacy note: "Your details are used only to respond to your project inquiry."

No mobile number is requested or stored.
