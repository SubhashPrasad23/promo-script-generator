import { useState } from "react";
import InputCard from "./components/InputCard"; 
import OutputCard from "./components/OutputCard"; 
import Loader from "./components/Loader";

export default function App() {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (form) => {
    try {
      setLoading(true);
      setOutput(null);

      const res = await fetch("http://localhost:5000/generate-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();
      setOutput(data);

    } catch (err) {
      console.error(err);
      alert(" Backend is not running");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setOutput(null);
  };

  return (
    <div className="font-sans min-h-screen p-6 bg-[#0f0f0d]">

      <div className="text-center mb-10">
        <p className="text-3xl font-bold tracking-tight text-gray-400 mt-2 bg-gradient-to-b from-[#9cc300] to-white bg-clip-text text-transparent">
          Create  
            Viral Video
           Scripts <br/>in Seconds
        </p>
      </div>
      {!output && !loading && (
        <InputCard onGenerate={handleGenerate} loading={loading} />
      )}
      {loading && <Loader />}
      {output && !loading && (
        <OutputCard data={output} onBack={handleBack} />
      )}
    </div>
  );
}