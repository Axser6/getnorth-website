"use client";

import { useEffect } from "react";
import { Container, Eyebrow, buttonClass } from "@/components/ui";
import { site, telHref, whatsappHref } from "@/lib/site";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center pt-[120px] pb-24">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Something went wrong</Eyebrow>
          <h1 className="font-heading mt-5 text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.02] font-extrabold">
            We hit an unexpected problem.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-stone">
            Please try again. If the problem continues, you can reach us directly on WhatsApp or by phone at{" "}
            {site.phone.display}.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button type="button" onClick={reset} className={buttonClass("dark")}>
              Try again
            </button>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={buttonClass("outline")}>
              WhatsApp us
            </a>
            <a href={telHref} className={buttonClass("outline")}>
              Call us
            </a>
          </div>
          {error.digest && <p className="mt-8 font-mono text-xs text-stone">Reference: {error.digest}</p>}
        </div>
      </Container>
    </section>
  );
}
