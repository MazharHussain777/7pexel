// components/technology/SubCategoriesGrid.tsx
import Link from "next/link";
import { Icon, IconName } from "./icons";

interface SubCategory {
  id: string;
  name: string;
  icon: IconName;
  description: string;
  color?: string;
}

interface SubCategoriesGridProps {
  categorySlug: string;
  subCategories: SubCategory[];
  categoryColor: string;
  getSubCategoryCount: (id: string) => number;
}

export function SubCategoriesGrid({
  categorySlug,
  subCategories,
  categoryColor,
  getSubCategoryCount,
}: SubCategoriesGridProps) {
  if (subCategories.length === 0) return null;

  return (
    <section className="wrap mb-11" > {/* Removed mb-10 */}
      <div className="flex items-center gap-2.5 ">
        <span
          className="flex items-center justify-center w-8 h-8 rounded-[10px]"
          style={{ backgroundColor: `${categoryColor}14`, color: categoryColor }}
        >
          <Icon name="folder-open" size={16} />
        </span>
        <h2 className="font-fraunces font-medium text-[1.2rem] tracking-[-0.02em] text-[#011d24]">
          Explore <span className="text-[#033742]">Topics</span>
        </h2>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {subCategories.map((sub) => (
          <Link
            key={sub.id}
            href={`/technology/category/${categorySlug}/sub/${sub.id}`}
            title={sub.description}
            className="group inline-flex items-center gap-2 pl-2.5 pr-4 py-2 rounded-full border border-[#c5d8d2] bg-white text-[0.78rem] font-medium text-[#4a6a5a] transition-all duration-300 hover:border-[#033742] hover:bg-[#011d24] hover:text-white hover:shadow-[0_4px_12px_rgba(1,29,36,0.12)] active:scale-[0.97]"
          >
            <span
              className="flex items-center justify-center w-6 h-6 rounded-full bg-[#eef4f2] text-[#033742] transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white"
            >
              <Icon name={sub.icon} size={13} />
            </span>
            <span>{sub.name}</span>
            <span className="text-[0.62rem] font-jetbrains-mono text-[#4a6a5a] group-hover:text-white/70 transition-colors">
              {getSubCategoryCount(sub.id)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}