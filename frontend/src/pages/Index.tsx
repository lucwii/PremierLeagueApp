import React from 'react'
import NavBar from '../components/NavBar'
import Button from '../components/ui/Button'
import { Link } from 'react-router-dom'
import premierLeagueHero from "../assets/premier-league-hero.jpg";
import Card from '../components/ui/Card';
import { Trophy, Users, Target, TrendingUp, ArrowRight, Star } from "lucide-react";
import Footer from '../components/Footer';

const Index = () => {
    const stats = [
        {
          icon: Trophy,
          value: "20",
          label: "Teams",
          color: "text-accent"
        },
        {
          icon: Users,
          value: "500+",
          label: "Players",
          color: "text-secondary"
        },
        {
          icon: Target,
          value: "380",
          label: "Matches",
          color: "text-primary"
        },
        {
          icon: TrendingUp,
          value: "1000+",
          label: "Goals",
          color: "text-accent"
        }
    ]
  return (
    <div>
        <NavBar />
        <div className="relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${premierLeagueHero})` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-purple-900/50" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center animate-fade-in">
          <span className="mb-6 inline-block bg-green-400/20 text-green-400 border border-green-400/30 px-4 py-2 text-sm font-medium rounded-lg">
            Season 2024/25
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Premier League
            <span className="block text-green-400">App</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
            Follow the world's most competitive league. All players, statistics and results in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/players">
              <Button
                className=''
                label="View Players"
                variant="green"
                onClick={() => console.log("Players clicked")}
              />
            </Link>

            <Button
              label="Statistics"
              variant="purple"
              className=''
              onClick={() => console.log("Stats clicked")}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="py-16 bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="text-center bg-white shadow-lg rounded-xl p-6"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-200 rounded-full mb-4">
              <Icon className="h-6 w-6 text-purple-700" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {stat.value}
            </h3>
            <p className="text-gray-600 font-medium">
              {stat.label}
            </p>
          </Card>
        );
      })}
    </div>
  </div>
</div>
<Footer />
    </div>
  )
}

export default Index