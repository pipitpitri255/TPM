
import { useState, useEffect } from 'react';
import Background3D from '@/components/Background3D';
import Header from '@/components/Header';
import TabNavigation from '@/components/TabNavigation';
import RequestForm from '@/components/RequestForm';
import TrackingForm from '@/components/TrackingForm';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'request' | 'track'>('request');

  useEffect(() => {
    const handleTrackTicket = (event: CustomEvent) => {
      setActiveTab('track');
      // You can also pre-fill the search with the ticket number
      const ticketNumber = event.detail?.ticketNumber;
      if (ticketNumber) {
        // Store ticket number for pre-filling search
        sessionStorage.setItem('searchTicket', ticketNumber);
      }
    };

    window.addEventListener('trackTicket', handleTrackTicket as EventListener);
    
    return () => {
      window.removeEventListener('trackTicket', handleTrackTicket as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden cyber-grid">
      <Background3D />
      
      <div className="relative z-10">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="animate-fade-in">
            {activeTab === 'request' ? <RequestForm /> : <TrackingForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
