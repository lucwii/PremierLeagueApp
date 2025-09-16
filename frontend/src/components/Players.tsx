import React, { useEffect, useState } from "react";
import axios from "axios";

type Player = {
  name: string;
  age: number;
  nation: string;
  pos: string;
  team: string;
  starts: number;
  min: number;
  gls: number;
  ast: number;
  xg: number;
  xag: number;
};

const PlayersTable: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/player") // <-- endpoint iz Spring Boot-a
      .then(res => {
        setPlayers(res.data);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Premier League Player Stats</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Nation</th>
              <th className="px-4 py-2">Team</th>
              <th className="px-4 py-2">Pos</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Starts</th>
              <th className="px-4 py-2">Goals</th>
              <th className="px-4 py-2">Assists</th>
              <th className="px-4 py-2">xG</th>
              <th className="px-4 py-2">xAG</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p, i) => (
              <tr key={i} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.nation}</td>
                <td className="px-4 py-2">{p.team}</td>
                <td className="px-4 py-2">{p.pos}</td>
                <td className="px-4 py-2">{p.age}</td>
                <td className="px-4 py-2">{p.starts}</td>
                <td className="px-4 py-2">{p.gls}</td>
                <td className="px-4 py-2">{p.ast}</td>
                <td className="px-4 py-2">{p.xg}</td>
                <td className="px-4 py-2">{p.xag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayersTable;
