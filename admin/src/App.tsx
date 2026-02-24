import { useState } from "react";
import RulesPage from "./pages/RulesPage";
import ViolationsPage from "./pages/ViolationsPage";

function App() {
  const [page, setPage] = useState<"rules" | "violations">("rules");

  return (
    <div>
      <div className="flex gap-4 p-4 border-b">
        <button onClick={() => setPage("rules")} className="cursor-pointer">Rules</button>
        <button onClick={() => setPage("violations")} className="cursor-pointer">
          Violations
        </button>
      </div>

      {page === "rules" ? <RulesPage /> : <ViolationsPage />}
    </div>
  );
}

export default App;