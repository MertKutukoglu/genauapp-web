import { LegalLayout } from "@/components/templates/LegalLayout/LegalLayout";

export const metadata = {
  title: "Datenschutz",
  description: "Privacy policy for GenauApp",
  alternates: {
    canonical: "/datenschutz",
    languages: {
      en: "/datenschutz",
      tr: "/tr/gizlilik",
      "x-default": "/datenschutz",
    },
  },
};

export default function DatenschutzPage() {
  return (
    <LegalLayout>
      <span className="eyebrow">Legal · GDPR / UK GDPR</span>
      <h1>Privacy Policy</h1>
      <p className="meta">Last updated: 12 November 2025</p>

      <p>
        This Privacy Notice for <strong>Mert Kuetuekoglu</strong> (doing
        business as <strong>Genau App</strong>) — &quot;we&quot;,
        &quot;us&quot;, or &quot;our&quot; — describes how and why we might
        access, collect, store, use, and/or share (&quot;process&quot;) your
        personal information when you use our Services, including when you:
      </p>
      <ul>
        <li>
          Visit our website at{" "}
          <a href="https://genauapp.io/">https://genauapp.io/</a>, or any
          website of ours that links to this Privacy Notice
        </li>
        <li>
          Download and use our mobile application (Genau App), or any other
          application of ours that links to this Privacy Notice
        </li>
        <li>
          Use Genau App — an online educational platform designed to assist
          users in expanding their German vocabulary, particularly in
          preparation for TELC exams
        </li>
        <li>
          Engage with us in other related ways, including any sales, marketing,
          or events
        </li>
      </ul>

      <h2>1. What information do we collect?</h2>
      <h3>Personal information you disclose to us</h3>
      <p>
        We collect personal information that you voluntarily provide to us
        when you register on the Services, express an interest in obtaining
        information about us or our products and Services, when you participate
        in activities on the Services, or otherwise when you contact us. The
        personal information we collect may include:
      </p>
      <ul>
        <li>Names</li>
        <li>Email addresses</li>
        <li>Phone numbers</li>
        <li>Job titles</li>
        <li>Usernames</li>
        <li>Passwords</li>
        <li>Contact or authentication data</li>
        <li>Contact preferences</li>
        <li>Billing addresses</li>
        <li>Debit/credit card numbers</li>
      </ul>

      <h3>Sensitive information</h3>
      <p>
        When necessary, with your consent or as otherwise permitted by
        applicable law, we process the following categories of sensitive
        information: information revealing race or ethnic origin, and student
        data.
      </p>

      <h3>Payment data</h3>
      <p>
        The Services provided are free of charge for the Beta version. We may
        collect data necessary to process your payment if you choose to make
        purchases. All payment data is handled and stored by PayPal (Europe)
        S.à r.l. et Cie, S.C.A.
      </p>

      <h3>Social media login data</h3>
      <p>
        We may provide you with the option to register with us using your
        existing social media account details, like your Facebook, X, or other
        social media account.
      </p>

      <h3>Application data</h3>
      <p>
        If you use our application(s), we may also collect: geolocation
        information from your mobile device; access to Bluetooth, camera,
        contacts, microphone, reminders, calendar; device ID, model,
        manufacturer, operating system, browser information, IP address; push
        notification tokens.
      </p>

      <h3>Information automatically collected</h3>
      <p>
        Log and usage data (IP address, device information, browser type,
        timestamps, pages viewed, searches), device data (hardware model,
        operating system), and precise or imprecise location data.
      </p>

      <h2>2. How do we process your information?</h2>
      <p>
        We process your personal information for a variety of reasons,
        including: facilitating account creation and authentication; responding
        to user inquiries; sending administrative information; enabling
        user-to-user communications; requesting feedback; sending marketing
        communications (where opted in); delivering targeted advertising;
        protecting the Services through fraud monitoring; identifying usage
        trends; measuring marketing effectiveness; protecting an
        individual&apos;s vital interest.
      </p>

      <h2>3. What legal bases do we rely on?</h2>
      <p>
        The GDPR and UK GDPR require us to explain the valid legal bases we
        rely on:
      </p>
      <ul>
        <li>
          <strong>Consent</strong> — you have given us permission to use your
          personal information for a specific purpose
        </li>
        <li>
          <strong>Performance of a contract</strong> — necessary to fulfill
          contractual obligations
        </li>
        <li>
          <strong>Legitimate interests</strong> — to achieve our legitimate
          business interests while respecting your rights
        </li>
        <li>
          <strong>Legal obligations</strong> — compliance with legal
          requirements
        </li>
        <li>
          <strong>Vital interests</strong> — to protect your vital interests or
          those of a third party
        </li>
      </ul>

      <h2>4. When and with whom do we share your information?</h2>
      <p>
        We may share your data with third-party vendors, service providers,
        contractors, or agents who perform services for us. The categories of
        third parties include: Affiliate Marketing Programs, AI Platforms, Ad
        Networks, Cloud Computing Services, Communication &amp; Collaboration
        Tools, Data Analytics Services, Data Storage Service Providers, Payment
        Processors, Performance Monitoring Tools, Social Networks, User Account
        Registration &amp; Authentication Services, Website Hosting Service
        Providers.
      </p>
      <p>
        We may also share information during business transfers, with
        affiliates (parent company, subsidiaries, joint ventures), with
        business partners, and with other users where you share information in
        public areas.
      </p>

      <h2>5. Do we use cookies and other tracking technologies?</h2>
      <p>
        Yes. These help us maintain security, prevent crashes, fix bugs, save
        preferences, and assist with site functions. See the{" "}
        <a href="/cookie-policy">Cookie Policy</a> for the detail.
      </p>

      <h3>Google Analytics</h3>
      <p>
        We use Google Analytics (Google Ireland Limited) to analyze user
        interactions. Google Analytics uses cookies to collect data such as
        device information, browser type, IP address (anonymized within the
        EU), referrer URL, pages visited, and time spent. You can opt out:{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener"
        >
          Google Analytics Opt-out
        </a>
        . Legal basis: Art. 6(1)(a) GDPR — consent via our cookie banner.
      </p>

      <h3>Hotjar</h3>
      <p>
        We use Hotjar (Hotjar Ltd., Malta) to understand how users interact
        with our website: mouse movements, clicks, scroll behavior, session
        recordings, heatmaps, device type, screen resolution, browser type,
        language, country-level geolocation. All data is pseudonymized.{" "}
        <a
          href="https://www.hotjar.com/legal/compliance/opt-out"
          target="_blank"
          rel="noopener"
        >
          Hotjar Opt-out
        </a>
        . Legal basis: Art. 6(1)(a) GDPR — consent via our cookie banner.
      </p>

      <h2>6. Do we offer AI-based products?</h2>
      <p>
        Yes. We provide AI Products through third-party service providers
        including <strong>Anthropic</strong>, <strong>OpenAI</strong>, and{" "}
        <strong>Google Cloud AI</strong>. Your input, output, and personal
        information will be shared with these providers to enable your use of
        AI Products. Features: natural language processing, AI insights, AI
        translation. To opt out of AI data processing, contact us.
      </p>

      <h2>7. How do we handle your social logins?</h2>
      <p>
        If you register using a third-party social account (Facebook, X), we
        receive certain profile information including your name, email, friends
        list, and profile picture. We use this only for purposes described in
        this Privacy Notice.
      </p>

      <h2>8. How long do we keep your information?</h2>
      <p>
        We keep personal information only for as long as necessary for the
        purposes in this Privacy Notice, unless a longer retention period is
        required by law. When we no longer have a legitimate business need to
        process your information, we will delete or anonymize it.
      </p>

      <h2>9. How do we keep your information safe?</h2>
      <p>
        We have implemented appropriate technical and organizational security
        measures. However, no electronic transmission is 100% secure. You
        should only access the Services within a secure environment.
      </p>

      <h2>10. Do we collect information from minors?</h2>
      <p>
        We do not knowingly collect data from, or market to, children under 18.
        If we learn that personal information from users under 18 has been
        collected, we will deactivate the account and delete such data.
        Contact:{" "}
        <a href="mailto:mertkutukoglu@genauapp.io">
          mertkutukoglu@genauapp.io
        </a>
        .
      </p>

      <h2>11. What are your privacy rights?</h2>
      <p>
        In some regions (EEA, UK, Switzerland), you have rights including:
        access and a copy of your personal information; rectification or
        erasure; restriction of processing; data portability; objection to
        processing; not to be subject to automated decision-making.
      </p>
      <p>
        If you are located in the EEA or UK and believe we are unlawfully
        processing your information, you have the right to complain to your
        data protection authority. You can withdraw consent at any time; this
        will not affect processing lawfulness before withdrawal.
      </p>

      <h2>12. Controls for Do-Not-Track features</h2>
      <p>
        Most web browsers include a Do-Not-Track (&quot;DNT&quot;) feature. No
        uniform technology standard for recognizing DNT signals has been
        finalized. As such, we do not currently respond to DNT browser signals.
      </p>

      <h2>13. Do we make updates to this notice?</h2>
      <p>
        We may update this Privacy Notice from time to time. The updated
        version will be indicated by an updated &quot;Revised&quot; date. We
        encourage you to review this notice frequently.
      </p>

      <h2>14. How can you contact us about this notice?</h2>
      <p>
        If you have questions or comments, you may contact our Data Protection
        Officer (DPO):
      </p>
      <p>
        Mert Kuetuekoglu<br />
        Data Protection Officer<br />
        Kantstraße 73<br />
        10627 Berlin, Germany<br />
        <a href="mailto:mertkutukoglu@genauapp.io">
          mertkutukoglu@genauapp.io
        </a>
      </p>

      <h2>15. How can you review, update, or delete the data we collect?</h2>
      <p>
        Based on the applicable laws of your country, you may request access to
        the personal information we collect, correct inaccuracies, or delete
        your personal information. You may also have the right to withdraw your
        consent. Contact us for a data subject access request.
      </p>
    </LegalLayout>
  );
}
