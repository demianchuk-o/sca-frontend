'use client';

import { CatCreate } from '@/types/cat';
import React, { useRef } from 'react';

interface AddCatFormProps {
    onAdd: (cat: CatCreate) => void;
}

const AddCatForm: React.FC<AddCatFormProps> = ({ onAdd }) => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = formRef.current;
        if (!form) {
            return;
        }

        const formData = new FormData(form);

        const newCat: CatCreate = {
            name: formData.get('name') as string,
            years_of_experience: Number(formData.get('years_of_experience')),
            breed: formData.get('breed') as string,
            salary: Number(formData.get('salary')),
        };

        onAdd(newCat);
        form.reset();
    };

    return (
        <div className="mb-8 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Add New Spy Cat</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <input name="name" placeholder="Name" required className="p-2 border rounded" />
                <input name="years_of_experience" type="number" placeholder="Years of Exp." required className="p-2 border rounded" />
                <input name="breed" placeholder="Breed" required className="p-2 border rounded" />
                <input name="salary" type="number" placeholder="Salary" required className="p-2 border rounded" />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Cat</button>
            </form>
        </div>
    );
};

export default AddCatForm;