import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ScalarContact = dynamic(() => import('@/app/components/ScalarContact'));
export default async function ContactPage({ params: { lang } }: { params: { lang: string } }) {
  return (
    <main className='min-h-screen bg-sutraContactUsTempBg dark:bg-almost-black'>
      <Suspense>
        <ScalarContact isPage />
      </Suspense>
    </main>
  );
}
