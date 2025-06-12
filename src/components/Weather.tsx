import {useState, useEffect} from "react";

type Props = {
    latitude: number;
    longitude: number;
};

type WeatherData = {
    current: {
        temp: number;
        weathercode: number;
    };
    daily: {
        time: string[];
        temp_2m_max: number[];
        temp_2m_min: number[];
        precipitation_probability_max: number[];
        weathercode: number[];
    };
};

export default function Weather({latitude, longitude}: Props) {
    const [weather, setWeather] = useState<WeatherData | null>(null);

    useEffect(() => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode&daily=weathercode,precipitation_probability_max,temperature_2m_max,temperature_2m_min&timezone=auto`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);

                setWeather({
                    current: {
                        temp: data.current.temperature_2m,
                        weathercode: data.current.weathercode,
                    },
                    daily: {
                        time: data.daily.time,
                        temp_2m_max: data.daily.temperature_2m_max,
                        temp_2m_min: data.daily.temperature_2m_min,
                        precipitation_probability_max: data.daily.precipitation_probability_max,
                        weathercode: data.daily.weathercode,
                    },
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }, [latitude, longitude]);

    console.log(weather);

    if (!weather) return <p className="text-gray-100">Keresés...</p>;

    return (
        <div className="w-full flex flex-col items-center md:items-start">
            <div className="w-full flex flex-col md:flex-row justify-between gap-12">

                {/*left col*/}
                <div className="w-full md:w-1/2 text-gray-100">
                    <h2 className="text-5xl">{weather.current.temp} °C</h2>
                    <p>asdasd</p>
                </div>


                {/*right col*/}
                <div className="w-full md:w-1/2 text-gray-100">
                    <h3 className="text-xs mb-4 text-left">7 napos előrejelzés</h3>
                    <ul className="space-y-4 text-lg">
                        {weather.daily.time.map((day, i) => (
                            <li key={day} className="flex justify-between items-center">
                                <span className="w-1/3">{getDayName(day)}</span>
                                <span
                                    className="w-1/3 text-center proportional-nums">{weather.daily.precipitation_probability_max[i].toString().padStart(2, "\u00A0\u00A0")}%</span>
                                <span
                                    className="w-1/3 text-right">{weather.daily.temp_2m_min[i]} °C / {weather.daily.temp_2m_max[i]} °C</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function getDayName(dateStr: string): string {
    const date = new Date(dateStr);
    const day = date.toLocaleDateString("hu-HU", {weekday: "long"});

    return day.charAt(0).toUpperCase() + day.slice(1);
}
