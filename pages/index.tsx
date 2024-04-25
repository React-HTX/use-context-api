import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`min-h-screen flex  flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <div className="mb-32 flex flex-col justify-center items-center text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left">
        <Link
          href="/soltution"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Context API{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            See how the Context API stores data.
          </p>
        </Link>
      </div>
    </main>
  );
}
