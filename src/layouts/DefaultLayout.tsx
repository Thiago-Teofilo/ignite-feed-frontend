import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

import styles from './DefaultLayout.module.css'
import { useAuth } from '../composables/use-auth';
import { MoonLoader } from 'react-spinners';
import { CSSProperties } from 'react';
// import { toast } from 'react-toastify';

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export function DefaultLayout() {
  // useEffect(() => {
  //   toast.warn("Este projeto utiliza um servidor gratuito, então a resposta pode ser um pouco mais lenta. Obrigado pela paciência! 😊")
  // }, [])

  const { isLoading } = useAuth()

  return (
    <div>
      <Header />
      { isLoading ? (
        <div className={`${styles.content} ${styles.loading}`}>
          <MoonLoader 
            color="var(--green-300)"
            loading={true}
            cssOverride={override}
            size={60}
          />
        </div>
      ) : (
        <div className={styles.content}>
          <Outlet />
        </div>
      ) }
    </div>
  );
}
