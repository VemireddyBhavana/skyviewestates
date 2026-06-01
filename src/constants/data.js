export const IMAGES = {
  heroHome: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
  heroHome2: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000",
  heroHome3: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000",
  heroAbout: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000",
  heroServices: "https://cdn.home-designing.com/wp-content/uploads/2018/12/luxury-modern-kitchen.jpg",
  contact: "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&q=80&w=2000",
  passion: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000",
  aboutIntro: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
  ourStory: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1000",
  heroContactBedroom: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000",
};

export const SERVICES = [
  {
    id: "01",
    title: "Custom Design",
    description: "Our world-class architects translate your vision into breathtaking 3D designs and precise blueprints. We ensure every square foot reflects your personal style and functional needs.",
    image: "/assets/workers/design-1.png"
  },
  {
    id: "02",
    title: "Premium Construction",
    description: "Using only top-tier materials and advanced engineering techniques, we build structures that stand the test of time. Quality is our foundation, and excellence is our standard.",
    image: "/assets/workers/mason-1.png"
  },
  {
    id: "03",
    title: "Worker Management",
    description: "We hand-select and manage a team of expert masons, electricians, and plumbers. Our rigorous quality control ensures every detail of your home is crafted to perfection.",
    image: "/assets/workers/plumbing-1.png"
  },
  {
    id: "04",
    title: "Smart Home Integration",
    description: "Future-proof your living space with integrated smart home technology. From automated lighting to advanced security systems, we build homes that are as intelligent as they are beautiful.",
    image: "/assets/workers/electric-1.png"
  },
];

import { APARTMENTS } from './properties/apartments';
import { VILLAS } from './properties/villas';
import { PENTHOUSES } from './properties/penthouses';
import { HOUSES } from './properties/houses';

export const PROPERTIES = [
  ...APARTMENTS,
  ...VILLAS,
  ...PENTHOUSES,
  ...HOUSES,
];


export const CONTACT_INFO = {
  address: "Plot No. 42, Sun Bright Tower, Silicon Valley, Madhapur, Hyderabad, Telangana 500081",
  email: "sunbrightproperities99@gmail.com",
  phone: "+91 77992 50555",
  hours: "Mon - Sat: 9:00 AM - 6:00 PM",
};

export const FOUNDERS = [
  {
    id: 1,
    name: "Madivar Sai Basava",
    role: "Founder & CEO",
    image: "https://res.cloudinary.com/djzgjy947/image/upload/v1780038032/WhatsApp_Image_2026-05-29_at_12.29.27_PM_qwwnqo.jpg",
    bio: "Passionate entrepreneur and real estate visionary focused on creating premium property experiences and modern luxury home solutions across Hyderabad.",
    location: "Hyderabad, Telangana",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com"
    }
  }
];


export const TESTIMONIALS = [
  {
    id: 1,
    author: "JAMES OLIVER",
    text: "Working with this team was a game-changer. They found me the perfect home within a week and handled all the paperwork seamlessly. Highly recommended!",
    stars: 5,
  },
  {
    id: 2,
    author: "SOPHIA MARTINEZ",
    text: "The personalized service I received was exceptional. They really took the time to understand what I was looking for and delivered beyond my expectations.",
    stars: 5,
  },
];

export const CONSTRUCTION_PACKAGES = [
  {
    id: "basic",
    name: "Basic Package",
    price: "₹1,800/sq.ft",
    projectLead: "Arjun Mehta (Senior Builder)",
    tagline: "Quality essentials for budget-conscious homeowners.",
    features: ["Standard Brickwork", "Grade 43 Cement", "TMT Steel Fe500", "Vitrified Tiles (2x2)", "Standard Electricals"]
  },
  {
    id: "standard",
    name: "Standard Package",
    price: "₹2,200/sq.ft",
    projectLead: "Karan Johar (Expert Builder)",
    tagline: "Our most popular choice for premium residential homes.",
    features: ["Fly Ash Bricks", "Grade 53 Cement", "TMT Steel Fe550", "Double Charged Tiles", "Branded CP Fittings", "Modular Switches"]
  },
  {
    id: "luxury",
    name: "Luxury Package",
    price: "₹3,500/sq.ft",
    projectLead: "Sanjay Singhania (Master Builder)",
    tagline: "Ultra-luxury materials and concierge-level service.",
    features: ["Wire-cut Bricks", "Acc/Ultratech Cement", "Corrosion Resistant Steel", "Italian Marble Flooring", "Smart Home Automation", "Designer Bathrooms"]
  }
];

export const WORKERS = [
  // DESIGN (3)
  {
    id: 1,
    name: "Vikram Malhotra",
    role: "Lead Architect",
    category: "Design",
    rating: 5.0,
    reviews: 84,
    experience: "15 Years",
    verified: true,
    image: "/assets/workers/design-1.png",
    specialty: "Sustainable luxury residential designs and urban planning."
  },
  {
    id: 2,
    name: "Neha Sharma",
    role: "Interior Designer",
    category: "Design",
    rating: 4.9,
    reviews: 57,
    experience: "7 Years",
    verified: true,
    image: "/assets/workers/design-2.png",
    specialty: "Curated luxury interiors and bespoke furniture selection."
  },
  {
    id: 3,
    name: "Aryan Kapoor",
    role: "3D Visualizer",
    category: "Design",
    rating: 4.8,
    reviews: 43,
    experience: "5 Years",
    verified: true,
    image: "/assets/workers/design-3.png",
    specialty: "Photorealistic 3D rendering and virtual walkthroughs."
  },

  // MASONRY (3)
  {
    id: 4,
    name: "Rajesh Kumar",
    role: "Master Mason",
    category: "Masonry",
    rating: 4.9,
    reviews: 96,
    experience: "12 Years",
    verified: true,
    image: "/assets/workers/mason-1.png",
    specialty: "Precision structural foundations and load-bearing brickwork."
  },
  {
    id: 5,
    name: "Gopal Das",
    role: "Stone Specialist",
    category: "Masonry",
    rating: 4.7,
    reviews: 68,
    experience: "14 Years",
    verified: true,
    image: "/assets/workers/mason-2.png",
    specialty: "Natural stone cladding and decorative marble installation."
  },
  {
    id: 6,
    name: "Ram Singh",
    role: "Concrete Expert",
    category: "Masonry",
    rating: 4.6,
    reviews: 52,
    experience: "10 Years",
    verified: true,
    image: "/assets/workers/mason-3.png",
    specialty: "High-strength RCC works and complex column casting."
  },

  // ELECTRICAL (3)
  {
    id: 7,
    name: "Amit Singh",
    role: "Senior Electrician",
    category: "Electrical",
    rating: 4.8,
    reviews: 73,
    experience: "8 Years",
    verified: true,
    image: "/assets/workers/electric-1.png",
    specialty: "High-voltage systems and smart home automation integration."
  },
  {
    id: 8,
    name: "Rahul Varma",
    role: "Lighting Designer",
    category: "Electrical",
    rating: 4.9,
    reviews: 49,
    experience: "6 Years",
    verified: true,
    image: "/assets/workers/electric-2.png",
    specialty: "Ambient lighting control and custom LED installations."
  },
  {
    id: 9,
    name: "Karan Patel",
    role: "Solar Engineer",
    category: "Electrical",
    rating: 4.7,
    reviews: 38,
    experience: "9 Years",
    verified: true,
    image: "/assets/workers/electric-3.png",
    specialty: "Rooftop solar grid setup and backup power systems."
  },

  // PLUMBING (3)
  {
    id: 10,
    name: "Suresh Prabhu",
    role: "Plumbing Specialist",
    category: "Plumbing",
    rating: 4.7,
    reviews: 65,
    experience: "10 Years",
    verified: true,
    image: "/assets/workers/plumbing-1.png",
    specialty: "Advanced hydraulic systems and water treatment solutions."
  },
  {
    id: 11,
    name: "Mohit Bansal",
    role: "Sanitary Engineer",
    category: "Plumbing",
    rating: 4.8,
    reviews: 58,
    experience: "11 Years",
    verified: true,
    image: "/assets/workers/plumbing-2.png",
    specialty: "Luxury bathroom fittings and concealed drainage setup."
  },
  {
    id: 12,
    name: "Dilip Kumar",
    role: "Pipe Consultant",
    category: "Plumbing",
    rating: 4.6,
    reviews: 41,
    experience: "13 Years",
    verified: true,
    image: "/assets/workers/plumbing-1.png",
    specialty: "Underground network planning and fire hydrant systems."
  },

  // ENGINEERING (3)
  {
    id: 13,
    name: "Prakash Raj",
    role: "Structural Engineer",
    category: "Engineering",
    rating: 4.8,
    reviews: 120,
    experience: "20 Years",
    verified: true,
    image: "/assets/workers/engineer-1.png",
    specialty: "Seismic-resistant structures and deep-foundation engineering."
  },
  {
    id: 14,
    name: "Anita Iyer",
    role: "Project Manager",
    category: "Engineering",
    rating: 4.9,
    reviews: 76,
    experience: "12 Years",
    verified: true,
    image: "/assets/workers/engineer-2.png",
    specialty: "Site coordination, safety audits, and timeline management."
  },
  {
    id: 15,
    name: "Arjun Reddy",
    role: "Site Surveyor",
    category: "Engineering",
    rating: 4.7,
    reviews: 50,
    experience: "8 Years",
    verified: true,
    image: "/assets/workers/engineer-1.png",
    specialty: "Topographical surveying and GPS site marking."
  }
];
