import AppFooter from '@/app/globalComponents/AppFooter';
import dynamic from 'next/dynamic';
import { lazy, Suspense } from 'react';
const ClientHeader = dynamic(() => import('../../globalComponents/AppHeader'), { ssr: false });
const ScalarContact = lazy(() => import('@/app/components/ScalarContact'));
export default async function ContactPage({ params: { lang } }: { params: { lang: string } }) {
  return (
    <Suspense>
      <ClientHeader />
      <main className='min-h-screen bg-sutraContactUsTempBg dark:bg-almost-black'>
        <Suspense>
          <ScalarContact isPage />
        </Suspense>
      </main>
      <AppFooter />
    </Suspense>
  );
}
