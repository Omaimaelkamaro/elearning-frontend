import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { UserContext} from "@/context/User/UserContext"; 
import { useContext } from "react";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { addUser } =useContext(UserContext); // utilise le contexte
  const navigate = useNavigate();

  const handleCreateUser = async () => {
    if (!name || !email || !password || !password_confirmation ||!role) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);
    try {
      await addUser({ name, email, password,password_confirmation, role });
      toast.success("Utilisateur ajouté avec succès");
      navigate("/admin/users"); // ou autre chemin selon ta navigation
    } catch (error) {
      console.error(error);
      toast.error("Échec de l'ajout de l'utilisateur");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Ajouter un utilisateur</h1>
        <p className="text-sm">Remplis les informations ci-dessous pour ajouter un nouvel utilisateur</p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Nom</Label>
          <Input
            type="text"
            placeholder="Nom de l'utilisateur"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Email de l'utilisateur"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label>Mot de passe</Label>
          <Input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Label>Confirmation de mot de passe</Label>
          <Input
            type="password"
            placeholder="Confirmation de mot de passe "
            value={password_confirmation}
            onChange={(e) => setPassword_confirmation(e.target.value)}
          />
        </div>
        <div>
          <Label>Rôle</Label>
          <Select onValueChange={setRole}>
            <SelectTrigger className="min-w-[180px] max-w-[220px]">
              <SelectValue placeholder="Sélectionnez un rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Rôles disponibles</SelectLabel>
                <SelectItem value="administrateur">Administrateur</SelectItem>
                <SelectItem value="formateur">Formateur</SelectItem>
                <SelectItem value="etudiant">Étudiant</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/accounts")}>
            Retour
          </Button>
          <Button disabled={isLoading} onClick={handleCreateUser}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Création...
              </>
            ) : (
              "Créer"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
