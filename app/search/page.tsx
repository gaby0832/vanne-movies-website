import { Suspense } from "react";
import SearchContent from "./SearchContent";
import Loading from "../components/loadingOverlay";

export default function SearchPage() {
  return (
    <Suspense fallback={<Loading/>}>
      <SearchContent />
    </Suspense>
  );
}