import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

export default function Header() {
  return (
    <header className="py-6 px-8 md:px-16 flex bg-white justify-between items-center">
      <div className="flex items-center gap-2">
        <Image 
          src="/dietify-logo.svg" 
          alt="Dietify Logo" 
          width={110} 
          height={110} 
          priority
        />
      </div>
      <div className="flex items-center gap-4">
        <Link href="/about" className="text-teal-700 hover:text-teal-900">
          About
        </Link>
        <Link href="/start">
          <Button variant="default" size="default">
            Start now
          </Button>
        </Link>
      </div>
    </header>
  );
}