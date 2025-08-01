import { useEffect, useState } from "react";

export function GeoInfo() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
          setLocationError("");
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setLocationError(
              "Permissão negada. Por favor, autorize o acesso à localização nas configurações do navegador."
            );
          } else {
            setLocationError(
              "Não foi possível obter a localização. Por favor, verifique se você autorizou o acesso à localização."
            );
          }

          if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(locationError);
            window.speechSynthesis.speak(utterance);
          }
        }
      );
    } else {
      setLocationError("Geolocalização não suportada neste navegador.");
    }
  }, [locationError]);

  return (
    <section className="w-full max-w-md p-6 bg-blue-50 dark:bg-blue-900 rounded-lg shadow text-blue-900 dark:text-blue-200 text-center">
      <h2 className="font-semibold mb-4 text-lg">
        📍 Localização (Funcionalidade Bônus)
      </h2>

      {location ? (
        <>
          <p>
            Latitude: {location.lat.toFixed(4)} <br />
            Longitude: {location.lon.toFixed(4)}
          </p>

          <div className="mt-4 w-full h-48 rounded overflow-hidden shadow-lg">
            <iframe
              title="Mapa de localização"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${location.lat},${location.lon}&z=15&output=embed`}
            />
          </div>
        </>
      ) : (
        <p>{locationError || "Obtendo localização..."}</p>
      )}
    </section>
  );
}
