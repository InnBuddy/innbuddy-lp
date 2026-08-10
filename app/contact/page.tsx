'use client';

import { useRouter } from 'next/navigation';
import { ContactFormModal } from '@/components/ContactFormModal';

export default function ContactPage() {
  const router = useRouter();

  return (
    <ContactFormModal
      isOpen={true}
      onClose={() => router.push('/')}
      isPage={true} // ★ これを追加
    />
  );
}