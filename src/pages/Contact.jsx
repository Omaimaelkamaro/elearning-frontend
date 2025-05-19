import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import Footer from "../components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit comporter au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  subject: z.string().min(5, "Le sujet doit comporter au moins 5 caractères"),
  message: z.string().min(10, "Le message doit comporter au moins 10 caractères"),
});

const Contact = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
    toast.success("Message envoyé avec succès! Nous vous contacterons bientôt.");
    form.reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section - Photo à gauche et texte à droite */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
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
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Contactez-nous
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  Vous avez des questions ou besoin d'aide ? Notre équipe est là pour vous
                  accompagner et répondre à toutes vos demandes. N'hésitez pas à nous contacter,
                  nous vous répondrons dans les plus brefs délais.
                </p>
                <p className="text-violet-500 font-semibold">
                  Nous sommes ravis de vous lire ! 💌
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-violet-500">
                Envoyez-nous un message
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
                            <FormLabel className="text-violet-500">Nom</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre nom" {...field} />
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
                            <FormLabel className="text-violet-500">Email</FormLabel>
                            <FormControl>
                              <Input placeholder="votre@email.com" type="email" {...field} />
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
                          <FormLabel className="text-violet-500">Sujet</FormLabel>
                          <FormControl>
                            <Input placeholder="Sujet de votre message" {...field} />
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
                          <FormLabel className="text-violet-500">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Écrivez votre message ici..."
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
                      className="w-full md:w-auto bg-violet-500 hover:bg-violet-600 text-white"
                      size="lg"
                    >
                      <Send className="mr-2 h-4 w-4" /> Envoyer le message
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