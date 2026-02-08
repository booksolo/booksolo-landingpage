import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BookSolo',
  description: 'Social media content for solo service businesses',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
