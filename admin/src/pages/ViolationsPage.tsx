import { useEffect, useState } from "react";
import api from "../api/axios";

interface Violations {
  ip: Record<string, number>;
  user: Record<string, number>;
}

const ViolationsPage = () => {
  const [data, setData] = useState<Violations | null>(null);

  useEffect(() => {
    api.get("/admin/violations").then((res) => {
      setData(res.data);
    });
  }, []);

  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Violations</h1>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">IP Violations</h2>
        {Object.entries(data.ip).map(([ip, count]) => (
          <div key={ip} className="border p-2 mb-1">
            {ip} → {count}
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-semibold mb-2">User Violations</h2>
        {Object.entries(data.user).map(([user, count]) => (
          <div key={user} className="border p-2 mb-1">
            {user} → {count}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViolationsPage;