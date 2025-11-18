import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import * as d3 from 'd3';
import { Mail, Phone, Linkedin, Github, Globe, Award, Menu, X, ChevronDown, ExternalLink } from 'lucide-react';

// Portfolio Data
const portfolioData = {
  personal: {
    name: "Indhar Jain",
    title: "Front-End Architect & Micro-Frontend Specialist",
    subtitle: "4 Years Crafting Scalable, High-Performance Web Applications",
    location: "Chennai, Tamil Nadu, India",
    email: "IndharJain@gmail.com",
    phone: "+91-7842113663",
    linkedin: "in/indhar-p",
    github: "indharjain",
    portfolio: "indhar.netlify.app"
  },
  stats: { experience: 4, projects: 5, components: 50 },
  projects: [
    {
      name: "AAVA Elderwand",
      description: "Advanced monorepo/micro-frontend architecture enabling modular, scalable enterprise UI ecosystems",
      tech: ["Microservices", "Module Federation", "Component Library"],
      color: "from-cyan-500 to-blue-600"
    },
    {
      name: "AAVA Digital Ascender",
      description: "AI-driven digital companion with chatbot interfaces and real-time AI guidance",
      tech: ["AI/ML", "NLP", "VS Code Plugin"],
      color: "from-purple-500 to-pink-600"
    },
    {
      name: "AAVA ICE",
      description: "Cloud cost governance platform with interactive D3.js visualizations",
      tech: ["D3.js", "Highcharts", "AG Grid"],
      color: "from-green-500 to-teal-600"
    },
    {
      name: "AAVA ITA",
      description: "AI-powered testing platform with Jira integration",
      tech: ["Test Automation", "Jira API", "File Management"],
      color: "from-orange-500 to-red-600"
    },
    {
      name: "AAVA IAF",
      description: "Accessibility evaluation framework with Chrome extension",
      tech: ["Chrome Extension", "WCAG", "Accessibility"],
      color: "from-indigo-500 to-purple-600"
    }
  ],
  experience: [
    {
      company: "Ascendion",
      title: "Engineer",
      date: "May 2023 - Present",
      achievements: [
        "Led monorepo/micro-frontend architecture",
        "Designed SSO authentication framework (Azure AD, Keycloak)",
        "Created 50+ reusable UI components",
        "Implemented CI/CD pipelines"
      ]
    },
    {
      company: "Ascendion",
      title: "Senior Associate Engineer",
      date: "Feb 2022 - May 2023",
      achievements: [
        "Built AI chatbot interfaces with NLP",
        "Created D3.js visualizations for cloud costs",
        "Developed VS Code and Jira plugins"
      ]
    },
    {
      company: "Enterprise Minds",
      title: "Junior Software Engineer",
      date: "Feb 2022 - May 2023",
      achievements: [
        "Built AG Grid upload systems",
        "Developed Chrome extension for accessibility",
        "Implemented WCAG compliance features"
      ]
    }
  ],
  skills: [
    { name: "React", category: "Frontend", level: 5 },
    { name: "Angular", category: "Frontend", level: 5 },
    { name: "TypeScript", category: "Languages", level: 5 },
    { name: "JavaScript", category: "Languages", level: 5 },
    { name: "D3.js", category: "Visualization", level: 4 },
    { name: "Three.js", category: "Visualization", level: 3 },
    { name: "Node.js", category: "Backend", level: 4 },
    { name: "Azure DevOps", category: "DevOps", level: 4 },
    { name: "Docker", category: "DevOps", level: 3 },
    { name: "Micro-frontends", category: "Architecture", level: 5 }
  ]
};

// Three.js Hero Background Component
const ThreeBackground = () => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create wireframe geometry
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00f5ff, wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({ color: 0x7b2ff7, size: 0.02 });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 5;

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      mesh.rotation.x += 0.001;
      mesh.rotation.y += 0.002;
      
      particles.rotation.y += 0.0005;
      
      camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseRef.current.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 opacity-30" />;
};

// D3 Skills Visualization
const SkillsVisualization = ({ skills }) => {
  const svgRef = useRef(null);
  const isInView = useInView(svgRef, { once: true });

  useEffect(() => {
    if (!isInView || !svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = 500;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    const categories = [...new Set(skills.map(s => s.category))];
    const colorScale = d3.scaleOrdinal()
      .domain(categories)
      .range(['#00f5ff', '#7b2ff7', '#10b981', '#f59e0b', '#ef4444']);

    const nodes = skills.map(s => ({
      ...s,
      x: width / 2 + (Math.random() - 0.5) * 100,
      y: height / 2 + (Math.random() - 0.5) * 100,
      radius: s.level * 8
    }));

    const simulation = d3.forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(d => d.radius + 5));

    const node = svg.selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("circle")
      .attr("r", d => d.radius)
      .attr("fill", d => colorScale(d.category))
      .attr("opacity", 0.8)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    node.append("text")
      .text(d => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .attr("fill", "#fff")
      .attr("font-size", "12px")
      .attr("font-weight", "600")
      .style("pointer-events", "none");

    simulation.on("tick", () => {
      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

  }, [isInView, skills]);

  return (
    <div className="w-full bg-gradient-to-br from-slate-900/50 to-purple-900/20 rounded-2xl p-8 backdrop-blur-sm border border-cyan-500/20">
      <svg ref={svgRef} className="w-full" style={{ height: '500px' }} />
    </div>
  );
};

// Main Portfolio Component
export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 text-white min-h-screen">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-lg z-40 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            >
              IJ
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-cyan-400"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900/95 backdrop-blur-lg"
            >
              <div className="px-4 py-4 space-y-3">
                {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-300 hover:text-cyan-400 py-2"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <ThreeBackground />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            {portfolioData.personal.name}
          </motion.h1>
          
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl text-gray-300 mb-4"
          >
            {portfolioData.personal.title}
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            {portfolioData.personal.subtitle}
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 245, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold"
            >
              View Projects
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(123, 47, 247, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-500/10"
            >
              Download Resume
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown size={32} className="text-cyan-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { label: 'Years Experience', value: portfolioData.stats.experience, suffix: '+' },
              { label: 'Major Projects', value: portfolioData.stats.projects, suffix: '' },
              { label: 'UI Components', value: portfolioData.stats.components, suffix: '+' }
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-8 rounded-2xl backdrop-blur-sm border border-cyan-500/20 text-center"
              >
                <div className="text-5xl font-bold text-cyan-400 mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto text-center"
          >
            Results-driven Front-End Engineer with nearly 4 years of hands-on experience delivering user-centric, 
            high-performance web applications in enterprise environments. Expertise in building scalable architectures, 
            implementing secure authentication systems, developing micro front-end solutions, and creating reusable UI 
            component libraries.
          </motion.p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Skills & Expertise
          </motion.h2>

          <SkillsVisualization skills={portfolioData.skills} />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 mt-6"
          >
            Drag nodes to explore • Size represents proficiency level
          </motion.p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {portfolioData.projects.map((project, idx) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ 
                  scale: 1.02, 
                  rotateX: 2, 
                  rotateY: 2,
                  boxShadow: "0 20px 50px rgba(0, 245, 255, 0.3)"
                }}
                className={`bg-gradient-to-br ${project.color} p-[1px] rounded-2xl group`}
              >
                <div className="bg-slate-900 p-6 rounded-2xl h-full">
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {project.name}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(tech => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                  >
                    View Details <ExternalLink size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Professional Experience
          </motion.h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-500" />

            {portfolioData.experience.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative pl-20 pb-12"
              >
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="absolute left-6 top-2 w-5 h-5 bg-cyan-400 rounded-full border-4 border-slate-900"
                />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-cyan-500/20"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                      <p className="text-cyan-400">{exp.company}</p>
                    </div>
                    <span className="text-gray-400 text-sm">{exp.date}</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-gray-300 flex items-start">
                        <span className="text-cyan-400 mr-2">▹</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Award */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-6 rounded-2xl border-2 border-yellow-500/30 text-center mt-8"
          >
            <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">Champion Award</h3>
            <p className="text-gray-300">Feb 2024 • Ascendion</p>
            <p className="text-gray-400 mt-2">
              Recognized for exceptional contributions and innovation in the AAVA platform
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Get In Touch
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-12"
          >
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: Mail, text: portfolioData.personal.email, href: `mailto:${portfolioData.personal.email}` },
              { icon: Phone, text: portfolioData.personal.phone, href: `tel:${portfolioData.personal.phone}` },
              { icon: Linkedin, text: portfolioData.personal.linkedin, href: `https://linkedin.com/${portfolioData.personal.linkedin}` },
              { icon: Github, text: portfolioData.personal.github, href: `https://github.com/${portfolioData.personal.github}` }
            ].map(({ icon: Icon, text, href }, idx) => (
              <motion.a
                key={text}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 245, 255, 0.3)" }}
                className="flex items-center gap-4 bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-cyan-500/20"
              >
                <Icon className="text-cyan-400" size={24} />
                <span className="text-gray-300">{text}</span>
              </motion.a>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 245, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-xl font-semibold"
          >
            Let's Collaborate
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400"
          >
            © 2024 {portfolioData.personal.name}. Crafted with React, Three.js, D3.js & Framer Motion
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 mt-2 text-sm"
          >
            {portfolioData.personal.location}
          </motion.p>
        </div>
      </footer>
    </div>
  );
}