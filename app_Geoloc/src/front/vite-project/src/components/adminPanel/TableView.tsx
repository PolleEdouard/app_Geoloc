import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SyncButton from "@/components/ui/SyncButton";

interface Batiment {
  id: number;
  osmId: number;
  latitude: number;
  longitude: number;
  altName: string;
  name: string;
}

const AdminPanel: React.FC = () => {
  const [batiments, setBatiments] = useState<Batiment[]>([]);
  const [form, setForm] = useState<Partial<Batiment>>({});
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const fetchBatiments = async () => {
    const res = await axios.get("/api/batiments");
    console.log(res.data);
    setBatiments(res.data);
  };

  useEffect(() => {
    fetchBatiments();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "latitude" || name === "longitude" || name === "osmId") {
    const numericRegex = /^-?\d*\.?\d*$/;
    if (!numericRegex.test(value)) return; // Ignore les caractères non valides
  }
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    // Validation
    if (!form.name || !form.latitude || !form.longitude) {
      setErrorMessage("Le nom, la latitude et la longitude sont obligatoires.");
      return;
    }

    setErrorMessage(""); // Efface l'erreur précédente

    if (isEditing !== null) {
      await axios.put(`/api/batiments/${isEditing}`, form);
    } else {
      await axios.post("/api/batiments", form);
    }
    setForm({});
    setIsEditing(null);
    fetchBatiments();
  };

  const handleEdit = (batiment: Batiment) => {
    setForm(batiment);
    setIsEditing(batiment.id);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSubmitEdit = async () => {
    if (isEditing !== null) {
      await axios.put(`/api/batiments/${isEditing}`, form);
      setForm({}); // Réinitialise le formulaire
      setIsEditing(null); // Réactive le bouton "Ajouter"
      fetchBatiments();
    }
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`/api/batiments/${id}`);
    fetchBatiments();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Bâtiments</h1>

      <div ref={formRef} className="grid grid-cols-2 gap-4 mb-4">
        <Input
          name="osmId"
          placeholder="OSM ID"
          value={form.osmId || ""}
          onChange={handleChange}
        />
        <Input
          name="latitude"
          placeholder="Latitude"
          inputMode="decimal"
          value={form.latitude || ""}
          onChange={handleChange}
        />
        <Input
          name="longitude"
          placeholder="Longitude"
          value={form.longitude || ""}
          onChange={handleChange}
        />
        <Input
          name="altName"
          placeholder="Alt Name"
          value={form.altName || ""}
          onChange={handleChange}
        />
        <Input
          name="name"
          placeholder="Name"
          value={form.name || ""}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-4">
        <Button onClick={handleSubmit} disabled={isEditing !== null}>
          Ajouter
        </Button>
        {errorMessage && (
          <p className="text-red-500">{errorMessage}</p>
        )}
        <Button onClick={handleSubmitEdit} disabled={isEditing === null}>
          Modifier
        </Button>
        
        {isEditing !== null && (
          <Button
            variant="outline"
            onClick={() => {
              setForm({});
              setIsEditing(null);
            }}
          >
            Annuler
          </Button>
        )}
        <SyncButton fetchBatiments={fetchBatiments} />
      </div>
        
      <table className="w-full mt-8 border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th>
            <th>OSM ID</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Name</th>
            <th>Alt Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {batiments.map((bat) => (
            <tr key={bat.id} className="border-t">
              <td>{bat.id}</td>
              <td>{bat.osmId}</td>
              <td>{String(bat.latitude).slice(0, 5)}</td>
              <td>{String(bat.longitude).slice(0, 5)}</td>
              <td>{bat.name}</td>
              <td>{bat.altName}</td>
              <td>
                <Button
                  size="sm"
                  className="mr-2"
                  onClick={() => handleEdit(bat)}
                >
                  Modifier
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(bat.id)}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
