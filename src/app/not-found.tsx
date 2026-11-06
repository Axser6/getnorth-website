import type { Metadata } from "next";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { LogoMark } from "@/components/logo";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="bg-meridian flex min-h-[80vh] items-center pt-[120px] pb-24">
      <Container>
        <div className="max-w-2xl">
          <LogoMark className="h-14 w-14 rotate-[135deg]" />
          <Eyebrow className="mt-10">Error 404</Eyebrow>
          <h1 className="font-wide mt-5 text-[clamp(2.4rem,6vw,4.5rem)] leading-[1] font-extrabold">
            This page is off the map.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-stone">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on course.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/" variant="dark" arrow>
              Back to home
            </ButtonLink>
            <ButtonLink href="/services" variant="outline">
              View services
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact us
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
