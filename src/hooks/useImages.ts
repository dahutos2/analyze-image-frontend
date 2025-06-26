import { useContext } from 'react';
import ImageContext from '../context/ImageContext';

const useImages = () => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error('useImages must be used within an ImageProvider');
    }
    return context;
};

export default useImages;
