import Link from "next/link";
import logo from "../../../public/logo.png";
import { ShoppingCart, Search } from "lucide-react";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="
      sticky top-0 z-50
      bg-background/80 backdrop-blur
      border-b border-primary/10
    ">
      <div className="
        mx-auto max-w-7xl
        flex items-center justify-between
        px-6 py-4
      ">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logo}
            alt="Crochinesta logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="
            font-heading
            text-lg
            font-normal
            tracking-wide
            text-primary
          ">
            Crochinesta
          </span>
        </Link>

        {/* Navigation */}
        <div className="
          hidden md:flex items-center gap-10
          font-heading text-lg font-normal tracking-wide
        ">
          {["Home", "About", "Products", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="
                relative
                text-foreground
                text-lg
                transition-colors
                hover:text-primary
                after:absolute
                after:-bottom-1
                after:left-0
                after:h-px
                after:w-0
                after:bg-primary
                after:transition-all
                hover:after:w-full
              "
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">

          {/* Search */}
          <Link
            href="/search"
            className="
              relative
              p-2
              rounded-full
              transition-colors
              hover:bg-primary/5
            "
          >
            <Search className="text-primary" />
          </Link>
          
          {/* Cart */}
          <Link
            href="/cart"
            className=" 
              relative
              p-2
              rounded-full
              transition-colors
              hover:bg-primary/5
            "
          >
            <ShoppingCart className="text-primary" />
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-[#3D2314] text-white text-[10px] font-semibold leading-none">
              2
            </span>
          </Link>

        </div>

      </div>
    </nav>
  );
}
