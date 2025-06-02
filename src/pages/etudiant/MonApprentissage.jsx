import React, { useEffect } from "react";
import { useMonApprentissage } from "@/context/MonApprentissageContext";
import { Link } from "react-router-dom";
import { BookOpen, Loader2, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";

const MonApprentissage = () => {
  const { mesCours, fetchMesCours, loading } = useMonApprentissage();
  const { t } = useTranslation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      fetchMesCours(user.id);
    }
  }, []);

  const coursTermines = mesCours.filter((c) => c.progression === 100).length;
  const coursEnCours = mesCours.filter((c) => c.progression > 0 && c.progression < 100).length;
  const progressionGlobale =
    mesCours.length > 0
      ? Math.round(mesCours.reduce((acc, cur) => acc + cur.progression, 0) / mesCours.length)
      : 0;

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-10">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-10 text-center">
        <h1 className="text-3xl font-bold">{t("monApprentissage.titre")}</h1>
        <p className="text-sm mt-2">{t("monApprentissage.sousTitre")}</p>
      </div>

      {/* ✅ Conteneur principal avec largeur 80% */}
      <div className="w-[90%] md:w-[80%] mx-auto mt-6">
        {loading ? (
          <div className="text-center text-blue-600 flex flex-col items-center justify-center py-10">
            <Loader2 className="animate-spin mb-2" />
            <p>{t("monApprentissage.chargement")}</p>
          </div>
        ) : (
          <>
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <StatCard
                title={t("monApprentissage.statistiques.totalCours")}
                value={mesCours.length}
                icon={<BookOpen size={24} />}
              />
              <StatCard
                title={t("monApprentissage.statistiques.termines")}
                value={coursTermines}
                icon={<GraduationCap size={24} />}
              />
              <StatCard
                title={t("monApprentissage.statistiques.enCours")}
                value={coursEnCours}
                icon={<BookOpen size={24} />}
              />
            </div>

            {/* Progression Globale */}
            <div className="bg-white shadow rounded p-6 mb-8">
              <h2 className="text-lg font-semibold mb-2 text-blue-700">
                {t("monApprentissage.progressionGlobale.titre")}
              </h2>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all"
                  style={{ width: `${progressionGlobale}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-700">
                {t("monApprentissage.progressionGlobale.valeur", {
                  valeur: progressionGlobale,
                })}{" "}
                {t("monApprentissage.progressionGlobale.pourcentage")}
              </p>
            </div>

            {/* Liste des cours */}
            {mesCours.length === 0 ? (
              <div className="bg-white p-10 text-center rounded shadow">
                <BookOpen size={48} className="text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  {t("monApprentissage.aucunCours.titre")}
                </h2>
                <p className="text-gray-500 mb-4">
                  {t("monApprentissage.aucunCours.message")}
                </p>
                <Link
                  to="/cours"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {t("monApprentissage.aucunCours.bouton")}
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mesCours.map((cours, index) => (
                  <div key={cours.id || `cours-${index}`} className="bg-white rounded shadow p-4">
                    <img
                      src={`http://localhost:8000/storage/${cours.photo_path}`}
                      alt={cours.titre}
                      onError={() => console.log("Image non trouvée :", cours.photo_path)}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <h3 className="text-lg font-bold mb-2">{cours.titre}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {t("monApprentissage.cours.progressionTexte", {
                        valeur: cours.progression,
                      })}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div
                        className="bg-green-500 h-3 rounded-full"
                        style={{ width: `${cours.progression}%` }}
                      ></div>
                    </div>
                    <Link
                      to={`/monapprentissage/${cours.id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {t("monApprentissage.cours.voirCours")}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white shadow p-4 rounded flex items-center gap-4">
    <div className="bg-gray-100 p-3 rounded-full text-blue-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

export default MonApprentissage;
