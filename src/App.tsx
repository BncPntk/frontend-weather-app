import {useState} from "react";
import CitySelector from "./components/CitySelector";

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
        <div className="p-4 text-center">
            <CitySelector
                isOpen={isModalOpen}
                onSelect={(selectedCity) => {
                    setCity(selectedCity);
                    setIsModalOpen(false);
                }}
                onClose={() => setIsModalOpen(false)}
            />

            {city && (
                <p
                    className="mt-6 text-2xl cursor-pointer text-gray-100 hover:underline hover:text-gray-200"
                    onClick={() => setIsModalOpen(true)}
                >
                    {city.name}
                </p>
            )}
        </div>
    );
}
