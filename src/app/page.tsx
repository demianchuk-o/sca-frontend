'use client';

import { useEffect, useState } from "react";
import { Cat, CatCreate } from "@/types/cat";
import * as api from "@/lib/api"
import CatCard from "@/components/cat/CatCard";
import AddCatForm from "@/components/cat/AddCatForm";

export default function SpyCatsDashboard() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCats = async () => {
    try {
      setIsLoading(true);
      const data = await api.getCats();
      setCats(data);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cats');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCats();
  }, []);

  const handleAddCat = async (newCat: CatCreate) => {
    try {
      await api.createCat(newCat);
      fetchCats();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to add cat');
    }
  };

  const handleDeleteCat = async (id: number) => {
    try {
      await api.deleteCat(id);
      fetchCats();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete cat');
    }
  };

  const handleUpdateSalary = async (id: number, salary: number) => {
    try {
      await api.updateCatSalary(id, salary);
      fetchCats();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update salary');
    }
  };

  return (
      <main className="container mx-auto p-4" >
        <h1 className="text-2xl font-bold mb-4">Spy Cats Management</h1>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

        <AddCatForm onAdd={handleAddCat} />

        <div>
          <h2 className="text-xl font-semibold mb-2">Registered Spy Cats</h2>
          {isLoading ? <p>Loading cats...</p> : (
              <div className="space-y-2">
                {cats.map((cat) => (
                    <CatCard
                        key={cat.id}
                        cat={cat}
                        onDelete={handleDeleteCat}
                        onEdit={handleUpdateSalary}
                    />
                ))}
              </div>
          )}
        </div>
      </main>
  )
}