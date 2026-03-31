const GITHUB_USERNAME = "imrajat_sharma";
const GITHUB_REPO = "cpu-scheduler-visualizer";
const LINKEDIN_USERNAME = "imrajat-sharma";
const TWITTER_USERNAME = "imrajat-sharma";


export default function Footer() {
  return (
    <footer className="mt-16 pb-8 animate-fade-in">
      {/* Divider */}
      <div className="max-w-md mx-auto mb-8">
        <div className="h-px bg-linear-to-r from-transparent via-gray-700 to-transparent" />
      </div>

      {/* Social Buttons */}
      <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
        {/* GitHub Star Button */}
        <a
          href={`https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-2 bg-gray-800/80 hover:bg-gray-700/80 
                     border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200
                     hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-0.5"
        >
          <svg
            className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
          </svg>
          <span className="text-sm font-medium text-gray-300 group-hover:text-white">
            Star on GitHub
          </span>
        </a>

        {/* GitHub Follow Button */}
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-2 bg-gray-800/80 hover:bg-gray-700/80 
                     border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200
                     hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-0.5"
        >
          <svg
            className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="text-sm font-medium text-gray-300 group-hover:text-white">
            Follow @{GITHUB_USERNAME}
          </span>
        </a>

        {/* LinkedIn Button */}
        <a
          href={`https://linkedin.com/in/${LINKEDIN_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-2 bg-gray-800/80 hover:bg-gray-700/80 
                     border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200
                     hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5"
        >
          <svg
            className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          <span className="text-sm font-medium text-gray-300 group-hover:text-white">
            LinkedIn
          </span>
        </a>

        {/* Twitter/X Button */}
        <a
          href={`https://twitter.com/${TWITTER_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-2 bg-gray-800/80 hover:bg-gray-700/80 
                     border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200
                     hover:shadow-lg hover:shadow-gray-500/10 hover:-translate-y-0.5"
        >
          <svg
            className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="text-sm font-medium text-gray-300 group-hover:text-white">
            Twitter
          </span>
        </a>
      </div>

      {/* GitHub Badges Row */}
      <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
        {/* GitHub Stars Badge */}
        <a
          href={`https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}/stargazers`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`https://img.shields.io/github/stars/${GITHUB_USERNAME}/${GITHUB_REPO}?style=for-the-badge&logo=github&logoColor=white&labelColor=1f2937&color=fbbf24`}
            alt="GitHub Stars"
            className="h-7 hover:scale-105 transition-transform"
          />
        </a>

        {/* GitHub Forks Badge */}
        <a
          href={`https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}/network/members`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`https://img.shields.io/github/forks/${GITHUB_USERNAME}/${GITHUB_REPO}?style=for-the-badge&logo=github&logoColor=white&labelColor=1f2937&color=3b82f6`}
            alt="GitHub Forks"
            className="h-7 hover:scale-105 transition-transform"
          />
        </a>

        {/* GitHub Issues Badge */}
        <a
          href={`https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}/issues`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`https://img.shields.io/github/issues/${GITHUB_USERNAME}/${GITHUB_REPO}?style=for-the-badge&logo=github&logoColor=white&labelColor=1f2937&color=10b981`}
            alt="GitHub Issues"
            className="h-7 hover:scale-105 transition-transform"
          />
        </a>

        {/* License Badge */}
        <a
          href={`https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}/blob/main/LICENSE`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`https://img.shields.io/github/license/${GITHUB_USERNAME}/${GITHUB_REPO}?style=for-the-badge&labelColor=1f2937&color=8b5cf6`}
            alt="License"
            className="h-7 hover:scale-105 transition-transform"
          />
        </a>
      </div>

      {/* Tech Stack Badges */}
      <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
        <img
          src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=white&labelColor=1f2937"
          alt="React"
          className="h-5"
        />
        <img
          src="https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite&logoColor=white&labelColor=1f2937"
          alt="Vite"
          className="h-5"
        />
        <img
          src="https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white&labelColor=1f2937"
          alt="Tailwind CSS"
          className="h-5"
        />
        <img
          src="https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=flat-square&logo=javascript&logoColor=black&labelColor=1f2937"
          alt="JavaScript"
          className="h-5"
        />
      </div>

      {/* Credit Line */}
      <div className="text-center text-gray-500 text-sm">
        <p className="flex items-center justify-center gap-2 mb-1">
          Built with <span className="text-red-500 animate-pulse">❤</span> by
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 font-medium hover:underline"
          >
            @{GITHUB_USERNAME}
          </a>
        </p>
        <p className="text-gray-600">
          CPU Scheduling Visualizer — FCFS · SJF · SRTF · Round Robin · Priority
        </p>
      </div>

      {/* Contribution CTA */}
      <div className="mt-6 text-center">
        <a
          href={`https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-emerald-600 to-teal-600
                     hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl
                     shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all
                     duration-200 hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          Contribute on GitHub
        </a>
      </div>
    </footer>
  );
}