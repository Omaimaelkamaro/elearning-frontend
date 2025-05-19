import React, { useEffect, useState } from "react";
import { Users, BookOpen, Award } from "lucide-react";
import api from "@/service/api";

const About = () => {
  const [stats, setStats] = useState({ users: 0, courses: 0, certificates: 0 });

  // 3 témoignages ajoutés
  const testimonials = [
    { name: "Sara M.", comment: "Une plateforme intuitive et des cours de qualité !" },
    { name: "Yassine B.", comment: "J’ai pu obtenir mon certificat en un temps record." },
    { name: "Fatima E.", comment: "Merci à toute l’équipe, j’ai adoré apprendre ici." }
  ];

  useEffect(() => {
api.get("/statistiques")
  .then(res => res.data)
    .then(data => {
      setStats({
        courses: data.cours,
        users: data.formateurs, // ou "formateurs" si tu veux afficher ce mot
        certificates: data.certificats
      });
    });
}, []);


  return (
    <div className="p-8 max-w-6xl mx-auto bg-gray-50">
      {/* Titre et introduction */}
      <h1 className="text-4xl font-bold mb-4 text-blue-600">À propos de EduPlateforme</h1>
      <p className="text-gray-700 mb-10 leading-relaxed text-lg">
        EduPlateforme est une solution moderne et complète pour l'apprentissage en ligne. Notre objectif est de rendre le savoir accessible à tous grâce à des cours bien conçus, des outils simples, et une communauté engagée.
      </p>

      {/* Statistiques avec style chic */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-blue-400">
          <div className="flex justify-center mb-2 text-blue-500">
            <Users size={28} />
          </div>
          <p className="text-2xl font-semibold">{stats.users}</p>
          <p className="text-sm text-gray-600">Utilisateurs</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-green-400">
          <div className="flex justify-center mb-2 text-green-500">
            <BookOpen size={28} />
          </div>
          <p className="text-2xl font-semibold">{stats.courses}</p>
          <p className="text-sm text-gray-600">Cours</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-purple-400">
          <div className="flex justify-center mb-2 text-purple-500">
            <Award size={28} />
          </div>
          <p className="text-2xl font-semibold">{stats.certificates}</p>
          <p className="text-sm text-gray-600">Certificats délivrés</p>
        </div>
      </div>

      {/* Témoignages */}
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Ce que disent nos utilisateurs</h2>
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition"
          >
            <p className="italic text-gray-700">"{t.comment}"</p>
            <p className="mt-3 font-semibold text-blue-600 text-sm">– {t.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;