import { useState } from "react";
import { createRule } from "../api/rules.api";


interface RuleFormInterface{
    loadRules : ()=>void;
}
const RuleForm = ({loadRules}:RuleFormInterface) => {
  const [form, setForm] = useState({
    target: "ip",
    scope: "global",
    identifier: "*",
    limit: 10,
    timeWindow: 60,
    algorithm: "sliding_window",
    active: true,
  });
  const handleCreate = async () => {
    await createRule(form);
    loadRules();
  };
  return (
    <div className="mb-6 border p-4 rounded">
      <h2 className="text-lg font-semibold mb-2">Create Rule</h2>

      <div className="grid grid-cols-3 gap-3">
        <select
          value={form.target}
          onChange={(e) => setForm({ ...form, target: e.target.value })}
          className="border p-2"
        >
          <option value="ip">IP</option>
          <option value="user">User</option>
        </select>

        <select
          value={form.scope}
          onChange={(e) => setForm({ ...form, scope: e.target.value })}
          className="border p-2"
        >
          <option value="global">Global</option>
          <option value="endpoint">Endpoint</option>
        </select>

        <input
          type="text"
          placeholder="Identifier"
          value={form.identifier}
          onChange={(e) => setForm({ ...form, identifier: e.target.value })}
          className="border p-2"
        />

        <input
          type="number"
          placeholder="Limit"
          value={form.limit}
          onChange={(e) => setForm({ ...form, limit: Number(e.target.value) })}
          className="border p-2"
        />

        <input
          type="number"
          placeholder="Time Window (sec)"
          value={form.timeWindow}
          onChange={(e) =>
            setForm({ ...form, timeWindow: Number(e.target.value) })
          }
          className="border p-2"
        />

        <select
          value={form.algorithm}
          onChange={(e) => setForm({ ...form, algorithm: e.target.value })}
          className="border p-2"
        >
          <option value="fixed_window">Fixed</option>
          <option value="sliding_window">Sliding</option>
          <option value="token_bucket">Token</option>
        </select>
      </div>

      <button
        onClick={handleCreate}
        className="mt-4 bg-black text-white px-4 py-2 rounded"
      >
        Create Rule
      </button>
    </div>
  );
};

export default RuleForm;
