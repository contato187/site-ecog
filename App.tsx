
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Institutional from './sections/Institutional';
import Procedures from './sections/Procedures';
import VisualExperience from './sections/VisualExperience';
import VisualSynthesis from './sections/VisualSynthesis';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import FloatingChatBot from './components/FloatingChatBot';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Institutional />
        <Procedures />
        <VisualExperience />
        <VisualSynthesis />
        <Education />
        <Contact />
      </main>
      <FloatingChatBot />
      <Footer />
    </div>
  );
};

export default App;
