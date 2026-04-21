import { useState } from "react";
import Chip from "./Chip";

const InputCard=({ onGenerate, loading }) =>{
  const [form, setForm] = useState({
    prompt: "",
    goal: "General Promotion",
    duration: "30s",
    audience: "",
    budget: "Medium",
    style: "Cinematic",
    language: "English",
    shootType: "Solo",
  });


  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="flex items-center bg-[#1c1c1c] border border-[#4d4b4b]/50 rounded-2xl p-2 shadow-lg mb-3">
        <textarea
          type="text"
          placeholder="What are you promoting?"
          className="flex-1 bg-transparent px-4 py-2 outline-none text-gray-300 resize-none placeholder:text-[#4d4b4b]"
          onChange={(e) => setForm({ ...form, prompt: e.target.value })}
        />
      </div>
      <div className="bg-[#1c1c1c] backdrop-blur-lg border border-[#4d4b4b]/50 rounded-2xl p-6 shadow-2xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-[#828080] font-medium tracking-widest mb-3 text-xs">
              GOAL OF VIDEO
            </p>
            <div className="flex flex-wrap gap-2">
              {["General Promotion",
                "Launch",
                "Grand Opening",
                "Limited Offer",
                "Festival Offer",
                "Discount Sale","Sales",].map((g) => (
                <Chip
                  key={g}
                  label={g}
                  active={form.goal === g}
                  onClick={() => setForm({ ...form, goal: g })}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[#828080] font-medium tracking-widest mb-3 text-xs">
              DURATION
            </p>
            <div className="flex bg-black rounded-full p-1 w-fit">
              {["15s", "30s", "60s"].map((d) => (
                <button
                  key={d}
                  onClick={() => setForm({ ...form, duration: d })}
                  className={`px-8 py-1.5 rounded-full text-xs font-medium ${
                    form.duration === d
                      ? "bg-[#262626] text-white"
                      : "text-[#4d4b4b]"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <p className="text-[#828080] font-medium tracking-widest mb-3 text-xs">
              TARGET AUDIENCE
            </p>
            <input
              className="w-full bg-transparent border-b border-gray-700 outline-none py-2 text-gray-300"
              placeholder="e.g. Gen Z skincare enthusiasts"
              onChange={(e) => setForm({ ...form, audience: e.target.value })}
            />
          </div>
          <div>
            <p className="text-[#828080] font-medium tracking-widest mb-3 text-xs">
              LANGUAGE
            </p>
            <select
              className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-gray-300"
              onChange={(e) => setForm({ ...form, language: e.target.value })}
            >
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <p className="text-[#828080] font-medium tracking-widest mb-3 text-xs uppercase">
              BUDGET LEVEL
            </p>
            <div className="flex gap-2">
              {["Low", "Medium", "High"].map((b) => (
                <Chip
                  name="budgetLevel"
                  key={b}
                  label={b}
                  active={form.budget === b}
                  onClick={() => setForm({ ...form, budget: b })}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[#828080] font-medium tracking-widest mb-3 text-xs uppercase">
              CREATOR STYLE
            </p>
            <div className="flex flex-wrap gap-2">
              {["Cinematic", "Funny","Casual / Vlog", "Storytelling", "Luxury","Fast Reel Style","Talking Head","Voiceover"].map((s) => (
                <Chip
                  name="creatorStyle"
                  key={s}
                  label={s}
                  active={form.style === s}
                  onClick={() => setForm({ ...form, style: s })}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 ">
          <div>
            <p className="text-[#828080] font-medium tracking-widest mb-3 text-xs uppercase">
              Shoot Type
            </p>
            <div className="flex flex-wrap gap-2">
              {["Solo", "Duo", "3-4"].map((s) => (
                <Chip
                  key={s}
                  label={s}
                  active={form.shootType === s}
                  onClick={() => setForm({ ...form, shootType: s})}
                />
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => onGenerate(form)}
          disabled={loading}
          className="lg:w-1/4  w-full mt-8 py-3 rounded-full font-semibold 
          bg-[#9cc300] text-black
          hover:scale-[1.02] transition transform"
        >
          Generate
        </button>
      </div>
    </div>
  );
}

export default InputCard