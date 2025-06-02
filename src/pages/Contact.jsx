import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import api from "@/service/api";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";


const formSchema = z.object({
  name: z.string().min(2, "Le nom doit comporter au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  subject: z.string().min(5, "Le sujet doit comporter au moins 5 caractères"),
  message: z.string().min(10, "Le message doit comporter au moins 10 caractères"),
});

const Contact = () => {
const { t, i18n } = useTranslation(); 
  const language = i18n.language;       

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/contact-us", data);
      console.log("Form data:", data);
      toast.success("Message envoyé avec succès ! Nous vous contacterons bientôt.");
      form.reset();
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
  <div className="min-h-screen flex flex-col">
    <main className="flex-grow">
      {/* Hero Section - Photo à gauche et texte à droite */}
      <section className="pt-40 pb-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Photo à gauche */}
            <div className="w-full md:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                  alt="Contact us"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Texte à droite */}
            <div className="w-full md:w-1/2">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-4">
                  {t("contact.title")}
                </h1>
                <p className="text-lg text-black mb-6">
                  {t("contact.description")}
                </p>
                <p className="text-indigo-500 font-semibold">
                  {t("contact.cta")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-black">
              {t("contact.formTitle")}
            </h2>
            <div className="bg-card shadow-md rounded-lg p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">{t("contact.name")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("contact.namePlaceholder")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">{t("contact.email")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("contact.emailPlaceholder")} type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">{t("contact.subject")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("contact.subjectPlaceholder")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">{t("contact.message")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("contact.messagePlaceholder")}
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full md:w-auto bg-indigo-500 hover:bg-indigo-600 text-white"
                    size="lg"
                  >
                    <Send className="mr-2 h-4 w-4" /> {t("contact.submit")}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
);

};

export default Contact;
