import { notFound } from "next/navigation";
import Link from "next/link";
import NextImage from "next/image";
import { volumes, getVolumeBySlug } from "@/data/categories";
import CategoryCardWithLocal from "@/components/CategoryCardWithLocal";

export function generateStaticParams() {
  return volumes.map((v) => ({ slug: v.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const volume = getVolumeBySlug(slug);

  if (!volume) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-tile bg-tile-diamond relative">
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto min-h-screen">
          {/* Header — 메인과 동일 */}
          <header className="px-8 pt-10 pb-6">
            <nav className="flex items-center mb-8">
              <Link href="/" className="flex items-center hover:opacity-70 transition-opacity">
                <NextImage
                  src="/comma-logo.png"
                  alt="comma"
                  width={28}
                  height={28}
                  className="object-contain -mr-1"
                  style={{ width: 28, height: 28 }}
                />
                <span
                  className="font-serif text-lg font-semibold"
                  style={{ color: "#2C2C2C" }}
                >
                  comma,
                </span>
              </Link>
            </nav>
          </header>

          {/* Card News */}
          <section className="px-6 pb-10">
            <CategoryCardWithLocal volume={volume} />
          </section>
        </div>
      </div>
    </div>
  );
}
