import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, BookOpen, DollarSign, Send, GraduationCap } from "lucide-react";
import { useFormateurdemandeContext } from "@/context/FormateurRequestContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const DevenirFormateur = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState("en_attente");
  const [submitted, setSubmitted] = useState(false);

  const { postDemandeFormateur, loading, success, error } = useFormateurdemandeContext();

  const formSchema = z.object({
    persuasion: z.string().min(50, t("validationMessage")),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      persuasion: "",
    },
  });

  const etudiant_id = 123;
  const token = "TOKEN_EXEMPLE";

  const onSubmit = async (data) => {
    await postDemandeFormateur(data.persuasion);
    setSubmitted(true);
  };

  useEffect(() => {
    if (success) toast.success(success);
    if (error) {
      toast.error(error);
      setSubmitted(false);
    }
  }, [success, error]);

  const getStatusBadge = () => {
    switch (status) {
      case "en_attente":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">{t("statusPending")}</Badge>;
      case "approuvee":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">{t("statusApproved")}</Badge>;
      case "rejetee":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">{t("statusRejected")}</Badge>;
      default:
        return <Badge variant="outline">{t("statusPending")}</Badge>;
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-sm md:text-base">
      {/* Titre et image */}
      <div className="py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">

            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-center md:text-left text-gray-900 whitespace-nowrap">
  {t("title")}{" "}
  <span className="relative inline-block">
    <GraduationCap
      size={35}
      className="absolute -top-6 left-0 text-indigo-500"
    />
    <span>Madrassa</span>
  </span>
</h1>




              <p className="mt-4 text-gray-600 max-w-xl text-left">
                {t("description")}
              </p>
              <div className="mt-6 text-left">
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => {
                    document.getElementById("formulaire").scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {t("buttonJoin")}
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
             <img
  src="/images/Happy young african american woman w.jpeg"
  alt="Formateur e-learning"
  className="w-[450px] h-auto rounded-xl shadow-lg ml-auto"

/>
            </div>
          </div>
        </div>
      </div>

      {/* Étapes */}
      <main className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
  <div className="p-6 bg-gray-50 border rounded-xl text-center">
    <User className="text-indigo-500 mx-auto mb-2" size={32} />
    <h3 className="font-semibold mb-2">{t("step1Title")}</h3>
    <p className="text-gray-600">{t("step1Text")}</p>
  </div>
  <div className="p-6 bg-gray-50 border rounded-xl text-center">
    <BookOpen className="text-indigo-500 mx-auto mb-2" size={32} />
    <h3 className="font-semibold mb-2">{t("step2Title")}</h3>
    <p className="text-gray-600">{t("step2Text")}</p>
  </div>
  <div className="p-6 bg-gray-50 border rounded-xl text-center">
    <DollarSign className="text-indigo-500 mx-auto mb-2" size={32} />
    <h3 className="font-semibold mb-2">{t("step3Title")}</h3>
    <p className="text-gray-600">{t("step3Text")}</p>
  </div>
</div>

        {/* Formulaire */}
        <div id="formulaire" className="max-w-3xl mx-auto">
          {submitted && success ? (
            <div className="bg-white border rounded-lg p-8 shadow text-center">
              <h2 className="text-xl font-bold mb-4 text-gray-800">{t("successTitle")}</h2>
              <p className="text-base text-gray-700 mb-4">{t("successMessage")}</p>
              <p className="mb-4">{t("currentStatus")}</p>
              <div className="mb-4">{getStatusBadge()}</div>
              <p className="text-sm text-gray-500">{t("emailNotice")}</p>
            </div>
          ) : (
            <div className="bg-white border rounded-lg p-8 shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">{t("formTitle")}</h2>
              <p className="mb-6 text-gray-600">{t("formDescription")}</p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="persuasion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">{t("formLabel")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("formPlaceholder")}
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    disabled={loading}
                  >
                    {loading ? t("formButtonLoading") : (<><Send className="mr-2 h-4 w-4" /> {t("formButton")}</>)}
                  </Button>
                </form>
              </Form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DevenirFormateur;
