import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const LiveMarket = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false"
        );
        
        if (!response.ok) throw new Error("Failed to fetch data");
        
        const data = await response.json();
        setCoins(data);
        setFilteredCoins(data);
        setError(null);
      } catch (err) {
        setError("Unable to load market data. Please try again later.");
        console.error("Error fetching crypto data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  useEffect(() => {
    const filtered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCoins(filtered);
  }, [search, coins]);

  return (
    <section id="market" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Live <span className="gradient-text">Market</span> Prices
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time cryptocurrency prices powered by CoinGecko
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search cryptocurrency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 glass border-primary/20 h-14 text-lg rounded-xl"
            />
          </div>
        </div>

        {error && (
          <div className="glass border-destructive/50 p-6 rounded-xl text-center mb-8">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="glass p-6 rounded-2xl">
                <Skeleton className="h-12 w-12 rounded-full mb-4" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-8 w-24" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCoins.map((coin, index) => (
              <div
                key={coin.id}
                className="glass p-6 rounded-2xl hover:bg-card/60 transition-all duration-300 glow-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{coin.name}</h3>
                    <p className="text-sm text-muted-foreground uppercase">
                      {coin.symbol}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      ${coin.current_price.toLocaleString()}
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
                      coin.price_change_percentage_24h >= 0
                        ? "bg-success/20 text-success"
                        : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {coin.price_change_percentage_24h >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="font-semibold">
                      {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredCoins.length === 0 && (
          <div className="glass p-12 rounded-2xl text-center">
            <p className="text-muted-foreground text-lg">
              No cryptocurrencies found matching "{search}"
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LiveMarket;
