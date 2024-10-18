import React from 'react';
import { PencilSimple } from 'phosphor-react';  // Ícone do Phosphor
import styles from './ImageInput.module.css';

interface Props {
  onChangeImage: (base64Image: string) => void;
  className?: string;
  id: string;  // Novo prop para garantir IDs únicos
}

const ImageInput: React.FC<Props> = ({ className, onChangeImage, id }) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onChangeImage(base64String);
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={className}>
      <div className={styles.root}>
        <input
          id={id}  // Use o id fornecido
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className={styles.hiddenInput}
          />
        <label htmlFor={id} className={styles.iconLabel}>
          <PencilSimple size={20} weight="bold" />
        </label>
      </div>
    </div>
  );
};

export default ImageInput;
