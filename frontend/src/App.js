import SearchBar from "./components/search-bar";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="text-4xl font-bold text-center py-6">
        Semantic Document Search
      </header>

      <main className="flex justify-center px-4">
        <div className="w-full max-w-4xl bg-white text-black p-6 rounded-xl shadow-lg">
          <SearchBar />
        </div>
      </main>
    </div>
  );
}

export default App;
