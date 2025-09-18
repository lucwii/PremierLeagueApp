import React, { useEffect, useState } from 'react'
import { Users, Star, MapPin, Target, Zap } from "lucide-react";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Card2 from '../components/ui/Card2';
import Select from '../components/ui/Select';

type Player = {
  name: string,
  age: number | null,
  nation: string,
  pos: string,
  team: string,
  starts: number | null,
  min: number | null,
  gls: number | null,
  ast: number | null,
  xg: number | null,
  xag: number | null,
}

const getPositionColor = (position: string) => {
  switch(position.toLowerCase()) {
    case 'gk': return 'bg-yellow-500 text-white';
    case 'df': return 'bg-blue-500 text-white';
    case 'mf': return 'bg-green-500 text-white';
    case 'fw': return 'bg-red-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

const Players: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string>('all');
  const [selectedTeam, setSelectedTeam] = useState<string>('all')

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 20;

  useEffect(() => {
    let url = "http://localhost:8080/api/v1/player"
    const params = new URLSearchParams();
  
    if(searchTerm.trim()) params.append("name", searchTerm.trim());
    if(selectedPosition !== "all") params.append("position", selectedPosition);
    if(selectedTeam !== 'all') params.append("team", selectedTeam);
  
    if(params.toString()) {
      url += `?${params.toString()}`
    }
  
    console.log("Fetching URL:", url); // Debug
  
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log("Received data:", data.length, "players"); // Debug
        setPlayers(data);
        setCurrentPage(1);
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [searchTerm, selectedPosition, selectedTeam])



  const uniquePositions = [...new Set(players.map(p => p.pos))];
  const uniqueTeams = [...new Set(players.map(p => p.team))];


  // Pagination logic
  // Pagination logic
const indexOfLastPlayer = currentPage * playersPerPage;
const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);
const totalPages = Math.ceil(players.length / playersPerPage);


  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="h-16 bg-white shadow-sm"></div>
        
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-green-400 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Premier League Players
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Discover the most talented players from the world's most competitive league
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <span className="ml-3 text-lg text-gray-600">Loading players...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Premier League Players
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover the most talented players from the world's most competitive league
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Players</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or team..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Team</label>
              <Select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Teams</option>
                {uniqueTeams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Position</label>
              <Select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Positions</option>
                {uniquePositions.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </Select>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            Showing {currentPlayers.length} of {players.length} players
          </div>

        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentPlayers.map((player, index) => (
            <Card2 
              key={index} 
              className="bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-gray-200/50 group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div>
                {/* Player Header */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {player.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">
                    {player.team}
                  </p>
                </div>

                {/* Position & Age */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPositionColor(player.pos)}`}>
                    {player.pos}
                  </span>
                  <div className="flex items-center space-x-1 bg-purple-50 px-2 py-1 rounded-full">
                    <Star className="h-3 w-3 text-purple-500 fill-purple-500" />
                    <span className="text-sm font-bold text-purple-700">
                      {player.age ?? "-"}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center bg-green-50 rounded-lg p-3">
                    <div className="flex items-center justify-center mb-1">
                      <Target className="h-4 w-4 text-green-600 mr-1" />
                      <p className="text-2xl font-bold text-green-600">{player.gls ?? 0}</p>
                    </div>
                    <p className="text-xs text-gray-600">Goals</p>
                  </div>
                  <div className="text-center bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center justify-center mb-1">
                      <Zap className="h-4 w-4 text-blue-600 mr-1" />
                      <p className="text-2xl font-bold text-blue-600">{player.ast ?? 0}</p>
                    </div>
                    <p className="text-xs text-gray-600">Assists</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="text-center bg-purple-50 rounded p-2">
                    <p className="text-sm font-bold text-purple-600">{Number(player.xg || 0).toFixed(1)}</p>
                    <p className="text-xs text-gray-600">xG</p>
                  </div>
                  <div className="text-center bg-indigo-50 rounded p-2">
                    <p className="text-sm font-bold text-indigo-600">{Number(player.xag || 0).toFixed(1)}</p>
                    <p className="text-xs text-gray-600">xAG</p>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-gray-600">Starts: {player.starts ?? 0}</span>
                    <span className="text-gray-600">Min: {player.min ?? 0}</span>
                  </div>
                </div>

                {/* Nationality */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-3">
                  <MapPin className="h-3 w-3" />
                  <span>{player.nation || "-"}</span>
                </div>
              </div>
            </Card2>
          ))}
        </div>

        {/* No results */}
        {currentPlayers.length === 0 && (
          <div className="text-center py-12">
            <Users size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No players found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Players
