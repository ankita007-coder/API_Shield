import { useEffect, useState } from "react";
import { fetchRules, deleteRule, updateRule } from "../api/rules.api";
import type { RateRule } from "../types/rule.types";
import RuleForm from "../components/RuleForm";

const RulesPage = () => {
  const [rules, setRules] = useState<RateRule[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRules = async () => {
    try {
      setLoading(true);
      const data = await fetchRules();
      setRules(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRules();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteRule(id);
    loadRules();
  };

  const handleToggleActive = async (rule: RateRule) => {
    await updateRule(rule._id, { active: !rule.active });
    loadRules();
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6">
      <RuleForm loadRules={loadRules}/>
      <h1 className="text-2xl font-bold mb-4">Rate Rules</h1>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Target</th>
            <th className="p-2 border">Scope</th>
            <th className="p-2 border">Identifier</th>
            <th className="p-2 border">Limit</th>
            <th className="p-2 border">Window</th>
            <th className="p-2 border">Algorithm</th>
            <th className="p-2 border">Active</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rules.map((rule) => (
            <tr key={rule._id} className="text-center">
              <td className="p-2 border">{rule.target}</td>
              <td className="p-2 border">{rule.scope}</td>
              <td className="p-2 border">{rule.identifier}</td>
              <td className="p-2 border">{rule.limit}</td>
              <td className="p-2 border">{rule.timeWindow}s</td>
              <td className="p-2 border">{rule.algorithm}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleToggleActive(rule)}
                  className={`px-3 py-1 rounded ${
                    rule.active ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  }`}
                >
                  {rule.active ? "Active" : "Inactive"}
                </button>
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(rule._id)}
                  className="bg-black text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RulesPage;