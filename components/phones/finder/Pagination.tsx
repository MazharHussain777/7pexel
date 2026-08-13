// components/phones/finder/Pagination.tsx
"use client";

export function Pagination() {
  const handlePageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    document.querySelectorAll('.pagination-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelector('.container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex justify-center gap-2 mt-9.5 flex-wrap">
      <button className="pagination-btn active bg-transparent border-[1.5px] border-[#dee8e2] px-4.5 py-2 rounded-[40px] font-semibold text-[0.8rem] transition-all duration-200 cursor-pointer active:bg-[var(--color-green)] active:border-[var(--color-green)] active:text-white hover:not-active:bg-[#eaf3ed] hover:not-active:border-[#b3cebe]" onClick={handlePageClick}>
        1
      </button>
      <button className="pagination-btn bg-transparent border-[1.5px] border-[#dee8e2] px-4.5 py-2 rounded-[40px] font-semibold text-[0.8rem] transition-all duration-200 cursor-pointer active:bg-[var(--color-green)] active:border-[var(--color-green)] active:text-white hover:not-active:bg-[#eaf3ed] hover:not-active:border-[#b3cebe]" onClick={handlePageClick}>
        2
      </button>
      <button className="pagination-btn bg-transparent border-[1.5px] border-[#dee8e2] px-4.5 py-2 rounded-[40px] font-semibold text-[0.8rem] transition-all duration-200 cursor-pointer active:bg-[var(--color-green)] active:border-[var(--color-green)] active:text-white hover:not-active:bg-[#eaf3ed] hover:not-active:border-[#b3cebe]" onClick={handlePageClick}>
        3
      </button>
      <button className="pagination-btn bg-transparent border-[1.5px] border-[#dee8e2] px-4.5 py-2 rounded-[40px] font-semibold text-[0.8rem] transition-all duration-200 cursor-pointer active:bg-[var(--color-green)] active:border-[var(--color-green)] active:text-white hover:not-active:bg-[#eaf3ed] hover:not-active:border-[#b3cebe]" onClick={handlePageClick}>
        4
      </button>
      <button className="pagination-btn bg-transparent border-[1.5px] border-[#dee8e2] px-4.5 py-2 rounded-[40px] font-semibold text-[0.8rem] transition-all duration-200 cursor-pointer active:bg-[var(--color-green)] active:border-[var(--color-green)] active:text-white hover:not-active:bg-[#eaf3ed] hover:not-active:border-[#b3cebe]" onClick={handlePageClick}>
        5
      </button>
      <span className="border-none cursor-default px-4.5 py-2 text-[0.8rem] text-[var(--color-ink-soft)]">…</span>
      <button className="pagination-btn bg-transparent border-[1.5px] border-[#dee8e2] px-4.5 py-2 rounded-[40px] font-semibold text-[0.8rem] transition-all duration-200 cursor-pointer active:bg-[var(--color-green)] active:border-[var(--color-green)] active:text-white hover:not-active:bg-[#eaf3ed] hover:not-active:border-[#b3cebe]" onClick={handlePageClick}>
        25
      </button>
    </div>
  );
}