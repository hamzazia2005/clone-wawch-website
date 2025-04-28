'use client';

import { FloatingWhatsApp } from 'react-floating-whatsapp';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function WhatsAppButton() {
  const pathname = usePathname();
  const [chatMessage, setChatMessage] = useState('');
  const [preDefinedMessage, setPreDefinedMessage] = useState('');
  
  // const notificationSoundUrl = '/assets/notification.wav';

  useEffect(() => {
    if (pathname.includes('/pricing')) {
      setChatMessage("Hello! 👋 I see you're exploring our pricing options. How can I help you choose the right plan for your needs?");
      setPreDefinedMessage("I'm interested in your pricing plans and would like more information.");
    } else if (pathname.includes('/features')) {
      setChatMessage("Hello! 👋 I notice you're checking out our features. Is there a specific feature you'd like to know more about?");
      setPreDefinedMessage("I'd like to learn more about your features.");
    } else if (pathname.includes('/faqs')) {
      setChatMessage("Hello! 👋 Looking for answers? If you can't find what you need in our FAQs, I'm here to help!");
      setPreDefinedMessage("I have a question that's not covered in your FAQs.");
    } else if (pathname.includes('/blog')) {
      setChatMessage("Hello! 👋 Enjoying our blog? If you have any questions about what you're reading, feel free to ask!");
      setPreDefinedMessage("I just read your blog and have a question.");
    } else {
      setChatMessage("Hello! 👋 Welcome to WAWCD! How can we help you today?");
      setPreDefinedMessage("I'd like to learn more about WAWCD.");
    }
    
    // const audio = new Audio(notificationSoundUrl);
    // audio.load();
    
    // const enableAudio = () => {
    //   const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    //   if (audioContext.state === 'suspended') {
    //     audioContext.resume();
    //   }
    //   document.removeEventListener('click', enableAudio);
    // };
    
    // document.addEventListener('click', enableAudio);
    
    // return () => {
    //   document.removeEventListener('click', enableAudio);
    // };
  }, [pathname]);

   // Function to handle sending predefined message
   const handleSendPredefinedMessage = () => {
    // Find the input element
    const inputElement = document.querySelector('.floating-whatsapp-input');
    if (inputElement) {
      // Set the input value to our predefined message
      inputElement.value = preDefinedMessage;
      
      // Find and click the send button
      const sendButton = document.querySelector('.floating-whatsapp-send-button');
      if (sendButton) {
        sendButton.click();
      }
    }
  };

  return (
    <FloatingWhatsApp
      phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}
      accountName="WAWCD Support"
      statusMessage="Replies in 15 minutes"
      chatMessage={chatMessage}
      avatar="/assets/customer_support.png"
      allowClickAway={false}
      notification={true}
      notificationDelay={10}
      notificationLoop={true}
      notificationLoopDelay={200}
      // notificationSound={true}
      // notificationSoundSrc={notificationSoundUrl}
      messageDelay={1}
      darkMode={false}
      allowEsc={true}
      placeholder="Type a message..."
      buttonStyle={{ bottom: '20px', right: '20px' }}
      chatboxStyle={{ 
        boxShadow: '0 10px 50px rgba(0,0,0,0.1)', 
        borderRadius: '18px',
        width: '350px',
        height: '400px',
      }}
      className="whatsapp-button"
      renderCustomMessage={() => (
        <div className="custom-message-buttons">
          <button 
            onClick={handleSendPredefinedMessage}
            style={{
              background: '#47b772',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '16px',
              margin: '8px 0',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 2px 8px rgba(71,183,114,0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#3da665'}
            onMouseOut={(e) => e.target.style.background = '#47b772'}
          >
            {preDefinedMessage}
          </button>
        </div>
      )}
    />
  );
}
