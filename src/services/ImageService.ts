import type { Image } from '../models/ImageModel';

export const uploadImage = async (name: string, base64: string): Promise<string> => {
    const response = await fetch(`/api/images/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, image: base64 }),
    });
    const data = await response.json();
    return data.image_id;
};

export const fetchImages = async (): Promise<Image[]> => {
    const response = await fetch(`/api/images`);
    const data = await response.json();
    return data.image_list;
};

export const getImage = async (imageId: string): Promise<string> => {
    const response = await fetch(`/api/images/${imageId}`);
    const data = await response.json();
    return data.image;
};

export const binarizeImage = async (imageId: string, threshold = 50): Promise<string> => {
    const response = await fetch(`/api/processing/binarize`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_id: imageId, threshold }),
    });
    const data = await response.json();
    return data.image;
};
