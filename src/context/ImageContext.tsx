import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { Image } from '../models/ImageModel';
import * as ImageService from '../services/ImageService';

interface ImageContextProps {
    images: Image[];
    selectedImage?: Image;
    setSelectedImage: (image?: Image) => void;
    uploadImage: (name: string, base64: string) => Promise<void>;
    fetchImages: () => Promise<void>;
    binarizeImage: (imageId: string, threshold?: number) => Promise<void>;
}

const ImageContext = createContext<ImageContextProps | null>(null);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [images, setImages] = useState<Image[]>([]);
    const [selectedImage, setSelectedImage] = useState<Image | undefined>();

    const fetchImages = useCallback(async () => {
        const fetchedImages = await ImageService.fetchImages();
        setImages(fetchedImages);
    }, []);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    const uploadImage = useCallback(async (name: string, base64: string) => {
        await ImageService.uploadImage(name, base64);
        await fetchImages();
    }, [fetchImages]);

    const binarizeImage = useCallback(async (imageId: string, threshold = 50) => {
        const binarizedBase64 = await ImageService.binarizeImage(imageId, threshold);
        const updatedImages = images.map(img => img.imageId === imageId ? { ...img, base64: binarizedBase64 } : img);
        setImages(updatedImages);
        if (selectedImage?.imageId === imageId) {
            setSelectedImage({ ...selectedImage, base64: binarizedBase64 });
        }
    }, [images, selectedImage]);

    const value = useMemo(() => ({
        images,
        selectedImage,
        setSelectedImage,
        uploadImage,
        fetchImages,
        binarizeImage,
    }), [images, selectedImage, uploadImage, fetchImages, binarizeImage]);

    return (
        <ImageContext.Provider value={value}>
            {children}
        </ImageContext.Provider>
    );
};

export default ImageContext;
