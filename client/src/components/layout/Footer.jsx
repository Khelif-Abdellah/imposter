function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 py-4">
      <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Imposter Game — Made with ❤️ by Khelif
        Abdellah
      </div>
    </footer>
  );
}

export default Footer;
