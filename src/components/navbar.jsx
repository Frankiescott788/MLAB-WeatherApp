import { useContext } from "react";
import { WeatherProvider } from "../context/weatherData";

function Navbar() {
  const { offlineData, offlineMode } = useContext(WeatherProvider);

  return (
    <nav>
      <div className="container py-4">
        <div className="d-flex justify-content-between">
          <div className="logo">weather app</div>
          <div>
            <button onClick={offlineData} className="d-flex gap-2" disabled={offlineMode} >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  color={"#9b9b9b"}
                  fill={"none"}
                >
                  <ellipse
                    cx="10"
                    cy="4.99982"
                    rx="8"
                    ry="3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M5 10.8419C5.60158 11.0227 6.27434 11.1716 7 11.2818"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5 17.8419C5.60158 18.0227 6.27434 18.1716 7 18.2818"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 15.4996L13.1363 16.965C13.708 14.8316 15.9014 13.5656 18.0352 14.1373C19.1275 14.4299 19.9925 15.1473 20.5 16.064M22 20.4984L20.8637 19.035C20.2919 21.1684 18.0986 22.4344 15.9647 21.8627C14.8978 21.5769 14.0477 20.8858 13.5359 19.9995"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 4.99982V11.008M2 4.99982V19.019C2 20.5509 5.05369 21.815 9 21.9998"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 11.9998C2 13.5416 5.05369 14.8138 9 14.9998"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="mt-1">
                Sync Mode
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
