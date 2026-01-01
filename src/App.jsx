import React, { useState, useEffect } from 'react';
import { 
  IceCream, 
  Coffee, 
  MapPin, 
  Clock, 
  Phone, 
  Instagram, 
  Facebook, 
  ChevronRight, 
  Menu as MenuIcon, 
  X,
  Star,
  Heart,
  Utensils,
  ShoppingBag,
  ExternalLink,
  Info
} from 'lucide-react';

// --- Brand Theme ---
const THEME = {
  yellow: '#FFCE00',
  blue: '#0091D5',
  orange: '#F37021',
  dark: '#1A1A1A',
  light: '#F8F9FA'
};

// Official Logo and Sample Product Image
const LOGO_URL = "https://static.wixstatic.com/media/13f7b9_18e2677f479548528695e320b7e4ba15~mv2.jpg/v1/fill/w_542,h_182,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/BingsooLogo2.jpg";
const SAMPLE_IMAGE = "https://static.wixstatic.com/media/13f7b9_42bfe334d99b4f7db0378daa67e6358d~mv2.jpg/v1/fill/w_1638,h_2142,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/13f7b9_42bfe334d99b4f7db0378daa67e6358d~mv2.jpg";

const MENU_DATA = {
  Bingsoo: [
    { name: "Original Red Bean", image: SAMPLE_IMAGE, desc: "Traditional milk snow topped with sweet red bean, rice cakes, and almond flakes.", price: "$14.99", tags: ["Traditional"] },
    { name: "Mango Madness", image: SAMPLE_IMAGE, desc: "Fresh mango cubes, mango puree, and condensed milk over our signature oat-milk snow.", price: "$15.99", tags: ["Popular"] },
    { name: "Matcha Garden", image: SAMPLE_IMAGE, desc: "Premium matcha powder, red bean, and matcha ice cream scoop.", price: "$14.99", tags: ["Classic"] },
    { name: "Oreo Overload", image: SAMPLE_IMAGE, desc: "Crushed Oreos, chocolate sauce, and vanilla gelato.", price: "$14.99", tags: ["Kid's Favorite"] },
    { name: "Strawberry Swirl", image: SAMPLE_IMAGE, desc: "Fresh local strawberries, strawberry mochi, and signature cream.", price: "$15.99", tags: ["Seasonal"] },
  ],
  "Bubble Tea": [
    { name: "Classic Brown Sugar", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800", desc: "Rich tiger-stripe brown sugar syrup with chewy pearls.", price: "$6.50", tags: ["Bestseller"] },
    { name: "Honeydew Milk Tea", image: "https://images.unsplash.com/photo-1596306499317-8490232098fa?auto=format&fit=crop&q=80&w=800", desc: "Sweet, refreshing honeydew with your choice of milk.", price: "$6.25", tags: ["Refreshing"] },
    { name: "Taro Milk Tea", image: "https://images.unsplash.com/photo-1558857563-b371f31ca704?auto=format&fit=crop&q=80&w=800", desc: "Creamy taro root blend with a beautiful purple hue.", price: "$6.50", tags: ["Creamy"] },
    { name: "Passionfruit Green Tea", image: "https://images.unsplash.com/photo-1594235340110-3870814f3408?auto=format&fit=crop&q=80&w=800", desc: "Zesty and bright fruit tea with popping boba.", price: "$5.75", tags: ["Zesty"] },
  ],
  Taiyaki: [
    { name: "Sweet Red Bean", image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&q=80&w=800", desc: "Classic fish-shaped waffle with warm, sweet bean filling.", price: "$3.50", tags: ["Warm"] },
    { name: "Nutella & Banana", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800", desc: "Decadent hazelnut spread with fresh banana slices.", price: "$4.50", tags: ["Sweet"] },
    { name: "Custard Cream", image: "https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?auto=format&fit=crop&q=80&w=800", desc: "Silky, smooth vanilla custard filling.", price: "$3.50", tags: ["Silky"] },
  ],
  Savory: [
    { name: "Classic Kimbap", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800", desc: "Korean rice rolls with pickled radish, carrots, and egg.", price: "$9.00", tags: ["Hearty"] },
    { name: "Pork Mandu", image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=800", desc: "Crispy fried dumplings served with a soy dipping sauce.", price: "$8.50", tags: ["Crispy"] },
    { name: "Japchae", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800", desc: "Glass noodles stir-fried with vegetables and savory sauce.", price: "$12.00", tags: ["Traditional"] },
  ]
};

// --- Brand Logo Component ---
const Logo = ({ size = "md", showText = false, layout = "horizontal" }) => {
  const heightClass = size === "sm" ? "h-10" : size === "lg" ? "h-32" : "h-16";
  const containerClass = layout === "vertical" ? "flex flex-col items-center text-center" : "flex items-center gap-3";
  
  return (
    <div className={containerClass}>
      <img 
        src={LOGO_URL} 
        alt="Mr. Bingsoo Logo" 
        className={`${heightClass} w-auto object-contain transition-transform duration-500 hover:scale-105`}
        onError={(e) => { e.target.src = "https://via.placeholder.com/300x100?text=Mr.+Bingsoo"; }}
      />
    </div>
  );
};

const Navbar = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = ['Home', 'Menu', 'About', 'Contact'];

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b-4 shadow-sm" style={{ borderColor: THEME.yellow }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="cursor-pointer" onClick={() => setActiveSection('Home')}>
            <Logo size="sm" />
          </div>
          
          <div className="hidden md:flex space-x-10">
            {links.map(link => (
              <button
                key={link}
                onClick={() => setActiveSection(link)}
                className={`text-sm font-black uppercase tracking-widest transition-all relative group`}
              >
                <span style={{ color: activeSection === link ? THEME.blue : undefined }} className={activeSection !== link ? "text-slate-500 hover:text-blue-500" : ""}>{link}</span>
                <span 
                  className={`absolute -bottom-2 left-0 w-full h-1 transition-transform origin-left ${activeSection === link ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                  style={{ backgroundColor: THEME.orange }}
                ></span>
              </button>
            ))}
          </div>

          <button className="px-8 py-3 hidden md:block rounded-2xl font-black uppercase tracking-widest text-white transition-all hover:shadow-lg active:scale-95 shadow-blue-100" style={{ backgroundColor: THEME.blue }}>
            Order Pickup
          </button>

          <button className="md:hidden p-2 text-slate-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <MenuIcon size={32} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white p-8 space-y-6 shadow-2xl border-t-2 border-slate-50 animate-in slide-in-from-top duration-300">
          {links.map(link => (
            <button
              key={link}
              onClick={() => { setActiveSection(link); setIsMenuOpen(false); }}
              className="block w-full text-left text-2xl font-black uppercase tracking-tighter text-slate-900"
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onExplore }) => (
  <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full opacity-10 animate-pulse blur-3xl" style={{ backgroundColor: THEME.yellow }}></div>
    <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full opacity-10 animate-pulse blur-3xl" style={{ backgroundColor: THEME.blue }}></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full text-sm font-black uppercase tracking-widest bg-slate-50 border border-slate-100 shadow-sm">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: THEME.orange }}></span>
            <span style={{ color: THEME.dark }}>Fells Point, Baltimore</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.85] tracking-tight">
            SNOWY <br />
            <span style={{ color: THEME.blue }}>GOODNESS.</span> <br />
            <span className="relative">
              EVERY BITE.
              <span className="absolute -bottom-4 left-0 w-3/4 h-6 opacity-40 -z-10 skew-x-12" style={{ backgroundColor: THEME.yellow }}></span>
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
            Discover the magic of Korean shaved ice. Made with our signature 100% oat-milk base for a light, dairy-free treat.
          </p>
          <div className="flex flex-wrap gap-5">
            <button 
              onClick={onExplore}
              className="px-12 py-6 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
              style={{ backgroundColor: THEME.blue }}
            >
              Explore Menu <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative group">
          <div className="aspect-[3/4] max-w-md mx-auto relative flex items-center justify-center p-4">
            <div className="absolute inset-0 rounded-[3rem] border-8 rotate-3" style={{ borderColor: THEME.yellow }}></div>
            <img 
              src={SAMPLE_IMAGE} 
              alt="Bingsoo Special" 
              className="relative z-10 w-full h-full object-cover rounded-[2.5rem] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute -bottom-6 -right-6 z-20 bg-white p-6 rounded-[2rem] shadow-2xl border-t-8" style={{ borderTopColor: THEME.orange }}>
               <p className="font-black text-center text-xs leading-tight" style={{ color: THEME.dark }}>FEATURED:<br/>MANGO SNOW</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const MenuCard = ({ item }) => (
  <div className="group bg-white rounded-[2.5rem] border-2 border-slate-100 overflow-hidden hover:border-blue-400 transition-all duration-500 hover:shadow-2xl">
    <div className="relative h-72 overflow-hidden bg-slate-100">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-2xl font-black shadow-lg" style={{ color: THEME.blue }}>
        {item.price}
      </div>
    </div>
    <div className="p-8">
      <div className="flex flex-wrap gap-2 mb-4">
        {item.tags?.map(tag => (
          <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white" style={{ backgroundColor: THEME.orange }}>
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tighter leading-none mb-3">
        {item.name}
      </h3>
      <p className="text-slate-500 font-medium leading-relaxed text-sm">
        {item.desc}
      </p>
    </div>
  </div>
);

const MenuSection = () => {
  const [activeTab, setActiveTab] = useState('Bingsoo');
  const categories = Object.keys(MENU_DATA);

  return (
    <section id="menu" className="py-32 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-10">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-5xl font-black text-slate-900 tracking-tight">Our Collection</h2>
            <p className="text-slate-500 font-medium">Click a category below to browse our favorites.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest transition-all shadow-sm ${
                  activeTab === cat 
                  ? 'text-white shadow-xl scale-105 translate-y-[-4px]' 
                  : 'bg-white text-slate-400 hover:bg-slate-50'
                }`}
                style={{ backgroundColor: activeTab === cat ? THEME.blue : undefined }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MENU_DATA[activeTab].map((item, idx) => (
            <MenuCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section id="about" className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="rounded-[4rem] overflow-hidden shadow-2xl border-8 rotate-3" style={{ borderColor: THEME.yellow }}>
             <img src="https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?auto=format&fit=crop&q=80&w=800" alt="Cafe Interior" className="w-full h-[500px] object-cover" />
          </div>
        </div>
        
        <div className="space-y-8">
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">Authentic Korean <br/><span style={{ color: THEME.blue }}>Dessert Culture.</span></h2>
          <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
            <p>Bmore Mr. Bingsoo is a locally-owned family business bringing Seoul’s finest treats to Fells Point. We specialize in Bingsoo, a milk-based shaved ice that melts like fresh snow.</p>
            <p>Our 100% oat-milk snow base is healthier, naturally dairy-free, and incredibly creamy.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="py-32 bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-[4rem] overflow-hidden grid lg:grid-cols-2 shadow-2xl">
        <div className="p-12 lg:p-20 space-y-12">
          <div className="space-y-4">
            <h2 className="text-5xl font-black tracking-tighter text-slate-900">Visit Us</h2>
            <p className="text-slate-500 text-lg font-medium">Located on S Broadway in Fells Point.</p>
          </div>
          
          <div className="space-y-10">
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg" style={{ backgroundColor: THEME.yellow }}>
                <MapPin size={28} className="text-slate-900" />
              </div>
              <div className="space-y-1">
                <p className="font-black text-xl text-slate-900">522 S Broadway, Baltimore, MD</p>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg text-white" style={{ backgroundColor: THEME.blue }}>
                <Clock size={28} />
              </div>
              <div className="space-y-1">
                <p className="font-black text-xl text-slate-900">Daily: 12:00 PM – 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-100 flex items-center justify-center p-12">
           <Logo size="lg" layout="vertical" />
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 bg-white text-center border-t border-slate-50">
    <div className="max-w-7xl mx-auto px-4 space-y-12">
      <Logo size="md" layout="vertical" />
      <div className="flex flex-wrap justify-center gap-10 text-xs font-black uppercase tracking-widest text-slate-400">
        {['Home', 'Menu', 'About', 'Contact'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-500 transition-colors">{item}</a>
        ))}
      </div>
      <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.3em]">© {new Date().getFullYear()} Mr. Bingsoo. Handcrafted in Baltimore <Heart size={12} fill="#F37021" className="inline ml-1" stroke="none" /></p>
    </div>
  </footer>
);

function App() {
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    if (activeSection !== 'Home') {
      const el = document.getElementById(activeSection.toLowerCase());
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-yellow-100 overflow-x-hidden">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main>
        {activeSection === 'Home' && (
          <>
            <Hero onExplore={() => setActiveSection('Menu')} />
            <section className="bg-white pb-32">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-10 bg-white p-12 rounded-[3.5rem] border-4 shadow-xl" style={{ borderColor: THEME.yellow }}>
                  <div className="text-center md:text-left">
                    <h4 className="font-black text-xl leading-none">Oat-Milk Base</h4>
                    <p className="text-slate-500 text-sm font-medium mt-1">Naturally vegan and creamy snow.</p>
                  </div>
                  <div className="text-center md:text-left border-y md:border-y-0 md:border-x border-slate-100 py-8 md:py-0 md:px-10">
                    <h4 className="font-black text-xl leading-none">Authentic Snacks</h4>
                    <p className="text-slate-500 text-sm font-medium mt-1">Handmade Taiyaki and Kimbap.</p>
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="font-black text-xl leading-none">Family Heart</h4>
                    <p className="text-slate-500 text-sm font-medium mt-1">Baltimore owned and operated.</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
        
        <MenuSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
