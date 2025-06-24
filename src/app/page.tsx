'use client';

import {useEffect, useState} from "react";
import {Cat} from "@/types/cat";
import * as api from "@/lib/api"

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

  return (
      <main className="container mx-auto p-4" >
        <h1 className="text-2xl font-bold mb-4">Spy Cats Management</h1>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

        <div>
          <h2 className="text-xl font-semibold mb-2">Registered Spy Cats</h2>
          {isLoading ? <p>Loading cats...</p> : (
              <div className="space-y-2">
                {cats.map((cat) => (
                    <div key={cat.id} className="p-4 border rounded shadow-sm flex justify-between items-center">
                      <div>
                        <p className="font-bold">{cat.name} ({cat.breed})</p>
                        <p>Experience: {cat.years_of_experience} years</p>
                        <p>Salary: ${cat.salary.toLocaleString()}</p>

                      </div>
                      <div className="flex gap-2">
                        <button className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">Edit</button>
                        <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600">Delete</button>
                      </div>
                    </div>
                ))}
              </div>
          )}
        </div>
      </main>
  )
}