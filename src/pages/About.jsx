import React, { useEffect, useState } from "react";
import { Users, BookOpen, Award } from "lucide-react";
import api from "@/service/api";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({ users: 0, courses: 0, certificates: 0 });

  useEffect(() => {
    api.get("/statistiques")
      .then(res => res.data)
      .then(data => {
        setStats({
          courses: data.cours,
          users: data.formateurs,
          certificates: data.certificats
        });
      });
  }, []);

  const testimonials = t("about.testimonials", { returnObjects: true });

  return (
    <div className="p-8 max-w-6xl mx-auto mt-40">
      {/* Texte principal */}
      <div className="bg-white/70 backdrop-blur rounded-xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-black text-center">
          {t("about.title")}
        </h1>
        <p className="text-gray-800 leading-relaxed text-lg">
          {t("about.paragraph")}
        </p>
      </div>

      {/* Images réalistes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-16">
        <img
          src="https://thumbs.dreamstime.com/z/professeur-mathématiques-montrant-conseil-donnant-cours-virtuel-aux-étudiants-enseignant-moderne-femme-souriante-filmant-225351432.jpg"
          alt={t("about.images.professor")}
          className="w-full h-40 object-cover rounded-lg shadow"
        />
        <img
          src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc"
          alt={t("about.images.classroom")}
          className="w-full h-40 object-cover rounded-lg shadow"
        />
        <img
          src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b"
          alt={t("about.images.onlineTraining")}
          className="w-full h-40 object-cover rounded-lg shadow"
        />
        <img
          src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238"
          alt={t("about.images.certificate")}
          className="w-full h-40 object-cover rounded-lg shadow"
        />
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-blue-500">
          <div className="flex justify-center mb-2 text-blue-500">
            <Users size={28} />
          </div>
          <p className="text-2xl font-semibold">{stats.users}</p>
          <p className="text-sm text-gray-700">{t("about.stats.users")}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-gray-500">
          <div className="flex justify-center mb-2 text-gray-600">
            <BookOpen size={28} />
          </div>
          <p className="text-2xl font-semibold">{stats.courses}</p>
          <p className="text-sm text-gray-700">{t("about.stats.courses")}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-blue-500">
          <div className="flex justify-center mb-2 text-blue-500">
            <Award size={28} />
          </div>
          <p className="text-2xl font-semibold">{stats.certificates}</p>
          <p className="text-sm text-gray-700">{t("about.stats.certificates")}</p>
        </div>
      </div>

      {/* Témoignages */}
      <h2 className="text-2xl font-bold mb-6 text-black text-center">
        {t("about.testimonialsTitle")}
      </h2>
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {testimonials.map((tst, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <p className="italic text-gray-900">"{tst.comment}"</p>
            <p className="mt-3 font-semibold text-indigo-500 text-sm">– {tst.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
