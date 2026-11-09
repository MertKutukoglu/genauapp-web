import { LegalLayout } from "@/components/templates/LegalLayout/LegalLayout";

export const metadata = {
  title: "Cookie Policy",
  description: "Cookie policy for GenauApp",
};

export default function CookiePolicyPage() {
  return (
    <LegalLayout>
      <span className="eyebrow">Legal · Cookies</span>
      <h1>Cookie Policy</h1>
      <p className="meta">Last updated: 1 November 2026</p>

      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files that are placed on your computer or
        mobile device when you visit a website. They help the website remember
        your preferences and improve your browsing experience.
      </p>

      <h2>How we use cookies</h2>
      <p>We use cookies to:</p>
      <ul>
        <li>Remember your login information</li>
        <li>Understand how you use our application</li>
        <li>Improve your experience on our platform</li>
        <li>Provide personalized content and features</li>
      </ul>

      <h2>Types of cookies we use</h2>

      <h3>🔒 Necessary cookies</h3>
      <p>
        These cookies are essential for the website to function properly. They
        enable core functionality such as security, network management, and
        accessibility.
      </p>

      <h3>📊 Statistics cookies</h3>
      <p>
        These cookies help us understand how visitors interact with our website
        by collecting and reporting information anonymously (e.g., Firebase
        Analytics).
      </p>

      <h3>🎯 Marketing cookies</h3>
      <p>
        These cookies are used to track visitors across websites to display ads
        that are relevant and engaging for the individual user.
      </p>

      <h2>Manage your cookie preferences</h2>
      <p>
        You can change your cookie preferences at any time through your browser
        settings, or by contacting us.
      </p>

      <h2>Contact us</h2>
      <p>
        If you have any questions about our use of cookies, please contact us
        at <a href="mailto:info@genauapp.com">info@genauapp.com</a>.
      </p>
    </LegalLayout>
  );
}
