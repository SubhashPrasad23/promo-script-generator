export default function Loader() {
    return (
        <div className="max-w-6xl mx-auto mt-16 space-y-6 animate-pulse">
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <div className="h-6 w-40 bg-[#1c1c1c] border border-[#4d4b4b]/50 rounded"></div>
                    <div className="h-4 w-64 bg-[#1c1c1c] border border-[#4d4b4b]/50 rounded"></div>
                </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#1c1c1c] border border-[#4d4b4b]/50 p-6 rounded-2xl h-32"></div>
                <div className="bg-[#1c1c1c] border border-[#4d4b4b]/50 p-6 rounded-2xl md:col-span-2 h-32"></div>
                {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="bg-[#1c1c1c] border border-[#4d4b4b]/50 p-6 rounded-2xl h-28"></div>
                ))}
                <div className="bg-[#1c1c1c] border border-[#4d4b4b]/50 p-6 rounded-2xl md:col-span-3 h-40"></div>

                <div className="bg-[#1c1c1c] border border-[#4d4b4b]/50 p-6 rounded-2xl md:col-span-3 h-40"></div>
                <div className="bg-[#1c1c1c] border border-[#4d4b4b]/50 p-6 rounded-2xl md:col-span-3 h-24"></div>
            </div>
        </div>
    );
}