import { Cat, CatCreate } from '@/types/cat';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
}

export async function getCats(): Promise<Cat[]> {
    const response = await fetch(`${API_BASE_URL}/cats/`);
    return handleResponse<Cat[]>(response);
}

export async function createCat(cat: CatCreate): Promise<Cat> {
    const response = await fetch(`${API_BASE_URL}/cats/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cat),
    });
    return handleResponse<Cat>(response);
}

export async function updateCatSalary(id: number, salary: number): Promise<Cat> {
    const response = await fetch(`${API_BASE_URL}/cats/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ salary }),
    });
    return handleResponse<Cat>(response);
}

export async function deleteCat(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/cats/${id}/`, {
        method: 'DELETE',
    });
    if (response.status !== 200) {
        throw new Error('Failed to delete cat');
    }
}