import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  PiggyBank, 
  HeartHandshake, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2,
  Menu,
  X,
  ArrowRight,
  Calculator,
  Paintbrush,
  Key,
  Wallet,
  Gavel,
  Shield,
  Hammer,
  FileText,
  MessageSquare,
  ChevronDown,
  Plus,
  Minus
} from 'lucide-react';

// --- Constants & Data ---

const COUNTRIES_DATA: Record<string, string[]> = {
  'Perú': ['Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Piura', 'Iquitos', 'Cusco', 'Huancayo', 'Chimbote', 'Pucallpa', 'Tacna', 'Ica'],
  'Colombia': ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta', 'Bucaramanga', 'Pereira', 'Santa Marta', 'Ibagué', 'Pasto', 'Manizales'],
  'Argentina': ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'Tucumán', 'La Plata', 'Mar del Plata', 'Salta', 'Santa Fe', 'San Juan', 'Resistencia', 'Neuquén'],
  'Chile': ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta', 'Temuco', 'Rancagua', 'Iquique', 'Talca', 'Puerto Montt', 'Arica', 'Chillán'],
  'México': ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Toluca', 'Tijuana', 'León', 'Ciudad Juárez', 'Torreón', 'Querétaro', 'San Luis Potosí', 'Mérida'],
  'Panamá': ['Ciudad de Panamá', 'San Miguelito', 'Las Cumbres', 'La Chorrera', 'Tocumen', 'Pacora', 'Arraiján', 'David', 'Vista Alegre', 'Santiago', 'Chitré', 'Chorrera'],
  'Costa Rica': ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Liberia', 'Puntarenas', 'Limón', 'Quesada', 'Paraíso', 'Curridabat', 'San Isidro', 'Desamparados'],
  'Estados Unidos': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville'],
  'Canadá': ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener', 'London', 'Victoria'],
  'Brasil': ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Goiânia', 'Belém', 'Porto Alegre'],
  'Ecuador': ['Guayaquil', 'Quito', 'Cuenca', 'Santo Domingo', 'Machala', 'Durán', 'Manta', 'Portoviejo', 'Loja', 'Ambato', 'Esmeraldas', 'Quevedo'],
  'Bolivia': ['Santa Cruz', 'El Alto', 'La Paz', 'Cochabamba', 'Oruro', 'Sucre', 'Tarija', 'Potosí', 'Sacaba', 'Quillacollo', 'Montero', 'Trinidad'],
  'Uruguay': ['Montevideo', 'Salto', 'Ciudad de la Costa', 'Paysandú', 'Las Piedras', 'Rivera', 'Maldonado', 'Tacuarembó', 'Melo', 'Mercedes', 'Artigas', 'Minas'],
  'Paraguay': ['Asunción', 'Ciudad del Este', 'Luque', 'San Lorenzo', 'Capiatá', 'Lambaré', 'Fernando de la Mora', 'Limpio', 'Ñemby', 'Encarnación', 'Mariano Roque Alonso', 'Itauguá'],
  'Guatemala': ['Ciudad de Guatemala', 'Mixco', 'Villa Nueva', 'Quetzaltenango', 'San Miguel Petapa', 'Escuintla', 'San Juan Sacatepéquez', 'Villa Canales', 'Chinautla', 'Chimaltenango', 'Amatitlán', 'Huehuetenango'],
  'Honduras': ['Tegucigalpa', 'San Pedro Sula', 'Choloma', 'La Ceiba', 'El Progreso', 'Villanueva', 'Choluteca', 'Comayagua', 'Puerto Cortés', 'Danlí', 'Siguatepeque', 'Catacamas'],
  'El Salvador': ['San Salvador', 'Santa Ana', 'San Miguel', 'Soyapango', 'Santa Tecla', 'Apopa', 'Delgado', 'Sonsonate', 'Mejicanos', 'San Marcos', 'Usulután', 'Cojutepeque'],
  'Nicaragua': ['Managua', 'León', 'Masaya', 'Tipitapa', 'Chinandega', 'Matagalpa', 'Estelí', 'Granada', 'Ciudad Sandino', 'Puerto Cabezas', 'El Viejo', 'Jinotega']
};

const COMMON_AREAS_LIST = [
  { id: 'coworking', label: 'Coworking', hasQuantity: true, max: 100 },
  { id: 'gym', label: 'Gym' },
  { id: 'sala-ninos', label: 'Sala de niños' },
  { id: 'piscina', label: 'Piscina' },
  { id: 'zonas-parrillas', label: 'Zonas de parrillas' },
  { id: 'sala-yoga', label: 'Sala de Yoga' },
  { id: 'petzone', label: 'Petzone' },
  { id: 'parques-jardines', label: 'Parques y jardines' },
  { id: 'sala-sum', label: 'Sala SUM' },
  { id: 'sala-cine', label: 'Sala de Cine' },
  { id: 'sala-juegos', label: 'Sala de Juegos' },
  { id: 'sala-sushi-bar', label: 'Sala de Sushi Bar' },
  { id: 'rooftop', label: 'Rooftop' },
  { id: 'ascensores', label: 'Cantidad de Ascensores', hasQuantity: true, max: 100 },
  { id: 'cancha-tenis', label: 'Cancha de Tenis' },
  { id: 'cancha-basket', label: 'Cancha de basket' },
  { id: 'cancha-futbol', label: 'Cancha de Fútbol' }
];

const PERSONNEL_LIST = [
  'Administrador L-S',
  'Administrador Part Time',
  'Supervisor Conserje 8h/día, L-S',
  'Conserje L-D, 12h/Dia-Noche',
  'Conserje L-S, 12h/Dia-Noche',
  'Personal de Limpieza 12h/día-noche L-D',
  'Personal de Limpieza 8h/día L-S',
  'Jardinero Full Time',
  'Jardinero Part Time',
  'Guardia de Seguridad 12h/día'
];

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

const SERVICES: Service[] = [
  {
    id: 'administracion-integral',
    title: 'Administración integral de Edificios & Condominios',
    description: 'Gestión completa operativa, administrativa y de convivencia para su comunidad.',
    icon: <Building2 className="w-6 h-6" />
  },
  {
    id: 'gestion-presupuestal',
    title: 'Asesoría en gestión presupuestal',
    description: 'Estrategias realistas para optimizar el uso de los recursos y rendición de cuentas.',
    icon: <PiggyBank className="w-6 h-6" />
  },
  {
    id: 'soporte-legal',
    title: 'Soporte legal al servicio de administración',
    description: 'Asesoría jurídica especializada para la correcta gestión de la Junta de Propietarios.',
    icon: <Gavel className="w-6 h-6" />
  },
  {
    id: 'mejoras-inmuebles',
    title: 'Asesoría en mejoras de inmuebles',
    description: 'Proyectos de valorización y conservación constante de las áreas comunes.',
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    id: 'mantenimiento-muebles',
    title: 'Mantenimient y mejoras de muebles y accesorios de edificaciones',
    description: 'Cuidado detallado de los activos y equipamiento del edificio.',
    icon: <Hammer className="w-6 h-6" />
  }
];

const ADDITIONAL_SERVICES = [
  { id: 'mantenimiento-especializado', label: 'Mantenimiento Especializado' },
  { id: 'seguridad', label: 'Seguridad y Vigilancia' },
  { id: 'limpieza-profunda', label: 'Limpieza Profunda' },
  { id: 'jardineria', label: 'Jardinería y Paisajismo' },
  { id: 'otros', label: 'Otros' }
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '5 Claves para una Gestión Eficiente de Condominios',
    excerpt: 'Descubre los pilares fundamentales para mantener una convivencia armoniosa y una administración transparente.',
    image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=800',
    date: '10 Mar 2026'
  },
  {
    id: '2',
    title: 'Mantenimiento Preventivo: Cómo Ahorrar en el Futuro',
    excerpt: 'La importancia de anticiparse a los problemas técnicos para evitar gastos extraordinarios y derramas.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
    date: '05 Mar 2026'
  },
  {
    id: '3',
    title: 'La Importancia de la Transparencia en la Administración Inmobiliaria',
    excerpt: 'Cómo la rendición de cuentas periódica fortalece la confianza entre la Junta de Propietarios y la administración.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    date: '01 Mar 2026'
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Propuesta', href: '#propuesta' },
    { name: 'Beneficios', href: '#beneficios' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contacto', href: '#contacto' },
    { name: 'Cotizar', href: '#cotizar' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gold flex items-center justify-center rounded-sm">
            <span className="text-black font-bold text-xl">DL</span>
          </div>
          <span className="text-xl font-serif tracking-widest text-white uppercase">Real State</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm uppercase tracking-widest text-white/70 hover:text-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contacto" 
            className="px-6 py-2 bg-gold text-black text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors"
          >
            Escríbenos
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-graphite border-b border-white/10 p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg uppercase tracking-widest text-white/70 hover:text-gold"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contacto" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-3 bg-gold text-black text-xs uppercase tracking-widest font-bold text-center"
            >
              Escríbenos
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Error al enviar el mensaje.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-8 bg-gold/10 border border-gold/30 rounded-lg">
        <CheckCircle2 className="w-12 h-12 text-gold mx-auto mb-4" />
        <h3 className="text-xl font-serif mb-2">¡Mensaje Enviado!</h3>
        <p className="text-white/60 text-sm">Gracias por contactarnos. Te responderemos a la brevedad.</p>
        <button onClick={() => setIsSubmitted(false)} className="mt-4 text-gold text-xs uppercase tracking-widest border-b border-gold pb-1">Enviar otro mensaje</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          required 
          type="text" 
          placeholder="Nombre" 
          className="w-full bg-black border border-white/10 p-3 text-sm focus:border-gold outline-none"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
        />
        <input 
          required 
          type="email" 
          placeholder="Correo" 
          className="w-full bg-black border border-white/10 p-3 text-sm focus:border-gold outline-none"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
      </div>
      <textarea 
        required 
        placeholder="Mensaje" 
        className="w-full bg-black border border-white/10 p-3 text-sm focus:border-gold outline-none min-h-[120px]"
        value={formData.message}
        onChange={e => setFormData({...formData, message: e.target.value})}
      />
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-4 bg-gold text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all disabled:opacity-50"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
    </form>
  );
};

const QuoteForm = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    district: '',
    buildingType: '',
    towers: 1,
    units: 1,
    parking: 0,
    storage: 0,
    floors: 1,
    offices: 0,
    commonAreas: {} as Record<string, { selected: boolean; quantity: number }>,
    personnel: {} as Record<string, number>,
    comments: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleCommonAreaToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      commonAreas: {
        ...prev.commonAreas,
        [id]: {
          selected: !prev.commonAreas[id]?.selected,
          quantity: prev.commonAreas[id]?.quantity || 1
        }
      }
    }));
  };

  const handleCommonAreaQty = (id: string, qty: number) => {
    setFormData(prev => ({
      ...prev,
      commonAreas: {
        ...prev.commonAreas,
        [id]: { ...prev.commonAreas[id], quantity: qty }
      }
    }));
  };

  const handlePersonnelQty = (name: string, qty: number) => {
    setFormData(prev => ({
      ...prev,
      personnel: { ...prev.personnel, [name]: qty }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          selectedServices,
          servicesList: SERVICES
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('Hubo un error al enviar la solicitud. Por favor, intente nuevamente.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error de conexión. Por favor, verifique su internet e intente nuevamente.');
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-graphite p-12 text-center border border-gold/30 rounded-lg"
      >
        <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-6" />
        <h3 className="text-3xl font-serif mb-4">¡Solicitud Recibida!</h3>
        <p className="text-white/60 mb-8 max-w-md mx-auto">
          Hemos generado una cotización preliminar detallada. Un asesor de DL Real State se pondrá en contacto contigo para validar los datos técnicos.
        </p>
        <div className="text-left bg-black/40 p-6 rounded border border-white/5 mb-8 max-h-[400px] overflow-y-auto custom-scrollbar">
          <p className="text-gold text-xs uppercase tracking-widest mb-4">Resumen de Solicitud:</p>
          <div className="space-y-4 text-sm text-white/80">
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Ubicación</p>
              <p>{formData.country}, {formData.city} - {formData.district}</p>
            </div>
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Edificación</p>
              <p>{formData.buildingType} {formData.buildingType === 'Edificio Vertical' ? `(${formData.towers} torres)` : ''}</p>
              <p>{formData.units} Deptos, {formData.parking} Estac., {formData.storage} Depósitos</p>
            </div>
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Servicios</p>
              <ul className="list-disc list-inside">
                {selectedServices.map(id => <li key={id}>{SERVICES.find(s => s.id === id)?.title}</li>)}
              </ul>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="text-gold uppercase tracking-widest text-xs border-b border-gold pb-1 hover:text-white hover:border-white transition-colors"
        >
          Nueva Cotización
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* 1. Ubicación y Contacto */}
      <div className="bg-graphite p-8 border border-white/5 rounded-lg space-y-8">
        <h3 className="text-2xl font-serif flex items-center gap-3">
          <MapPin className="text-gold" />
          1. Ubicación y Contacto
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/40">País</label>
            <div className="relative">
              <select 
                required
                className="w-full bg-black border border-white/10 p-3 text-sm focus:border-gold outline-none appearance-none cursor-pointer"
                value={formData.country}
                onChange={e => setFormData({...formData, country: e.target.value, city: ''})}
              >
                <option value="">Seleccionar País</option>
                {Object.keys(COUNTRIES_DATA).sort().map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/40">Ciudad</label>
            <div className="relative">
              <select 
                required
                disabled={!formData.country}
                className="w-full bg-black border border-white/10 p-3 text-sm focus:border-gold outline-none appearance-none cursor-pointer disabled:opacity-30"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
              >
                <option value="">Seleccionar Ciudad</option>
                {formData.country && COUNTRIES_DATA[formData.country].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/40">Distrito</label>
            <input 
              required
              type="text" 
              className="w-full bg-black border border-white/10 p-3 text-sm focus:border-gold outline-none"
              placeholder="Llenado manual"
              value={formData.district}
              onChange={e => setFormData({...formData, district: e.target.value})}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/40">Nombre Completo</label>
            <input required type="text" className="w-full bg-black border border-white/10 p-3 text-sm focus:border-gold outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/40">Correo</label>
            <input required type="email" className="w-full bg-black border border-white/10 p-3 text-sm focus:border-gold outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/40">Teléfono</label>
            <input required type="tel" className="w-full bg-black border border-white/10 p-3 text-sm focus:border-gold outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
        </div>
      </div>

      {/* 2. Servicios Solicitados */}
      <div className="bg-graphite p-8 border border-white/5 rounded-lg space-y-8">
        <h3 className="text-2xl font-serif flex items-center gap-3">
          <Calculator className="text-gold" />
          2. Servicios Solicitados
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => toggleService(service.id)}
              className={`flex items-center gap-4 p-4 text-left border transition-all duration-300 ${
                selectedServices.includes(service.id) ? 'bg-gold/10 border-gold' : 'bg-black border-white/10 hover:border-white/30'
              }`}
            >
              <div className={`${selectedServices.includes(service.id) ? 'text-gold' : 'text-white/40'}`}>
                {service.icon}
              </div>
              <span className="text-xs font-medium uppercase tracking-wider">{service.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Información de la Edificación */}
      <div className="bg-graphite p-8 border border-white/5 rounded-lg space-y-8">
        <h3 className="text-2xl font-serif flex items-center gap-3">
          <Building2 className="text-gold" />
          3. Información de la Edificación
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/40">Tipo de Edificación</label>
              <div className="grid grid-cols-1 gap-2">
                {['Edificio Vertical', 'Condominio multifamiliar', 'Edificio Comercial'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({...formData, buildingType: type})}
                    className={`p-3 text-xs uppercase tracking-widest border text-left transition-all ${
                      formData.buildingType === type ? 'bg-gold text-black border-gold' : 'bg-black border-white/10'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            {formData.buildingType === 'Edificio Vertical' && (
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40">Cantidad de Torres (1-100)</label>
                <input 
                  type="range" min="1" max="100" 
                  className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-gold"
                  value={formData.towers}
                  onChange={e => setFormData({...formData, towers: parseInt(e.target.value)})}
                />
                <p className="text-center text-gold font-bold">{formData.towers} Torres</p>
              </div>
            )}
          </div>
          <div className="space-y-6">
            <label className="text-xs uppercase tracking-widest text-white/40 block">Detalles de la Edificación</label>
            
            {/* Dynamic Selectors based on Building Type */}
            <div className="space-y-4">
              {/* Vertical Building Logic */}
              {formData.buildingType === 'Edificio Vertical' && (
                <>
                  <div className="flex items-center justify-between bg-black p-3 border border-white/10">
                    <span className="text-xs uppercase tracking-widest text-white/60">Departamentos</span>
                    <div className="flex items-center gap-4">
                      <button type="button" onClick={() => setFormData({...formData, units: Math.max(1, formData.units - 1)})} className="text-gold hover:text-white"><Minus className="w-4 h-4"/></button>
                      <input type="number" className="w-16 bg-transparent text-center text-sm outline-none" value={formData.units} onChange={e => setFormData({...formData, units: Math.min(1000, Math.max(1, parseInt(e.target.value) || 1))})} />
                      <button type="button" onClick={() => setFormData({...formData, units: Math.min(1000, formData.units + 1)})} className="text-gold hover:text-white"><Plus className="w-4 h-4"/></button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-black p-3 border border-white/10">
                    <span className="text-xs uppercase tracking-widest text-white/60">Cantidad de Pisos</span>
                    <div className="flex items-center gap-4">
                      <button type="button" onClick={() => setFormData({...formData, floors: Math.max(1, formData.floors - 1)})} className="text-gold hover:text-white"><Minus className="w-4 h-4"/></button>
                      <input type="number" className="w-16 bg-transparent text-center text-sm outline-none" value={formData.floors} onChange={e => setFormData({...formData, floors: Math.min(200, Math.max(1, parseInt(e.target.value) || 1))})} />
                      <button type="button" onClick={() => setFormData({...formData, floors: Math.min(200, formData.floors + 1)})} className="text-gold hover:text-white"><Plus className="w-4 h-4"/></button>
                    </div>
                  </div>
                </>
              )}

              {/* Condominio Logic */}
              {formData.buildingType === 'Condominio multifamiliar' && (
                <div className="flex items-center justify-between bg-black p-3 border border-white/10">
                  <span className="text-xs uppercase tracking-widest text-white/60 text-left leading-tight">Cantidad de Unidades Inmobiliarias</span>
                  <div className="flex items-center gap-4">
                    <button type="button" onClick={() => setFormData({...formData, units: Math.max(1, formData.units - 1)})} className="text-gold hover:text-white"><Minus className="w-4 h-4"/></button>
                    <input type="number" className="w-16 bg-transparent text-center text-sm outline-none" value={formData.units} onChange={e => setFormData({...formData, units: Math.min(1000, Math.max(1, parseInt(e.target.value) || 1))})} />
                    <button type="button" onClick={() => setFormData({...formData, units: Math.min(1000, formData.units + 1)})} className="text-gold hover:text-white"><Plus className="w-4 h-4"/></button>
                  </div>
                </div>
              )}

              {/* Commercial Logic */}
              {formData.buildingType === 'Edificio Comercial' && (
                <>
                  <div className="flex items-center justify-between bg-black p-3 border border-white/10">
                    <span className="text-xs uppercase tracking-widest text-white/60">Cantidad de Oficinas</span>
                    <div className="flex items-center gap-4">
                      <button type="button" onClick={() => setFormData({...formData, offices: Math.max(0, formData.offices - 1)})} className="text-gold hover:text-white"><Minus className="w-4 h-4"/></button>
                      <input type="number" className="w-16 bg-transparent text-center text-sm outline-none" value={formData.offices} onChange={e => setFormData({...formData, offices: Math.min(1000, Math.max(0, parseInt(e.target.value) || 0))})} />
                      <button type="button" onClick={() => setFormData({...formData, offices: Math.min(1000, formData.offices + 1)})} className="text-gold hover:text-white"><Plus className="w-4 h-4"/></button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-black p-3 border border-white/10">
                    <span className="text-xs uppercase tracking-widest text-white/60">Cantidad de Pisos</span>
                    <div className="flex items-center gap-4">
                      <button type="button" onClick={() => setFormData({...formData, floors: Math.max(1, formData.floors - 1)})} className="text-gold hover:text-white"><Minus className="w-4 h-4"/></button>
                      <input type="number" className="w-16 bg-transparent text-center text-sm outline-none" value={formData.floors} onChange={e => setFormData({...formData, floors: Math.min(200, Math.max(1, parseInt(e.target.value) || 1))})} />
                      <button type="button" onClick={() => setFormData({...formData, floors: Math.min(200, formData.floors + 1)})} className="text-gold hover:text-white"><Plus className="w-4 h-4"/></button>
                    </div>
                  </div>
                </>
              )}

              {/* Common Selectors for all types */}
              <div className="flex items-center justify-between bg-black p-3 border border-white/10">
                <span className="text-xs uppercase tracking-widest text-white/60">Estacionamientos</span>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => setFormData({...formData, parking: Math.max(0, formData.parking - 1)})} className="text-gold hover:text-white"><Minus className="w-4 h-4"/></button>
                  <input type="number" className="w-16 bg-transparent text-center text-sm outline-none" value={formData.parking} onChange={e => setFormData({...formData, parking: Math.min(1000, Math.max(0, parseInt(e.target.value) || 0))})} />
                  <button type="button" onClick={() => setFormData({...formData, parking: Math.min(1000, formData.parking + 1)})} className="text-gold hover:text-white"><Plus className="w-4 h-4"/></button>
                </div>
              </div>
              <div className="flex items-center justify-between bg-black p-3 border border-white/10">
                <span className="text-xs uppercase tracking-widest text-white/60">Almacenes o depósitos</span>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => setFormData({...formData, storage: Math.max(0, formData.storage - 1)})} className="text-gold hover:text-white"><Minus className="w-4 h-4"/></button>
                  <input type="number" className="w-16 bg-transparent text-center text-sm outline-none" value={formData.storage} onChange={e => setFormData({...formData, storage: Math.min(1000, Math.max(0, parseInt(e.target.value) || 0))})} />
                  <button type="button" onClick={() => setFormData({...formData, storage: Math.min(1000, formData.storage + 1)})} className="text-gold hover:text-white"><Plus className="w-4 h-4"/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Áreas Comunes */}
      <div className="bg-graphite p-8 border border-white/5 rounded-lg space-y-8">
        <h3 className="text-2xl font-serif flex items-center gap-3">
          <HeartHandshake className="text-gold" />
          4. Áreas Comunes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMMON_AREAS_LIST.map((area) => (
            <div key={area.id} className={`p-4 border transition-all ${formData.commonAreas[area.id]?.selected ? 'bg-gold/10 border-gold' : 'bg-black border-white/10'}`}>
              <div className="flex items-center justify-between mb-3">
                <button 
                  type="button" 
                  onClick={() => handleCommonAreaToggle(area.id)}
                  className="flex items-center gap-3 text-left"
                >
                  <div className={`w-4 h-4 border flex items-center justify-center ${formData.commonAreas[area.id]?.selected ? 'bg-gold border-gold' : 'border-white/20'}`}>
                    {formData.commonAreas[area.id]?.selected && <CheckCircle2 className="w-3 h-3 text-black" />}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest">{area.label}</span>
                </button>
              </div>
              {area.hasQuantity && formData.commonAreas[area.id]?.selected && (
                <div className="flex items-center gap-3 mt-2">
                  <input 
                    type="number" 
                    min="0" max={area.max}
                    className="w-full bg-black/50 border border-white/10 p-2 text-xs text-center outline-none focus:border-gold"
                    placeholder={`0-${area.max}`}
                    value={formData.commonAreas[area.id]?.quantity || 0}
                    onChange={e => handleCommonAreaQty(area.id, Math.min(area.max!, Math.max(0, parseInt(e.target.value) || 0)))}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5. Personal Requerido */}
      <div className="bg-graphite p-8 border border-white/5 rounded-lg space-y-8">
        <h3 className="text-2xl font-serif flex items-center gap-3">
          <Users className="text-gold" />
          5. Personal Requerido (Cantidad 1-100)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PERSONNEL_LIST.map((person) => (
            <div key={person} className="flex items-center justify-between bg-black p-4 border border-white/10">
              <span className="text-[10px] uppercase tracking-widest text-white/60 max-w-[200px]">{person}</span>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => handlePersonnelQty(person, Math.max(0, (formData.personnel[person] || 0) - 1))} className="text-gold hover:text-white"><Minus className="w-4 h-4"/></button>
                <input 
                  type="number" 
                  className="w-12 bg-transparent text-center text-sm outline-none"
                  value={formData.personnel[person] || 0}
                  onChange={e => handlePersonnelQty(person, Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                />
                <button type="button" onClick={() => handlePersonnelQty(person, Math.min(100, (formData.personnel[person] || 0) + 1))} className="text-gold hover:text-white"><Plus className="w-4 h-4"/></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Otros y Envío */}
      <div className="bg-graphite p-8 border border-white/5 rounded-lg space-y-8">
        <h3 className="text-2xl font-serif flex items-center gap-3">
          <MessageSquare className="text-gold" />
          6. Otros Servicios Especiales
        </h3>
        <textarea 
          className="w-full bg-black border border-white/10 p-4 text-sm focus:border-gold outline-none min-h-[150px] custom-scrollbar"
          placeholder="Indique cualquier otro requerimiento o servicio especial que necesite..."
          value={formData.comments}
          onChange={e => setFormData({...formData, comments: e.target.value})}
        />
        <button 
          type="submit"
          disabled={selectedServices.length === 0 || !formData.country || !formData.city}
          className="w-full py-5 bg-gold text-black font-bold uppercase tracking-[0.3em] text-sm hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Generar Propuesta Técnica de Gestión
        </button>
      </div>
    </form>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" 
            alt="Modern Building" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold uppercase tracking-[0.4em] text-xs mb-1 block">Excelencia en Gestión Inmobiliaria</span>
            <div className="inline-block text-center mb-8">
              <h1 className="font-serif leading-none flex flex-col md:flex-row items-baseline justify-center gap-2 md:gap-4 text-white">
                <span className="text-5xl md:text-8xl">DL</span>
                <span className="relative inline-block text-5xl md:text-8xl">
                  Real State
                </span>
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed mt-6 md:mt-10">
              Gestión integral de edificios y condominios con el compromiso de un equipo técnico especializado y amplia experiencia.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a href="#cotizar" className="px-10 py-4 bg-gold text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-all duration-300">
                Solicitar Cotización
              </a>
              <a href="#nosotros" className="px-10 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300">
                Conócenos
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold to-transparent mx-auto"></div>
        </motion.div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="py-24 bg-graphite relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-earth/5 -skew-x-12 transform translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold uppercase tracking-widest text-xs mb-4 block">Nuestra Historia</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8">Nosotros</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                DL Real State es una empresa especializada en la gestión integral de edificios y condominios, y nace del compromiso de un equipo humano con formación técnica y amplia experiencia en la administración de inmuebles y servicios inmobiliarios conexos.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-3xl font-serif text-gold mb-2">+10</p>
                  <p className="text-xs uppercase tracking-widest text-white/40">Años de Experiencia</p>
                </div>
                <div>
                  <p className="text-3xl font-serif text-gold mb-2">100%</p>
                  <p className="text-xs uppercase tracking-widest text-white/40">Compromiso Técnico</p>
                </div>
              </div>
            </motion.div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1073" 
                alt="Office" 
                className="rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 bg-gold p-8 hidden md:block">
                <p className="text-black font-serif text-xl italic">"Gestión con alma técnica y visión humana."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Propuesta de Valor */}
      <section id="propuesta" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-gold uppercase tracking-widest text-xs mb-4 block">Diferenciación</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Propuesta de Valor</h2>
            <div className="w-24 h-[1px] bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-graphite p-10 border border-white/5 hover:border-gold/30 transition-all duration-500"
            >
              <ShieldCheck className="w-12 h-12 text-gold mb-6" />
              <h3 className="text-2xl font-serif mb-4">Estándares de Calidad</h3>
              <p className="text-white/60 leading-relaxed">
                Nuestro personal operativo y administrativo ha sido formado y seleccionado bajo altos estándares de calidad, asegurando un servicio de primer nivel en cada interacción.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-graphite p-10 border border-white/5 hover:border-gold/30 transition-all duration-500"
            >
              <Users className="w-12 h-12 text-gold mb-6" />
              <h3 className="text-2xl font-serif mb-4">Certificación Profesional</h3>
              <p className="text-white/60 leading-relaxed">
                Nuestra dirección está a cargo de profesionales certificados por el Diplomado en Administración de Edificios y Condominios de la Universidad San Martín de Porres.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section id="beneficios" className="py-24 bg-graphite relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <span className="text-gold uppercase tracking-widest text-xs mb-4 block">Impacto</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Lo que ganará la Junta de Propietarios</h2>
              <p className="text-white/50 mb-8">
                Nuestra gestión no solo administra, sino que transforma la convivencia y protege su patrimonio.
              </p>
              <div className="p-6 border border-gold/20 bg-gold/5 rounded-lg">
                <p className="text-sm italic text-gold/80">
                  "Nuestro personal es verificado en antecedentes policiales y penales. A consideración del cliente, incluimos seguro de honestidad."
                </p>
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Reducción de Gastos', desc: 'Eliminación de gastos innecesarios mediante auditorías y optimización.', icon: <PiggyBank /> },
                { title: 'Mayor Valorización', desc: 'Conservación y mejora constante de las áreas comunes.', icon: <TrendingUp /> },
                { title: 'Transparencia Total', desc: 'Comunicación clara y estrategia presupuestaria realista.', icon: <HeartHandshake /> },
                { title: 'Menos Conflictos', desc: 'Disminución de fricciones internas mediante una gestión mediadora.', icon: <Users /> },
                { title: 'Calidad de Vida', desc: 'Mejor percepción de seguridad y bienestar para los residentes.', icon: <ShieldCheck /> },
                { title: 'Tranquilidad', desc: 'Confianza absoluta sobre el personal que atiende su edificio.', icon: <CheckCircle2 /> },
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 bg-black/40 border border-white/5 hover:border-white/20 transition-all"
                >
                  <div className="text-gold mb-4">{item.icon}</div>
                  <h4 className="text-lg font-serif mb-2">{item.title}</h4>
                  <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-gold uppercase tracking-widest text-xs mb-4 block">Nuestras Soluciones</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Nuestros Servicios</h2>
            <div className="w-24 h-[1px] bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="group p-8 bg-graphite border border-white/5 hover:bg-earth/20 transition-all duration-500"
              >
                <div className="w-12 h-12 bg-black flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-serif mb-4">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-gold uppercase tracking-widest text-xs mb-4 block">Actualidad y Consejos</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Nuestro Blog</h2>
            <div className="w-24 h-[1px] bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, idx) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group bg-graphite border border-white/5 overflow-hidden flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-gold px-3 py-1 text-[10px] font-bold text-black uppercase tracking-widest">
                    {post.date}
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-xl font-serif mb-4 group-hover:text-gold transition-colors">{post.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  <button className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-bold hover:text-white transition-colors">
                    Leer más <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Cotizador Section */}
      <section id="cotizar" className="py-24 bg-graphite relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-gold uppercase tracking-widest text-xs mb-4 block">Cotización Dinámica</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Solicita tu Propuesta</h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Selecciona los servicios que requiere tu edificio y genera una cotización técnica preliminar en segundos.
            </p>
          </div>

          <QuoteForm />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold uppercase tracking-widest text-xs mb-4 block">Atención Personalizada</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8">¿Tienes alguna duda?</h2>
              <p className="text-white/50 mb-12 leading-relaxed">
                Nuestro equipo está listo para asesorarte en la mejor solución de gestión para tu propiedad. Envíanos un mensaje y te contactaremos en menos de 24 horas.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">Escríbenos</p>
                    <p className="text-sm">contact@dlrealstate.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">Llámanos</p>
                    <p className="text-sm">+51 946 187 763</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-graphite p-8 md:p-12 border border-white/5 rounded-lg">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-gold flex items-center justify-center rounded-sm">
                  <span className="text-black font-bold text-xl">DL</span>
                </div>
                <span className="text-xl font-serif tracking-widest text-white uppercase">Real State</span>
              </div>
              <p className="text-white/40 max-w-md leading-relaxed mb-8">
                Especialistas en la gestión integral de edificios y condominios. Compromiso técnico y experiencia al servicio de su tranquilidad y patrimonio.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                  <Mail className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-8">Contacto</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  <div>
                    <p className="text-white/40 text-[10px] uppercase">Gerencia General</p>
                    <p>+51 946 187 763</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  <div>
                    <p className="text-white/40 text-[10px] uppercase">Servicios al Cliente</p>
                    <p>+51 987 733 977</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <Mail className="w-4 h-4 text-gold shrink-0" />
                  <p>contact@dlrealstate.com</p>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin className="w-4 h-4 text-gold shrink-0" />
                  <p>Lima, Perú</p>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-8">Enlaces</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="#nosotros" className="hover:text-gold transition-colors">Nosotros</a></li>
                <li><a href="#servicios" className="hover:text-gold transition-colors">Servicios</a></li>
                <li><a href="#blog" className="hover:text-gold transition-colors">Blog</a></li>
                <li><a href="#beneficios" className="hover:text-gold transition-colors">Beneficios</a></li>
                <li><a href="#contacto" className="hover:text-gold transition-colors">Contacto</a></li>
                <li><a href="#cotizar" className="hover:text-gold transition-colors">Cotizar</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] uppercase tracking-widest text-white/30">
              © 2026 DL Real State. Todos los derechos reservados.
            </p>
            <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/30">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
