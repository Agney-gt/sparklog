import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold">Resources</h3>
            <nav className="mt-4 flex flex-col space-y-2">
              <Link className="text-sm text-muted-foreground hover:text-primary" href="/documentation">
                Documentation
              </Link>
              <Link className="text-sm text-muted-foreground hover:text-primary" href="/blog">
                Blog
              </Link>
              <Link className="text-sm text-muted-foreground hover:text-primary" href="/analytics">
                Analytics
              </Link>
            </nav>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold">Company</h3>
            <nav className="mt-4 flex flex-col space-y-2">
              <Link className="text-sm text-muted-foreground hover:text-primary" href="/about">
                About Us
              </Link>
              <Link className="text-sm text-muted-foreground hover:text-primary" href="/careers">
                Careers
              </Link>
              <Link className="text-sm text-muted-foreground hover:text-primary" href="/contact">
                Contact
              </Link>
            </nav>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold">Legal</h3>
            <nav className="mt-4 flex flex-col space-y-2">
              <Link className="text-sm text-muted-foreground hover:text-primary" href="/terms">
                Terms of Service
              </Link>
              <Link className="text-sm text-muted-foreground hover:text-primary" href="/privacy">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2024 Sparklog. All rights reserved.</p>
          <div className="flex space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.25 3.438 9.688 8.207 11.188.6.112.793-.262.793-.585 0-.287-.011-1.045-.017-2.052-3.338.724-4.042-1.607-4.042-1.607-.546-1.38-1.333-1.749-1.333-1.749-1.086-.743.083-.728.083-.728 1.204.085 1.838 1.236 1.838 1.236 1.067 1.826 2.8 1.297 3.48.992.108-.774.418-1.297.76-1.597-2.665-.303-5.467-1.333-5.467-5.933 0-1.313.469-2.386 1.236-3.227-.124-.303-.536-1.53.117-3.187 0 0 1.008-.322 3.303 1.229.957-.266 1.986-.398 3.006-.403 1.02.005 2.049.137 3.006.403 2.295-1.551 3.303-1.229 3.303-1.229.653 1.657.241 2.884.118 3.187.767.841 1.236 1.914 1.236 3.227 0 4.61-2.805 5.63-5.474 5.925.43.37.815 1.096.815 2.209 0 1.594-.014 2.872-.014 3.258 0 .327.19.703.798.585C20.563 21.688 24 17.25 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://discord.gg/4x58yGcD9w"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 