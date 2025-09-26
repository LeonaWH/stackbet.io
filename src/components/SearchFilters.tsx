import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card } from "./ui/card";
import { Search, Filter, X } from "lucide-react";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilter: (filters: {
    sport?: string;
    country?: string;
    time?: string;
    status?: string;
  }) => void;
}

export function SearchFilters({ onSearch, onFilter }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    sport: "",
    country: "",
    time: "",
    status: ""
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    setFilters({ sport: "", country: "", time: "", status: "" });
    setSearchQuery("");
    onFilter({ sport: "", country: "", time: "", status: "" });
    onSearch("");
  };

  return (
    <Card className="bg-gray-800 border-gray-700 p-4">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search teams, matches, or players..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSearch(e.target.value);
            }}
            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-300 placeholder:font-medium focus:border-green-500 focus:ring-green-500/30"
          />
        </div>

        {/* Filter Toggle Button */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 hover:text-white font-medium"
          >
            <Filter className="w-4 h-4 mr-2" />
            {isExpanded ? 'Hide Filters' : 'Show Filters'}
          </Button>
          
          {(filters.sport || filters.country || filters.time || filters.status) && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-gray-300 hover:text-white hover:bg-gray-700 font-medium"
            >
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {/* Filters */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-700">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Status</label>
              <Select value={filters.status} onValueChange={(value) => updateFilter("status", value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="All Matches" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="Live">Live</SelectItem>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Sport Type</label>
              <Select value={filters.sport} onValueChange={(value) => updateFilter("sport", value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="All Sports" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="tennis">Tennis</SelectItem>
                  <SelectItem value="esports">eSports</SelectItem>
                  <SelectItem value="soccer">Soccer</SelectItem>
                  <SelectItem value="baseball">Baseball</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Country/League</label>
              <Select value={filters.country} onValueChange={(value) => updateFilter("country", value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="spain">Spain</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="italy">Italy</SelectItem>
                  <SelectItem value="france">France</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Time</label>
              <Select value={filters.time} onValueChange={(value) => updateFilter("time", value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="live">Live Now</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="weekend">This Weekend</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-4 flex justify-end">
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}