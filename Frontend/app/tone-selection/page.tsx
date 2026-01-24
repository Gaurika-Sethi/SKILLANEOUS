import { Suspense } from "react";
import ToneSelectionClient from "./ToneSelectionClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <ToneSelectionClient />
    </Suspense>
  );
}
