import LiveCamera from "@/components/livecamera";
import DetectionHistory from "@/components/detectionhistory";
import FAQ from "@/components/faq";

export default function HomePage() {
  return (
    <div className="p-6 space-y-10 scroll-smooth">
      <section id="monitoring" className="scroll-mt-20">
        <LiveCamera />
      </section>

      <section id="riwayat" className="scroll-mt-20">
        <DetectionHistory />
      </section>

      <section id="faq" className="scroll-mt-20">
        <FAQ />
      </section>
    </div>
  );
}
