import React, { useState } from 'react';
import useImages from '../hooks/useImages';
import Button from '../components/Button';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import styles from './Image.module.css';

const Image: React.FC = () => {
    const { selectedImage, binarizeImage } = useImages();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleBinarize = async () => {
        if (selectedImage) {
            setIsLoading(true);
            setError(null); // エラーメッセージをリセット
            try {
                // 二値化処理を行う。成功すればselectedImageが更新される
                await binarizeImage(selectedImage.imageId);
            } catch {
                setError('二値化処理に失敗しました。'); // エラー処理
            } finally {
                setIsLoading(false); // ローディング状態の終了
            }
        }
    };

    return (
        <div className={styles.container}>
            <h1>画像詳細</h1>
            {isLoading && <LoadingIndicator />}
            {error && <ErrorMessage message={error} />}
            {selectedImage ? (
                <>
                    <img
                        src={`data:image/jpeg;base64,${selectedImage.base64}`}
                        alt={selectedImage.name}
                        className={styles.image}
                    />
                    <div className={styles.buttonArea}>
                        <Button onClick={handleBinarize}>二値化処理</Button>
                    </div>
                </>
            ) : (
                <p>画像が選択されていません。</p>
            )}
        </div>
    );
};

export default Image;
