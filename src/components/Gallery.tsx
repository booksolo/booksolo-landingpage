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

  useEffect(() => {
    const loadManifest = async () => {
      try {
        const res = await fetch("/gallery/manifest.json", {
          cache: "no-store",
        });
        if (!res.ok) {
          console.error("Failed to load gallery manifest", res.statusText);
          return;
        }
        const data = (await res.json()) as GalleryItem[];
        setItems(data);
      } catch (err) {
        console.error("Error fetching gallery manifest", err);
      } finally {
        setLoading(false);
      }
    };

    void loadManifest();
  }, []);

  const hasItems = items.length > 0;

  if (!loading && !hasItems) {
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
        Real posts created for the @booksolo.ai profiles.
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

