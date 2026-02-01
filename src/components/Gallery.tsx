"use client";

import { useEffect, useState } from "react";

type GalleryItem = {
  image: string;
  created_at: string;
  platform?: string;
  title?: string;
};

const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [manifestUnavailable, setManifestUnavailable] = useState(false);

  useEffect(() => {
    const loadManifest = async () => {
      try {
        const res = await fetch("/gallery/manifest.json", {
          cache: "no-store",
        });
        if (!res.ok) {
          console.error("Failed to load gallery manifest", res.statusText);
          setManifestUnavailable(true);
          return;
        }
        const data = (await res.json()) as GalleryItem[];
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        } else {
          setManifestUnavailable(true);
        }
      } catch (err) {
        console.error("Error fetching gallery manifest", err);
        setManifestUnavailable(true);
      } finally {
        setLoading(false);
      }
    };

    void loadManifest();
  }, []);

  const hasItems = items.length > 0;

  if (!loading && (manifestUnavailable || !hasItems)) {
    return null;
  }

  return (
    <section id="gallery" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Inspiration gallery
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground-accent">
            Sample posts that show what Booksolo creates – tailored to the
            client&apos;s business, product, or solo journey and aligned with
            their brand and logo colours when needed.
          </p>
        </div>

        {loading && (
          <p className="mt-10 text-center text-base text-foreground-accent">
            Gallery is loading…
          </p>
        )}

        {!loading && hasItems && (
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.image}
                className="flex flex-col items-start group"
              >
                <a
                  href={item.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full"
                >
                  <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100">
                    <div className="aspect-[16/9] w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title ?? "Example post from the gallery"}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </a>
                <div className="flex items-center gap-x-4 text-xs mt-4">
                  {item.created_at && (
                    <time
                      dateTime={item.created_at}
                      className="text-foreground-accent"
                    >
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  )}
                  {item.platform && (
                    <span className="relative z-10 rounded-full bg-primary/10 px-3 py-1.5 font-medium text-foreground-accent uppercase tracking-wide">
                      {item.platform}
                    </span>
                  )}
                </div>
                {item.title && (
                  <div className="group relative mt-3">
                    <h3 className="text-lg font-semibold leading-6 text-foreground group-hover:text-primary-accent transition-colors">
                      <a
                        href={item.image}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="absolute inset-0" />
                        {item.title}
                      </a>
                    </h3>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;

