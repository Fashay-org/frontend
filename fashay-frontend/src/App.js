import './styles/index.scss';
function App() {
  return (
    <div className="App">
      <div className="mood-board-container">
        <img src="/static/images/mood1.jpg" alt="Futuristic Fashion" className="mood-board active" />
        <img src="/static/images/mood2.jpg" alt="Punk Fashion" className="mood-board" />
        <img src="/static/images/mood3.jpg" alt="Glamour Fashion" className="mood-board" />
        <img src="/static/images/mood4.jpg" alt="Retro Fashion" className="mood-board" />
      </div>
    
    {/*<!-- Semi-transparent overlay */}
    <div class="overlay"></div>

    {/*<!-- Content Wrapper -->*/}
    <div class="content-wrapper">
        {/*<!-- Navigation -->*/}
        <nav class="fixed w-full top-0 z-50 nav-wrapper">
            <div class="w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
               {/* <!-- Logo - Moved more to the left -->*/}
                <a href="/" class="fashay text-black pl-2">fashay</a>
                
                {/*<!-- Main Navigation - Adjusted spacing -->*/}
                <div class="hidden sm:flex items-center">
                    {/*<!-- Navigation Links - More compact spacing -->*/}
                    <div class="flex items-center gap-6 mr-8">
                        
                        <a href="#features" class="text-sm font-medium text-gray-800 hover:text-black transition-colors">Features</a>
                        <a href="#about" class="text-sm font-medium text-gray-800 hover:text-black transition-colors">Demo</a>
                        <a href="#Stylists" class="text-sm font-medium text-gray-800 hover:text-black transition-colors">Our Stylists</a>
                        <a href="#Team" class="text-sm font-medium text-gray-800 hover:text-black transition-colors">Team</a>
                    </div>
                    
                    {/*<!-- Sign Up Button - Moved more to the right -->*/}
                    <a href="/login" class="inline-flex items-center justify-center text-sm font-medium h-10 bg-black text-white px-6 rounded-full hover:bg-gray-900 transition-all duration-200">
                        Sign Up / Login
                    </a>
                </div>

                {/*<!-- Mobile Menu Button -->*/}
                <button id="mobileMenuBtn" class="sm:hidden p-2" aria-expanded="false" aria-controls="mobileMenu">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
                    </svg>
                </button>
            </div>
        </nav>

        {/*<!-- Mobile Menu -->*/}
        <div id="mobileMenu" class="mobile-menu">
            <div class="p-4 flex flex-col gap-4">
                
                <a href="#features" class="text-gray-800 hover:text-black px-4 py-2">Features</a>
                <a href="#about" class="text-gray-800 hover:text-black px-4 py-2">Demo</a>
                <a href="#Stylists" class="text-gray-800 hover:text-black px-4 py-2">Our Stylists</a>
                <a href="#Team" class="text-gray-800 hover:text-black px-4 py-2">Team</a>
                <a href="/login" class="bg-black text-white px-4 py-2 rounded-full text-center">Login</a>
            </div>
        </div>

        {/*<!-- Main Content -->*/}
        <main>
            {/*<!-- Hero Section -->*/}
            <section class="pt-32 pb-24 relative z-10">
                <div class="w-full px-4 sm:px-6 lg:px-8">
                    <div class="fade-in text-center max-w-5xl mx-auto">
                        {/*<!-- Enhanced Heading with better contrast against mood board -->*/}
                        <h1 class="text-7xl md:text-8xl font-bold leading-tight tracking-tight mb-12 text-black
                                [text-shadow:_0_1px_2px_rgb(255_255_255_/_20%)]">
                            Style Smarter 
                            <span class="block mt-2">with</span> 
                            <span class="block mt-2">AI Stylists</span>
                        </h1>

                        {/*<!-- Enhanced CTA Button -->*/}
                        <div class="group">
                            <a href="/login" 
                            class="relative inline-flex items-center justify-center gap-3 bg-black text-white font-medium py-5 px-10 
                                    rounded-full transition-all duration-300 overflow-hidden
                                    hover:bg-gray-900 hover:scale-105 hover:shadow-2xl backdrop-blur-sm">
                                <span class="relative z-10 text-lg">Try Fashay Free</span>
                                <span class="relative z-10 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                                
                               {/* <!-- Button shine effect -->*/}
                                <div class="absolute top-0 -left-[100%] w-[300%] h-full bg-[linear-gradient(115deg,transparent,rgba(255,255,255,.3),transparent)] group-hover:left-[100%] transition-all duration-700"></div>
                            </a>
                        </div>

                        {/*<!-- Enhanced Feature Tags -->*/}
                        <div class="mt-20 flex flex-wrap justify-center gap-4">
                            <div class="transform transition-transform hover:scale-105">
                                <span class="inline-block bg-black/80 backdrop-blur px-8 py-4 rounded-full text-sm font-bold text-white
                                        shadow-lg border border-white/10 hover:shadow-2xl hover:bg-black/90 transition-all duration-300">
                                    <span class="mr-2">⚡</span>
                                    AI-Powered Styling
                                </span>
                            </div>

                            <div class="transform transition-transform hover:scale-105">
                                <span class="inline-block bg-black/80 backdrop-blur px-8 py-4 rounded-full text-sm font-bold text-white
                                        shadow-lg border border-white/10 hover:shadow-2xl hover:bg-black/90 transition-all duration-300">
                                    <span class="mr-2">👔</span>
                                    Professional Insights
                                </span>
                            </div>

                            <div class="transform transition-transform hover:scale-105">
                                <span class="inline-block bg-black/80 backdrop-blur px-8 py-4 rounded-full text-sm font-bold text-white
                                        shadow-lg border border-white/10 hover:shadow-2xl hover:bg-black/90 transition-all duration-300">
                                    <span class="mr-2">✨</span>
                                    Personalized Recommendations
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*<!-- Features Section -->*/}
            <section id="features" class="relative overflow-hidden py-32">
                {/*<!-- Background elements remain unchanged -->*/}
                <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
                
                <div class="absolute inset-0 opacity-[0.02]" 
    style={{ backgroundImage: 'radial-gradient(rgb(138,206,0) 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px' }}>
</div>


<div class="absolute inset-0 mix-blend-overlay opacity-[0.03]" 
    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px' }}>
</div>

                <div class="relative w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    {/*<!-- Section Header -->*/}
                    <div class="text-center mb-24 relative">
                        <h2 class="text-6xl font-bold mb-8 text-white bg-clip-text relative z-10 tracking-tight">
                            Why Choose Fashay?
                        </h2>
                        <p class="text-gray-400 text-xl max-w-2xl mx-auto font-light leading-relaxed">
                            Experience the future of fashion with our cutting-edge AI technology and expert styling guidance
                        </p>
                    </div>

                    {/*<!-- Features Grid -->*/}
                    <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/*<!-- AI Stylists Card -->*/}
                        <div class="group relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/10 
                                    hover:border-[rgb(138,206,0)]/20 transition-all duration-500 backdrop-blur-sm">
                            <div class="p-8 flex flex-col gap-8">
                                {/*<!-- Icon -->*/}
                                <div class="w-16 h-16 rounded-2xl bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                    <svg class="w-8 h-8 text-[rgb(138,206,0)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                                            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/>
                                    </svg>
                                </div>
                                
                                {/*<!-- Content -->*/}
                                <div>
                                    <h3 class="text-2xl font-semibold mb-4 text-white tracking-tight">AI Stylists</h3>
                                    <p class="text-gray-300 leading-relaxed text-lg font-light">
                                        Personalized Guidance from AI Clones of Professional Stylists
                                    </p>
                                </div>
                                
                                {/*<!-- GIF Container with hover zoom effect -->*/}
                                <div class="relative w-full aspect-[16/9] mt-4 rounded-xl overflow-hidden border border-white/10 group">
                                    <img src="/static/images/ai_stylists.gif" 
                                        alt="AI Stylist Demo" 
                                        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"></img>
                                </div>
                            </div>
                        </div>

                        {/*<!-- Smart Wardrobe Card -->*/}
                        <div class="group relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/10 
                                    hover:border-[rgb(138,206,0)]/20 transition-all duration-500 backdrop-blur-sm">
                            <div class="p-8 flex flex-col gap-8">
                                {/*<!-- Icon -->*/}
                                <div class="w-16 h-16 rounded-2xl bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                    <svg class="w-8 h-8 text-[rgb(138,206,0)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                    </svg>
                                </div>
                                
                                {/*<!-- Content -->*/}
                                <div>
                                    <h3 class="text-2xl font-semibold mb-4 text-white tracking-tight">Smart Wardrobe</h3>
                                    <p class="text-gray-300 leading-relaxed text-lg font-light">
                                        Upload your existing clothes and get intelligent outfit combinations and styling suggestions
                                    </p>
                                </div>
                                
                                {/*<!-- GIF Container with hover zoom effect -->*/}
                                <div class="relative w-full aspect-[16/9] mt-4 rounded-xl overflow-hidden border border-white/10 group">
                                    <img src="/static/images/recommendations.gif" 
                                        alt="Smart Wardrobe Demo" 
                                        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*<!-- About Section -->*/}
            <section id="about" class="relative min-h-screen py-32 overflow-hidden">
               {/* <!-- White translucent background -->*/}
               <div class="absolute inset-0" style={{ 
        backgroundImage: 'radial-gradient(rgb(138,206,0) 0.5px, transparent 0.5px)',
        backgroundSize: '24px 24px',
        opacity: '0.01'
    }}></div>

                {/*<!-- Subtle dot pattern -->*/}
                <div class="absolute inset-0" style={{ 
        backgroundImage: 'radial-gradient(rgb(138,206,0) 0.5px, transparent 0.5px)',
        backgroundSize: '24px 24px',
        opacity: '0.01'
    }}></div>


                <div class="relative w-full px-4 sm:px-6 lg:px-8">
                    <div class="max-w-7xl mx-auto flex flex-col items-center text-center">
                        {/*<!-- Heading -->*/}
                        <h2 class="text-5xl md:text-5xl font-bold mb-8 leading-tight tracking-tight max-w-3xl">
                            <span class="relative inline-block">
                                <span class="bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-800 to-gray-600">
                                    Democratizing Fashion with AI
                                </span>
                                <div class="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[rgb(138,206,0)]/50 to-transparent"></div>
                            </span>
                        </h2>

                        {/*<!-- Description -->*/}
                        <p class="text-xl text-gray-600 leading-relaxed mb-16 max-w-2xl mx-auto font-light">
                            Fashay combines artificial intelligence with insights from top stylists to make professional fashion guidance accessible to everyone. We believe great style shouldn't be exclusive.
                        </p>
                        
                        {/*<!-- Centered Video Container -->*/}
                        <div class="relative group max-w-3xl w-full mx-auto">
                            {/*<!-- Video Wrapper -->*/}
                            <div class="relative rounded-[2rem] overflow-hidden shadow-lg transform-gpu 
                                        transition-all duration-500 ease-out group-hover:scale-[1.02]
                                        group-hover:shadow-[0_20px_80px_-10px_rgba(138,206,0,0.15)]">
                                {/*<!-- Frame Border -->*/}
                                <div class="absolute inset-0 border border-black/5 rounded-[2rem] z-10 pointer-events-none
                                        group-hover:border-[rgb(138,206,0)]/10 transition-colors duration-500"></div>
                                
                                {/*<!-- Video Container -->*/}
                                <div class="relative group max-w-3xl w-full mx-auto">
                                    {/*<!-- Video Wrapper -->*/}
                                    <div class="relative rounded-[2rem] overflow-hidden shadow-lg transform-gpu 
                                                transition-all duration-500 ease-out group-hover:scale-[1.02]
                                                group-hover:shadow-[0_20px_80px_-10px_rgba(138,206,0,0.15)]">
                                        {/*<!-- Frame Border -->*/}
                                        <div class="absolute inset-0 border border-black/5 rounded-[2rem] z-10 pointer-events-none
                                                group-hover:border-[rgb(138,206,0)]/10 transition-colors duration-500"></div>
                                        
                                        {/*<!-- Video Container -->*/}
                                        <div class="relative w-full aspect-video bg-black">
    <iframe 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'auto' }}
        src="https://www.youtube.com/embed/780m2UvgGSE?autoplay=0&rel=0&modestbranding=1&vq=hd1080&hd=1"
        title="Fashay Introduction"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        loading="lazy">
    </iframe>
                                            
                                            {/*<!-- Subtle Hover Overlay -->*/}
                                            <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent 
                                                        opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/*<!-- Meet Our Stylists -->*/}
            <section id="Stylists" class="relative min-h-screen py-24 overflow-hidden">
                {/*<!-- Modern Background -->*/}
                <div class="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(rgb(138,206,0) 0.5px, transparent 0.5px)',
        backgroundSize: '24px 24px', 
        opacity: '0.01'
    }}></div>


                <div class="relative w-full px-4 sm:px-6 lg:px-8">
                    {/*<!-- Section Header -->*/}
                    <div class="text-center mb-16">
                        <h2 class="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-700">
                            Our Fashion Experts
                        </h2>
                    </div>

                    {/*<!-- Experts Grid -->*/}
                    <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {/*<!-- Reginald -->*/}
                        <div class="group">
                            <div class="relative bg-gradient-to-br from-black/95 to-black/90 rounded-2xl p-6 
                                    transform transition-all duration-500 hover:translate-y-[-8px]">
                                {/*<!-- Card Glow Effect -->*/}
                                <div class="absolute -inset-[1px] bg-gradient-to-r from-[rgb(138,206,0)]/30 to-transparent 
                                        rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                                
                               {/* <!-- Card Content -->*/}
                                <div class="relative z-10">
                                    {/*<!-- Image Container -->*/}
                                    <div class="relative aspect-[4/5] overflow-hidden rounded-xl mb-6">
                                        <img src="/static/images/reginald.png" 
                                            alt="Reginald Ferguson" 
                                            class="w-full h-full object-cover transform transition-transform duration-700
                                                    group-hover:scale-110"
                                            loading="lazy"></img>
                                        {/*<!-- Image Overlay -->*/}
                                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 
                                                group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>

                                    {/*<!-- Text Content -->*/}
                                    <div class="space-y-3">
                                        <h3 class="text-xl font-semibold text-white mb-2">Reginald Ferguson</h3>
                                        <p class="text-white/70 font-light text-sm">Fashion Geek & Style Consultant</p>
                                        
                                        {/*<!-- Link -->*/}
                                        <div class="pt-4">
                                        <a href="https://www.nyfashiongeek.com/" 
   target="_blank" 
   rel="noopener noreferrer"
   class="inline-flex items-center gap-2 text-[rgb(138,206,0)] hover:text-white 
        transition-all duration-300 group-hover:translate-x-2 text-sm">

                                                <span>Visit Website</span>
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                                                        d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*<!-- Eliza -->*/}
                        <div class="group">
                            <div class="relative bg-gradient-to-br from-black/95 to-black/90 rounded-2xl p-6 
                                    transform transition-all duration-500 hover:translate-y-[-8px]">
                                <div class="absolute -inset-[1px] bg-gradient-to-r from-[rgb(138,206,0)]/30 to-transparent 
                                        rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                                
                                <div class="relative z-10">
                                    <div class="relative aspect-[4/5] overflow-hidden rounded-xl mb-6">
                                        <img src="/static/images/eliza.png" 
                                            alt="Eliza Parilla" 
                                            class="w-full h-full object-cover transform transition-transform duration-700
                                                    group-hover:scale-110"
                                            loading="lazy"></img>
                                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 
                                                group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>

                                    <div class="space-y-3">
                                        <h3 class="text-xl font-semibold text-white mb-2">Eliza Parilla</h3>
                                        <p class="text-white/70 font-light text-sm">Wardrobe Specialist & Image Consultant</p>
                                        
                                        <div class="pt-4">
                                        <a href="https://wardrobeboss.com/about" 
   target="_blank"
   rel="noopener noreferrer" 
   class="inline-flex items-center gap-2 text-[rgb(138,206,0)] hover:text-white 
        transition-all duration-300 group-hover:translate-x-2 text-sm">

                                                <span>Visit Website</span>
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                                                        d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*<!-- Lilia -->*/}
                        <div class="group">
                            <div class="relative bg-gradient-to-br from-black/95 to-black/90 rounded-2xl p-6 
                                    transform transition-all duration-500 hover:translate-y-[-8px]">
                                <div class="absolute -inset-[1px] bg-gradient-to-r from-[rgb(138,206,0)]/30 to-transparent 
                                        rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                                
                                <div class="relative z-10">
                                    <div class="relative aspect-[4/5] overflow-hidden rounded-xl mb-6">
                                        <img src="/static/images/lilia.png" 
                                            alt="Lilia Dolinsky" 
                                            class="w-full h-full object-cover transform transition-transform duration-700
                                                    group-hover:scale-110"
                                            loading="lazy"></img>
                                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 
                                                group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>

                                    <div class="space-y-3">
                                        <h3 class="text-xl font-semibold text-white mb-2">Lilia Dolinsky</h3>
                                        <p class="text-white/70 font-light text-sm">Fashion Stylist & Trend Expert</p>
                                        
                                        <div class="pt-4">
                                        <a href="https://wardrobeboss.com/about" 
   target="_blank"
   rel="noopener noreferrer" 
   class="inline-flex items-center gap-2 text-[rgb(138,206,0)] hover:text-white 
        transition-all duration-300 group-hover:translate-x-2 text-sm">

                                                <span>Visit Instagram</span>
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                                                        d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*<!-- Meet the Team -->*/}
            <section id="Team" class="relative min-h-screen py-24 overflow-hidden">
                {/*<!-- Modern Background -->*/}
                <div class="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
                <div class="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(rgb(138,206,0) 0.5px, transparent 0.5px)',
        backgroundSize: '24px 24px',
        opacity: '0.01'
    }}></div>

                <div class="relative w-full px-4 sm:px-6 lg:px-8">
                    {/*<!-- Section Header -->*/}
                    <div class="text-center mb-16">
                        <h2 class="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-700">
                            Meet the Team
                        </h2>
                    </div>

                    {/*<!-- Team Grid -->*/}
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                       {/* <!-- Subhrajit -->*/}
                        <div class="group">
                            <div class="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer">
                                {/*<!-- Card Glow Effect -->*/}
                                <div class="absolute -inset-[1px] bg-gradient-to-r from-[rgb(138,206,0)]/30 to-transparent 
                                        opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm z-10"></div>
                                
                               {/* <!-- Image Container -->*/}
                                <div class="absolute inset-0 transform group-hover:scale-105 transition-all duration-700">
                                    <img src="/static/images/subhrajit.jpg" 
                                        alt="Subhrajit Dey" 
                                        class="w-full h-full object-cover"
                                        loading="lazy"></img>
                                </div>
                                {/*<!-- Always Visible Content -->*/}
                                <div class="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-10">
                                    <div class="text-center">
                                        <h3 class="text-xl font-semibold text-white">Subhrajit Dey</h3>
                                        <p class="text-gray-200 text-sm">Chief Executive Officer</p>
                                    </div>
                                </div>

                               {/*} <!-- Hover Content -->*/}
                                <div class="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                    <div class="absolute inset-0 flex flex-col items-center justify-center p-6 gap-6">
                                        {/*<!-- Description -->*/}
                                        <div class="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                            <p class="text-gray-200 text-sm leading-relaxed text-center max-w-xs mb-4">
                                                MSCS student at NYU specializing in AI, Computer Vision, and LLMs with 230+ Google Scholar citations and 4 years of AI research experience.
                                            </p>
                                        </div>
                                        
                                       {/* <!-- Social Links -->*/}
                                        <div class="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                            <a href="mailto:sd5963@nyu.edu" 
                                            class="w-10 h-10 flex items-center justify-center rounded-full 
                                                    bg-white/10 hover:bg-[rgb(138,206,0)]/20 backdrop-blur-sm
                                                    transition-all duration-300 hover:scale-110 z-30"
                                            target="_blank" rel="noopener noreferrer">
                                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                                </svg>
                                            </a>
                                            <a href="https://www.linkedin.com/in/subhrajitdey1206/" 
                                            class="w-10 h-10 flex items-center justify-center rounded-full 
                                                    bg-white/10 hover:bg-[rgb(138,206,0)]/20 backdrop-blur-sm
                                                    transition-all duration-300 hover:scale-110 z-30"
                                            target="_blank" rel="noopener noreferrer">
                                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                      {/*  <!-- Ji Seong Han -->*/}
                        <div class="group">
                            <div class="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer">
                              {/*  <!-- Card Glow Effect -->*/}
                                <div class="absolute -inset-[1px] bg-gradient-to-r from-[rgb(138,206,0)]/30 to-transparent 
                                        opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm z-10"></div>
                                
                              {/*  <!-- Image Container -->*/}
                                <div class="absolute inset-0 transform group-hover:scale-105 transition-all duration-700">
                                    <img src="/static/images/ji.jpg" 
                                        alt="Ji Seong Han" 
                                        class="w-full h-full object-cover"
                                        loading="lazy"></img>
                                </div>

                            {/*    <!-- Always Visible Content -->*/}
                                <div class="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-10">
                                    <div class="text-center">
                                        <h3 class="text-xl font-semibold text-white">Ji Seong Han</h3>
                                        <p class="text-gray-200 text-sm">Chief Operational Officer</p>
                                    </div>
                                </div>

                             {/*   <!-- Hover Content -->*/}
                                <div class="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                    <div class="absolute inset-0 flex flex-col items-center justify-center p-6 gap-6">
                                     {/*   <!-- Description -->*/}
                                        <div class="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                            <p class="text-gray-200 text-sm leading-relaxed text-center max-w-xs mb-4">
                                                Digital designer and product manager with 10+ years of experience in hospitality, startups, and government projects.
                                            </p>
                                        </div>
                                        
                                    {/*    <!-- Social Links -->*/}
                                        <div class="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                            <a href="mailto:hello.uxdot@gmail.com" 
                                            class="w-10 h-10 flex items-center justify-center rounded-full 
                                                    bg-white/10 hover:bg-[rgb(138,206,0)]/20 backdrop-blur-sm
                                                    transition-all duration-300 hover:scale-110 z-30"
                                            target="_blank" rel="noopener noreferrer">
                                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                                </svg>
                                            </a>
                                            <a href="https://www.linkedin.com/in/greenji/" 
                                            class="w-10 h-10 flex items-center justify-center rounded-full 
                                                    bg-white/10 hover:bg-[rgb(138,206,0)]/20 backdrop-blur-sm
                                                    transition-all duration-300 hover:scale-110 z-30"
                                            target="_blank" rel="noopener noreferrer">
                                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    {/*    <!-- Dhairya -->*/}
                        <div class="group">
                            <div class="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer">
                            {/*    <!-- Card Glow Effect -->*/}
                                <div class="absolute -inset-[1px] bg-gradient-to-r from-[rgb(138,206,0)]/30 to-transparent 
                                        opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm z-10"></div>
                                
                            {/*    <!-- Image Container -->*/}
                                <div class="absolute inset-0 transform group-hover:scale-105 transition-all duration-700">
                                    <img src="/static/images/dhairya.jpg" 
                                        alt="Dhairyasheel Patil" 
                                        class="w-full h-full object-cover"
                                        loading="lazy"></img>
                                </div>

                              {/*  <!-- Always Visible Content -->*/}
                                <div class="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-10">
                                    <div class="text-center">
                                        <h3 class="text-xl font-semibold text-white">Dhairyasheel Patil</h3>
                                        <p class="text-gray-200 text-sm">Chief Technology Officer</p>
                                    </div>
                                </div>

                              {/*  <!-- Hover Content -->*/}
                                <div class="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                    <div class="absolute inset-0 flex flex-col items-center justify-center p-6 gap-6">
                                      {/*  <!-- Description -->*/}
                                        <div class="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                            <p class="text-gray-200 text-sm leading-relaxed text-center max-w-xs mb-4">
                                                MSCS student at NYU with expertise in Generative AI, ML, DL, and multimodal LLM agents.
                                            </p>
                                        </div>
                                        
                                      {/*  <!-- Social Links -->*/}
                                        <div class="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                            <a href="mailto:dp3979@nyu.edu" 
                                            class="w-10 h-10 flex items-center justify-center rounded-full 
                                                    bg-white/10 hover:bg-[rgb(138,206,0)]/20 backdrop-blur-sm
                                                    transition-all duration-300 hover:scale-110 z-30"
                                            target="_blank" rel="noopener noreferrer">
                                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                                </svg>
                                            </a>
                                            <a href="https://www.linkedin.com/in/dhairyasheel-patil-1013b199/" 
                                            class="w-10 h-10 flex items-center justify-center rounded-full 
                                                    bg-white/10 hover:bg-[rgb(138,206,0)]/20 backdrop-blur-sm
                                                    transition-all duration-300 hover:scale-110 z-30"
                                            target="_blank" rel="noopener noreferrer">
                                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>

    

      
    </div>
  );
}



export default App;
