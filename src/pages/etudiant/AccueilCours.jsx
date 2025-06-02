import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AccueilCourse = () => {
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Récupérer le token
    console.log("Token utilisé pour fetch cours :", token);

    fetch("http://localhost:8000/api/cours", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // Mettre le token dans le header
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP : ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.cours)) {
          setCours(data.cours);
        } else if (Array.isArray(data)) {
          setCours(data);
        } else {
          setCours([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement des cours...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (cours.length === 0) return <div>Aucun cours disponible.</div>;

  return (
    <div className="w-[90%] md:w-[80%] mx-auto mt-6">
      <h1 className="text-3xl font-bold mb-6">Liste des cours disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cours.map((coursItem) => (
          <div key={coursItem.id} className="bg-white rounded shadow p-4 flex flex-col">
            <img
              src={coursItem.photo_path ? `http://localhost:8000/storage/${coursItem.photo_path}` : "https://via.placeholder.com/400x160"}
              alt={coursItem.title || "Image du cours"}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-bold mb-2">{coursItem.title || "Titre non disponible"}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {coursItem.gratuit === 1
                ? "Gratuit"
                : `Payant : ₹${coursItem.prix || "N/A"}`}
            </p>
            <Link
              to={`/cours/${coursItem.id}`}
              className="mt-auto text-blue-600 hover:underline text-sm"
            >
              S’inscrire
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccueilCourse;
