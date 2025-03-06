import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between">
      <Link href="/">
        <h2>모두의 : 후기</h2>
      </Link>
    </header>
  );
}
