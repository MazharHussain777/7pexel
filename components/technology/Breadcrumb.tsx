// components/technology/Breadcrumb.tsx
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
  className?: string;
  showHome?: boolean;
  homeLabel?: string;
}

export function Breadcrumb({ 
  items, 
  separator = "/", 
  className = "",
  showHome = true,
  homeLabel = "Home"
}: BreadcrumbProps) {
  // Add home item if showHome is true
  const allItems = showHome 
    ? [{ label: homeLabel, href: "/" }, ...items]
    : items;

  return (
    <nav 
      className={`flex items-center gap-2 text-[0.8rem] text-[#5a7a6a] flex-wrap ${className}`} 
      aria-label="Breadcrumb"
    >
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;
        
        return (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span 
                className="text-[#c5d8d2] select-none text-[0.7rem] font-light" 
                aria-hidden="true"
              >
                {separator}
              </span>
            )}
            
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="group hover:text-[#011d24] transition-all duration-200"
              >
                <span className="font-medium hover:underline underline-offset-4 decoration-[#3a8b9a]/30">
                  {item.label}
                </span>
              </Link>
            ) : (
              <span className="text-[#011d24] font-semibold">
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

// ─── VARIANT: With Tooltip ──────────────────────────────
interface BreadcrumbWithTooltipProps extends BreadcrumbProps {
  showTooltips?: boolean;
}

export function BreadcrumbWithTooltip({ 
  items, 
  showTooltips = true,
  ...props 
}: BreadcrumbWithTooltipProps) {
  return (
    <div className="relative">
      <Breadcrumb {...props} items={items} />
      
      {showTooltips && items.length > 0 && (
        <div className="absolute -bottom-6 left-0 text-[0.55rem] text-[#4a6a5a] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          You are here: {items.map(i => i.label).join(" › ")}
        </div>
      )}
    </div>
  );
}

// ─── VARIANT: Collapsible Breadcrumb ────────────────────
interface CollapsibleBreadcrumbProps extends BreadcrumbProps {
  maxItems?: number;
  collapsedText?: string;
}

export function CollapsibleBreadcrumb({ 
  items, 
  maxItems = 4,
  collapsedText = "...",
  ...props 
}: CollapsibleBreadcrumbProps) {
  if (items.length <= maxItems) {
    return <Breadcrumb {...props} items={items} />;
  }

  const visibleItems = items.slice(0, maxItems - 1);
  const lastItem = items[items.length - 1];

  return (
    <Breadcrumb
      {...props}
      items={[
        ...visibleItems,
        { label: collapsedText },
        lastItem,
      ]}
    />
  );
}

// ─── VARIANT: With Dropdown ─────────────────────────────
interface BreadcrumbWithDropdownProps extends BreadcrumbProps {
  showDropdown?: boolean;
}

export function BreadcrumbWithDropdown({ 
  items, 
  showDropdown = true,
  ...props 
}: BreadcrumbWithDropdownProps) {
  if (!showDropdown || items.length <= 3) {
    return <Breadcrumb {...props} items={items} />;
  }

  const firstItem = items[0];
  const lastItem = items[items.length - 1];
  const middleItems = items.slice(1, -1);

  return (
    <nav 
      className={`flex items-center gap-2 text-[0.8rem] text-[#5a7a6a] flex-wrap ${props.className || ""}`} 
      aria-label="Breadcrumb"
    >
      {/* First item */}
      <div className="flex items-center gap-2">
        {firstItem.href ? (
          <Link
            href={firstItem.href}
            className="hover:text-[#011d24] transition-all duration-200"
          >
            <span className="font-medium hover:underline underline-offset-4 decoration-[#3a8b9a]/30">
              {firstItem.label}
            </span>
          </Link>
        ) : (
          <span className="text-[#011d24] font-semibold">
            {firstItem.label}
          </span>
        )}
      </div>

      {/* Dropdown for middle items */}
      {middleItems.length > 0 && (
        <>
          <span className="text-[#c5d8d2] select-none text-[0.7rem] font-light">/</span>
          <div className="relative group">
            <button
              className="flex items-center gap-1 text-[#5a7a6a] hover:text-[#011d24] transition-colors font-medium text-[0.8rem]"
              aria-label="Show more breadcrumb items"
            >
              <span>...</span>
              <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            
            {/* Dropdown menu */}
            <div className="absolute top-full left-0 mt-1 min-w-[180px] bg-white rounded-[12px] shadow-[0_12px_40px_rgba(1,29,36,0.15)] border border-[#c5d8d2] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-1.5">
              {middleItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href || "#"}
                  className="flex items-center gap-2 px-4 py-2 text-[0.75rem] text-[#5a7a6a] hover:text-[#011d24] hover:bg-[#eef4f2] transition-colors"
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Last item */}
      {middleItems.length > 0 && (
        <span className="text-[#c5d8d2] select-none text-[0.7rem] font-light">/</span>
      )}
      <span className="text-[#011d24] font-semibold">
        {lastItem.label}
      </span>
    </nav>
  );
}

// ─── VARIANT: Animated Breadcrumb ──────────────────────
interface AnimatedBreadcrumbProps extends BreadcrumbProps {
  animationDelay?: number;
}

export function AnimatedBreadcrumb({ 
  items, 
  animationDelay = 100,
  ...props 
}: AnimatedBreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const delay = index * animationDelay;
        
        return (
          <div 
            key={index}
            className="flex items-center gap-2 animate-slideIn opacity-0"
            style={{ 
              animationDelay: `${delay}ms`,
              animationFillMode: 'forwards'
            }}
          >
            {index > 0 && (
              <span className="text-[#c5d8d2] select-none text-[0.7rem] font-light">/</span>
            )}
            
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-[#011d24] transition-all duration-200"
              >
                <span className="font-medium hover:underline underline-offset-4 decoration-[#3a8b9a]/30">
                  {item.label}
                </span>
              </Link>
            ) : (
              <span className="text-[#011d24] font-semibold">
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}