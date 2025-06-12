import { useEffect, useState } from "react";

type City = {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
};

type Props = {
    isOpen: boolean;
    onSelect: (city: City) => void;
    onClose: () => void;
};

export default function CitySelector({ isOpen, onSelect, onClose }: Props) {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<City[]>([]);

    useEffect(() => {
        if (!query) return;

        const timeout = setTimeout(() => {
            fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.results) {
                        setResults(data.results);
                    } else {
                        setResults([]);
                    }
                });
        }, 500);

        return () => clearTimeout(timeout);
    }, [query]);

    const handleSelect = (city: City) => {
        onSelect(city);
        setQuery("");
        setResults([]);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-4 text-gray-500 hover:text-black"
                >
                    ×
                </button>
                <h2 className="text-lg mb-2">Város keresése</h2>

                <input
                    type="text"
                    placeholder="Pl. Budapest"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-2 border mb-4 rounded"
                />

                <ul className="max-h-64 overflow-y-auto">
                    {results.map((city) => (
                        <li
                            key={`${city.name}-${city.latitude}`}
                            onClick={() => handleSelect(city)}
                            className="cursor-pointer p-2 hover:bg-gray-100"
                        >
                            {city.name}, {city.country}
                        </li>
                    ))}
                    {results.length === 0 && query && (
                        <li className="text-gray-500">Nincs találat</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
