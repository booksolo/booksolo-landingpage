 "use client";

import { useEffect, useState } from "react";

type GalleryItem = {
  image: string;
  created_at: string;
  platform?: string;
  title?: string;
};

const fallbackItems: GalleryItem[] = [
  {
    image: "/images/mockup-1.webp",
    created_at: "2026-01-20T10:00:00Z",
    platform: "instagram",
    title: "Product highlight",
  },
  {
    image: "/images/mockup-2.webp",
    created_at: "2026-01-19T10:00:00Z",
    platform: "instagram",
    title: "Feature spotlight",
  },
  {
    image: "/images/hero-mockup.webp",
    created_at: "2026-01-18T10:00:00Z",
    platform: "instagram",
    title: "Launch teaser",
  },
  {
    image: "/images/hero-transactions.webp",
    created_at: "2026-01-17T10:00:00Z",
    platform: "instagram",
    title: "Solo journey update",
  },
  {
    image: "/images/hero-chart.webp",
    created_at: "2026-01-16T10:00:00Z",
    platform: "instagram",
    title: "Growth snapshot",
  },
  {
    image: "/images/testimonial-1.webp",
    created_at: "2026-01-15T10:00:00Z",
    platform: "instagram",
    title: "Customer quote",
  },
];

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
          if (res.status === 403 || res.status === 404) {
            setManifestUnavailable(true);
          } else {
            setItems(fallbackItems);
          }
          return;
        }
        const data = (await res.json()) as GalleryItem[];
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        } else {
          setItems(fallbackItems);
        }
      } catch (err) {
        console.error("Error fetching gallery manifest", err);
        setItems(fallbackItems);
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
    <section
      id="gallery"
      className="mt-24 border-t border-slate-200 pt-12 pb-12"
    >
      <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        Inspiration gallery
      </h2>
      <p className="mt-2 text-center text-sm text-slate-600">
        Sample posts that show what Booksolo creates – tailored to the
        client&apos;s business, product, or solo journey and aligned with their
        brand and logo colours when needed.
      </p>

      {loading && (
        <p className="mt-6 text-center text-sm text-slate-500">
          Gallery is loading…
        </p>
      )}

      {!loading && hasItems && (
        <div className="mt-8 grid max-w-5xl mx-auto grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <a
              key={item.image}
              href={item.image}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title ?? "Example post from the gallery"}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {(item.title || item.platform) && (
                  <figcaption className="border-t border-slate-200 px-4 py-2 text-xs text-slate-600">
                    {item.title}
                    {item.platform && (
                      <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-700">
                        {item.platform}
                      </span>
                    )}
                  </figcaption>
                )}
              </figure>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default Gallery;

