import { WHY } from "../content";
import AiHuman from "./AiHuman";
import Compare from "./Compare";

// 11 — Human Team & Why ZEBAQ: cinematic manifesto, then the reasons.
export default function Why() {
  return (
    <div id="about" data-index="11" data-label="Human Team & Why ZEBAQ">
      <AiHuman />
      <Compare />
      {import.meta.env.DEV && (
        <div className="wrap bg-off pb-16">
          <div className="grid h-40 place-items-center rounded-[28px] border-2 border-dashed border-red-300 text-sm text-red-700">
            Dev note: {WHY.teamNote} (real people build trust — the brief asks for real team imagery)
          </div>
        </div>
      )}
    </div>
  );
}
