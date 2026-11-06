import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site, telHref } from "@/lib/site";
import { Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Notice",
  description: "How GetNorth Media & AI Solutions handles information submitted through this website.",
  path: "/privacy",
});

/*
 * NOTE FOR THE COMPANY: this is a plain-language starting point, not legal advice.
 * Please have it reviewed (e.g. against India's Digital Personal Data Protection Act, 2023)
 * and update it if analytics, cookies or additional data processors are added.
 */
export default function PrivacyPage() {
  return (
    <section className="pt-[132px] pb-24 sm:pt-[152px] sm:pb-32">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="font-heading mt-6 text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.02] font-extrabold">Privacy notice</h1>
          <div className="mt-10 space-y-8 text-lg leading-relaxed text-ink/85 [&_h2]:font-heading [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink">
            <p>
              This notice explains how {site.name} (&ldquo;GetNorth&rdquo;, &ldquo;we&rdquo;) handles information you
              share with us through this website.
            </p>

            <h2>Information we collect</h2>
            <p>
              When you submit our enquiry form we receive the details you provide: your name, company, email address,
              phone number, the service and industry you select, budget and timeline preferences, and your project
              requirements. If you contact us on WhatsApp or by phone, we receive the information you share in that
              conversation.
            </p>

            <h2>How we use it</h2>
            <p>
              We use this information only to respond to your enquiry, discuss your requirements and, if you choose
              to work with us, deliver our services. We do not sell your personal information.
            </p>

            <h2>Service providers</h2>
            <p>
              Our website is hosted by a third-party provider, and enquiries may be delivered to us through email or
              workflow services. The map on our contact page is provided by Google Maps, and WhatsApp conversations
              are handled by WhatsApp (Meta). These providers process data under their own privacy policies.
            </p>

            <h2>Retention</h2>
            <p>
              We keep enquiry information for as long as needed to respond and to maintain a record of our business
              communication, after which it is deleted.
            </p>

            <h2>Your choices</h2>
            <p>
              You can ask us to access, correct or delete the information you have shared with us by contacting us on{" "}
              <a href={telHref} className="font-semibold underline underline-offset-4">
                {site.phone.display}
              </a>
              {site.email ? (
                <>
                  {" "}or{" "}
                  <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-4">
                    {site.email}
                  </a>
                </>
              ) : null}
              .
            </p>

            <p className="text-base text-stone">Last updated: November 2026.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
