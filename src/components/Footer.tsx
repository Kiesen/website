import staticMetaData from '@static/meta.json';

export function Footer() {
  const currentYear = new Date().getUTCFullYear();
  return (
    <footer className="w-full container mx-auto mt-12 text-sm text-center">
      <p className="no-underline hover:no-underline">
        &copy; {currentYear} &bull; {staticMetaData.author}
      </p>
    </footer>
  );
}
