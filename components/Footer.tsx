import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-dark)] text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-headline text-2xl text-white mb-2">SkinCarePrice</h3>
            <p className="text-sm text-[var(--color-blush)] leading-relaxed mb-3 max-w-sm italic font-headline">
              Smile lines and the memories that birthed them are a blessing.<br />
              We just think you deserve good products while you&apos;re at it.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-label font-semibold text-[var(--color-blush)] mb-3 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-sm font-label text-[var(--color-taupe)]">
              <li><Link href="/" className="hover:text-white transition-colors">All Reviews</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">Compare Products</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Skincare Dossier</Link></li>
              <li><Link href="/methodology" className="hover:text-white transition-colors">Our Methodology</Link></li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-sm font-label font-semibold text-[var(--color-blush)] mb-3 uppercase tracking-wider">Brands We Love</h4>
            <ul className="space-y-2 text-sm font-label text-[var(--color-taupe)]">
              <li><a href="https://bit.ly/3xwBvkm" target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white transition-colors">The Golden Secrets</a></li>
              <li><a href="https://oseamalibu.com/?rfsn=7790532.88631ca&utm_source=refersion&utm_medium=affiliate&utm_campaign=7790532.88631ca" target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white transition-colors">OSEA Malibu</a></li>
              <li><a href="https://true-botanicals.sjv.io/E09GAX" target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white transition-colors">True Botanicals</a></li>
              <li><a href="https://juara-skincare.sjv.io/enqBXZ" target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white transition-colors">Juara Skincare</a></li>
              <li><a href="https://shanidarden.sjv.io/5kAmzn" target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white transition-colors">Shani Darden</a></li>
            </ul>
          </div>
        </div>

        {/* FTC */}
        <div className="border-t border-[var(--color-taupe)] border-opacity-30 pt-6">
          <div className="text-xs font-label text-[var(--color-taupe)] leading-relaxed">
            <strong className="text-[var(--color-blush)]">Affiliate Disclosure:</strong> SkinCarePrice participates in affiliate programs including Amazon Associates (tag: skincareprice-20), Refersion, and ShareASale networks. Affiliate links are marked with <code>rel=&quot;sponsored&quot;</code>. Commissions never influence scores or editorial recommendations.{' '}
            <Link href="/methodology" className="underline hover:text-white">See full methodology.</Link>
          </div>
          <p className="text-xs font-label text-[var(--color-taupe)] mt-3">
            © {new Date().getFullYear()} SkinCarePrice · skincareprice.com · All reviews independently researched.
          </p>
        </div>
      </div>
    </footer>
  );
}
