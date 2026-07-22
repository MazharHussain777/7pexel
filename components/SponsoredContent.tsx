// components/SponsoredContent.tsx
"use client";

export function SponsoredContent() {
  return (
    <div className="md:col-span-2 bg-gradient-to-br from-[#7F011F]/5 to-[#c94a6a]/5 backdrop-blur-sm border border-[rgba(127,1,31,0.14)] rounded-[22px] p-4 flex flex-col items-center text-center gap-3 shadow-md">
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7F011F] to-[#a80a30] flex items-center justify-center text-white text-lg shadow-md shadow-[#7F011F]/20">
        <i className="fas fa-crown" />
      </div>
      <div>
        <div className="font-bold text-[#2d1a1a] text-[0.78rem] font-['Poppins',sans-serif]">Sponsored</div>
        <div className="text-[0.6rem] text-[#6d4a4a] mt-0.5 font-['Poppins',sans-serif]">Premium Accessories</div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(127,1,31,0.14)] to-transparent" />

      <div className="flex flex-col gap-2 w-full">
        {[
          { icon: "fa-tag", name: "Leather Case", desc: "Premium quality", price: "$49" },
          { icon: "fa-bolt", name: "Fast Adapter", desc: "Quick charging", price: "$29" },
          { icon: "fa-headphones", name: "Premium Earbuds", desc: "Noise cancelling", price: "$199" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-2.5 border border-[rgba(127,1,31,0.08)] hover:bg-white transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7F011F]/10 to-[#c94a6a]/10 flex items-center justify-center flex-shrink-0">
                <i className={`fas ${item.icon} text-[#7F011F] text-[0.7rem]`} />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="text-[0.62rem] font-semibold text-[#2d1a1a] font-['Poppins',sans-serif] truncate">{item.name}</div>
                <div className="text-[0.48rem] text-[#6d4a4a] font-['Poppins',sans-serif]">{item.desc}</div>
              </div>
              <span className="text-[0.45rem] font-bold text-[#7F011F] bg-[#7F011F]/10 px-1.5 py-0.5 rounded-full font-['Poppins',sans-serif] flex-shrink-0">{item.price}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full bg-gradient-to-r from-[#7F011F] to-[#a80a30] text-white text-[0.6rem] font-semibold py-2 rounded-full shadow-md shadow-[#7F011F]/20 hover:shadow-lg transition-shadow font-['Poppins',sans-serif]">
        View All Accessories
      </button>
    </div>
  );
}