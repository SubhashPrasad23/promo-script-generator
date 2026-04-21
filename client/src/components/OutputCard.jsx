import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";

export default function OutputCard({ data, onBack }) {
  const [loading, setLoading] = useState(false);

  const parseScenes = (scriptText) => {
    if (!scriptText) return [];

    return scriptText.split(/\n+/).map((line, index) => {
      const clean = line.replace(/Scene\s*\d+:\s*/i, "").trim();

      return {
        id: index + 1,
        text: clean,
      };
    });
  };

  if (!data) return null;

  const handleDownload = async () => {
    try {
      setLoading(true);

      const element = document.getElementById("pdf-content");
      if (!element) throw new Error("PDF content not found");

      await new Promise((res) => setTimeout(res, 300));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0f0f0d",
        onclone: (doc) => {
          const all = doc.querySelectorAll("*");

          all.forEach((el) => {
            const style = window.getComputedStyle(el);
            const hasUnsupportedColor = (colorStr) => {
              if (!colorStr) return false;
              return (
                colorStr.includes("oklch") ||
                colorStr.includes("oklab") ||
                colorStr.includes("color(")
              );
            };
            if (hasUnsupportedColor(style.color)) {
              el.style.color = "#ffffff";
            }
            if (hasUnsupportedColor(style.backgroundColor)) {
              el.style.backgroundColor = "#0f0f0d";
            }
            if (hasUnsupportedColor(style.borderColor)) {
              el.style.borderColor = "rgba(77, 75, 75, 0.5)";
            }
            if (hasUnsupportedColor(style.outlineColor)) {
              el.style.outlineColor = "transparent";
            }
          });
        },
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("video-plan.pdf");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const scenes = parseScenes(data["Script Breakdown"] || data["Full Script"]);

  return (
    <div className="max-w-6xl mx-auto mt-16 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#9cc300] uppercase tracking-wide">
            Generated Plan
          </h2>
          <p className="text-[#828080] md:tracking-widest tracking-wide  text-sm">
            Optimized for conversion and viral retention.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            disabled={loading}
            className="px-4 py-2 border border-[#9cc300] bg-[#1c1c1c] text-[#9cc300] hover:bg-[#9cc300] hover:text-black rounded-full text-sm disabled:opacity-50"
          >
            {loading ? "Generating..." : "Export PDF"}
          </button>
          <button
            onClick={onBack}
            className="px-7 py-2 border border-red-400 hover:bg-red-400 text-red-400 hover:text-white transition-all  rounded-full text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
      <div id="pdf-content" className="bg-[#0f0f0d] p-6 rounded-2xl">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#9cc300] text-black font-medium p-6 rounded-2xl">
            <div>
              <p className="font-semibold mb-3 uppercase tracking-wider text-xs text-[#516700]">
                THE HOOK
              </p>
              <h3 className="text-xl font-bold italic whitespace-pre-line text-black ">
                {data.Hook || "No Hook Generated"}
              </h3>
            </div>
          </div>
          <div className="bg-[#1c1c1c] border border-[#4d4b4b]/50 p-6 rounded-2xl md:col-span-2">
            <h3 className="font-bold mb-3 uppercase text-white tracking-wider">
              Script Breakdown
            </h3>
            <div className="space-y-4">
              {scenes.map((scene) => (
                <div key={scene.id} className="flex gap-5 ">
                  <p className="text-xs text-[#828080] font-semibold mb-2 uppercase tracking-wider">
                    Scene {scene.id}:
                  </p>

                  <p className="text-white font-medium text-sm leading-relaxed italic">
                    {scene.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#1c1c1c]  border border-[#4d4b4b]/50 p-6 rounded-2xl">
            <h3 className="font-semibold mb-3 uppercase text-[#828080]  tracking-wider">
              Targeting Specs
            </h3>
            <p className="text-sm text-gray-400">
              Audience: {data.audience || "N/A"}
            </p>
            <p className="text-sm text-gray-400">Platform: TikTok / Reels</p>
            <p className="text-sm text-gray-400">Conversion: Link in Bio</p>
          </div>
          <div className="bg-[#1c1c1c] border border-[#4d4b4b]/50 p-6 rounded-2xl">
            <h3 className="font-semibold mb-3 uppercase text-white text-sm tracking-wider">
              Camera Setup
            </h3>
            <p className="text-[#828080] text-xs whitespace-pre-line">
              {data["Camera Setup"] || "No data"}
            </p>
          </div>
          <div className="bg-[#1c1c1c] border border-[#4d4b4b]/50 p-6 rounded-2xl">
            <h3 className="font-semibold mb-3 uppercase text-white text-sm tracking-wider">
              Editing Plan
            </h3>
            <p className="text-[#828080] text-xs whitespace-pre-line">
              {data["Editing Plan"] || "No data"}
            </p>
          </div>
          <div className="bg-[#1c1c1c] border border-[#4d4b4b]/50 p-6 rounded-2xl">
            <h3 className="font-semibold mb-3 uppercase text-white tracking-wider text-sm">
              Background Music
            </h3>
            <p className="text-[#828080] text-xs whitespace-pre-line">
              {data["Background Music"] || "No music suggestion"}
            </p>
          </div>
          <div className="bg-[#1c1c1c] border border-[#4d4b4b]/50 p-6 rounded-2xl">
            <h3 className="font-semibold mb-3 uppercase text-white tracking-wider text-sm">
              Performance Direction
            </h3>
            <p className="text-[#828080] text-xs whitespace-pre-line">
              {data["Performance Direction"] || "No data"}
            </p>
          </div>
          <div className="bg-[#1c1c1c] border border-[#4d4b4b]/50 p-6 rounded-2xl md:col-span-2">
            <h3 className="font-semibold mb-3 uppercase text-white tracking-wider text-sm">
              Core Concept
            </h3>
            <p className="text-[#828080] text-xs whitespace-pre-line">
              {data["Core Concept"] || "No data"}
            </p>
          </div>
          <div className="bg-[#1c1c1c] border border-[#4d4b4b]/50 p-6 rounded-2xl">
            <h3 className="font-semibold mb-3 uppercase text-white tracking-wider text-sm">
              Engagement Tips
            </h3>
            <p className="text-[#828080] text-xs whitespace-pre-line">
              {data["Engagement Tips"] || "No tips"}
            </p>
          </div>
          <div className="bg-[#1c1c1c] border border-[#4d4b4b]/50 p-6 rounded-2xl md:col-span-3">
            <h3 className="font-semibold mb-3 uppercase  tracking-wider text-white text-sm">
              Scene Breakdown
            </h3>
            <p className=" whitespace-pre-line text-[#828080] text-xs">
              {data["Scene Breakdown"] || data.SceneBreakdown || "No data"}
            </p>
          </div>
          <div className="bg-[#9cc300] text-black p-6 rounded-2xl md:col-span-3">
            <h3 className="font-semibold mb-3 uppercase">CTA</h3>
            <p className="whitespace-pre-line">{data["CTA"] || "No CTA"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
