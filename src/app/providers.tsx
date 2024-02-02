import { SWRConfig } from 'swr';

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SWRConfig>{children}</SWRConfig>;
}
