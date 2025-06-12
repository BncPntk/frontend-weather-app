import {useState} from "react";
import CitySelector from "./components/CitySelector";
import Weather from "./components/Weather.tsx";

type City = {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
};

export default function App() {

    const [city, setCity] = useState<City | null>(() => {
        const storedCity = localStorage.getItem("selectedCity");
        return storedCity ? JSON.parse(storedCity) : null;
    });

    const [isModalOpen, setIsModalOpen] = useState(!city);

    if (city) {
        localStorage.setItem("selectedCity", JSON.stringify(city));
    }

    return (
        <div className="flex flex-col items-center justify-center px-4 py-8">
            <CitySelector
                isOpen={isModalOpen}
                onSelect={(selectedCity) => {
                    setCity(selectedCity);
                    setIsModalOpen(false);
                }}
                onClose={() => setIsModalOpen(false)}
            />

            {city && (
                <div className="w-full max-w-4xl px-5">
                    <p
                        className="text-xl mb-2 mt-2 text-left cursor-pointer text-gray-100 hover:underline hover:text-gray-200"
                        onClick={() => setIsModalOpen(true)}
                    >
                        {city.name}
                    </p>

                    <Weather latitude={city.latitude} longitude={city.longitude}/>

                    <footer>
                        <p className="text-xs text-center md:text-left text-gray-100 pt-32">Péntek Bence</p>
                    </footer>
                </div>
            )}
        </div>
    );
}
