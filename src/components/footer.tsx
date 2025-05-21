export default function Footer() {
  return (
    <footer className="py-6 px-8 md:px-16 bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto text-center text-gray-600 text-sm">
        Copyright © {new Date().getFullYear()} Dietify - All rights reserved.
      </div>
    </footer>
  );
}