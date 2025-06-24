'use client';

import { Cat } from '@/types/cat';
import React from "react";

interface CatCardProps {
    cat: Cat;
    onDelete: (id: number) => void;
    onEdit: (id: number, salary: number) => void;
}

const CatCard: React.FC<CatCardProps> = ({ cat, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [newSalary, setNewSalary] = React.useState(cat.salary.toString());

    const handleSave = () => {
        onEdit(cat.id, Number(newSalary));
        setIsEditing(false);
    };

    return (
        <div className="p-4 border rounded shadow-sm flex justify-between items-center">
            <div>
                <p className="font-bold">{cat.name} ({cat.breed})</p>
                <p>Experience: {cat.years_of_experience} years</p>
                {isEditing ? (
                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="number"
                            value={newSalary}
                            onChange={(e) => setNewSalary(e.target.value)}
                            className="p-1 border rounded"
                            placeholder="New Salary"
                        />
                        <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 rounded text-sm">Save</button>
                        <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-2 py-1 rounded text-sm">Cancel</button>
                    </div>
                ) : (
                    <p>Salary: ${cat.salary.toLocaleString()}</p>
                )}
            </div>
            <div className="flex gap-2">
                <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">Edit</button>
                <button onClick={() => onDelete(cat.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">Delete</button>
            </div>
        </div>
    );
};

export default CatCard;