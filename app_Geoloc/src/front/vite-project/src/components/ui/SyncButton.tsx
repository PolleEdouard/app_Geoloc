import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button"; // ajuste selon ton chemin réel

type Change = {
  action: "inserted" | "updated" | string;
  id?: number;
  LIB_RESSOURCE?: string;
  data?: { [key: string]: unknown };
};

type SyncButtonProps = {
  fetchBatiments: () => void;
};

const SyncButton: React.FC<SyncButtonProps> = ({ fetchBatiments }) => {
  const [changes, setChanges] = useState<Change[]>([]);
  const [syncTriggered, setSyncTriggered] = useState(false);
  const handleSync = async () => {
    try {
      const response = await axios.post<{ changes: Change[] }>(
        "/api/sync-abyla"
      );
      console.log("Synchronisation :", response.data);
      setSyncTriggered(true);
      setChanges(response.data.changes || []);
      fetchBatiments();
    } catch (error) {
      console.error("Erreur de synchro :", error);
    }
  };

  return (
    <div>
      <Button onClick={handleSync} className="mb-4">
        Synchroniser depuis Abyla
      </Button>

      {syncTriggered &&
        (changes.length > 0 ? (
          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">
              Changements détectés :
            </h2>
            <ul className="space-y-1 text-sm max-h-48 overflow-y-auto pr-2">
              {changes.map((item, index) => (
                <li key={index}>
                  {item.action.toUpperCase()} – {item.LIB_RESSOURCE}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow">
            Aucun changement détecté.
          </div>
        ))}
    </div>
  );
};

export default SyncButton;
