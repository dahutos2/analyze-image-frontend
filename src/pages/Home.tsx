import React, { useState } from 'react';
import useImages from '../hooks/useImages';
import Button from '../components/Button';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import styles from './Home.module.css'; // CSSモジュールを適用

const Home: React.FC = () => {
    const { images, uploadImage, fetchImages } = useImages();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null); // エラーメッセージをリセット
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file)); // プレビュー用のURLを生成
        }
    };

    const handleUpload = async () => {
        if (imageFile) {
            setIsLoading(true);
            try {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const base64 = e.target!.result as string;
                    await uploadImage(imageFile.name, base64.split(',')[1]);
                    await fetchImages(); // 新しい画像一覧を取得
                };
                reader.readAsDataURL(imageFile);
            } catch {
                setError('画像のアップロードに失敗しました。'); // エラー処理
            } finally {
                setIsLoading(false); // ローディング状態の終了
            }
        }
    };

    return (
        <div className={styles.container}>
            <h1>画像をアップロード</h1>
            <div className={styles.uploadArea}>
                <input type="file" onChange={handleFileChange} className={styles.uploadInput} />
                <Button onClick={handleUpload}>画像をアップロード</Button>
            </div>
            {isLoading && <LoadingIndicator />}
            {error && <ErrorMessage message={error} />}
            {preview && <img src={preview} alt="プレビュー" className={styles.preview} />}
            <div className={styles.gallery}>
                {images.map((img) => (
                    <div key={img.imageId} className={styles.imageItem}>
                        <img src={`data:image/jpeg;base64,${img.base64}`} alt={img.name} />
                        <p>{img.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
