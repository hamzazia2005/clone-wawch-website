'use client';

import { FloatingWhatsApp } from 'react-floating-whatsapp';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

export default function WhatsAppButton() {
  const pathname = usePathname();
  const [chatMessage, setChatMessage] = useState('');
  const [preDefinedMessage, setPreDefinedMessage] = useState('');
  const customButtonCreated = useRef(false);
  
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

  // Add style to hide default button immediately
  useEffect(() => {
    // Add a style tag to hide the default button immediately
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      .floating-whatsapp-button {
        visibility: hidden !important;
      }
      
      @keyframes pulse {
        0% {
          transform: scale(1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        50% {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(37, 211, 102, 0.3);
        }
        100% {
          transform: scale(1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
      }
      
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-10px);
        }
        60% {
          transform: translateY(-5px);
        }
      }
    `;
    document.head.appendChild(styleTag);
    
    return () => {
      if (styleTag && styleTag.parentNode) {
        styleTag.parentNode.removeChild(styleTag);
      }
    };
  }, []);

  // Add custom button after component mounts
  useEffect(() => {
    if (customButtonCreated.current) return;
    
    const createCustomButton = () => {
      // Create our custom button wrapper
      const customButtonWrapper = document.createElement('div');
      customButtonWrapper.className = 'custom-whatsapp-button-wrapper';
      customButtonWrapper.style.cssText = `
        display: flex;
        align-items: center;
        background-color: white;
        color: #25D366;
        border-radius: 50px;
        padding: 12px 20px; /* Increased vertical padding */
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        cursor: pointer;
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        animation: pulse 2s infinite;
      `;
      
      // Add hover effect
      customButtonWrapper.addEventListener('mouseover', () => {
        customButtonWrapper.style.animation = 'none';
        customButtonWrapper.style.transform = 'scale(1.1)';
        customButtonWrapper.style.boxShadow = '0 8px 20px rgba(37, 211, 102, 0.4)';
        customButtonWrapper.style.backgroundColor = '#f8fff9';
      });
      
      customButtonWrapper.addEventListener('mouseout', () => {
        customButtonWrapper.style.transform = 'scale(1)';
        customButtonWrapper.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        customButtonWrapper.style.backgroundColor = 'white';
        customButtonWrapper.style.animation = 'pulse 2s infinite';
      });
      
      // Add active/click effect
      customButtonWrapper.addEventListener('mousedown', () => {
        customButtonWrapper.style.transform = 'scale(0.95)';
        customButtonWrapper.style.boxShadow = '0 2px 8px rgba(37, 211, 102, 0.3)';
      });
      
      customButtonWrapper.addEventListener('mouseup', () => {
        customButtonWrapper.style.transform = 'scale(1.1)';
        customButtonWrapper.style.boxShadow = '0 8px 20px rgba(37, 211, 102, 0.4)';
      });
      
      // Add click handler to open the chat
      customButtonWrapper.addEventListener('click', () => {
        const defaultButton = document.querySelector('.floating-whatsapp-button');
        if (defaultButton) {
          defaultButton.click();
        }
      });
      
      // Create text container element (for vertical stacking)
      const textContainer = document.createElement('div');
      textContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        margin-right: 8px;
        line-height: 1.2;
      `;

      // Create first line text element
      const firstLineText = document.createElement('span');
      firstLineText.textContent = 'Questions?';
      firstLineText.style.cssText = `
        font-weight: 600;
        font-size: 14px;
        color: #333;
      `;

      // Create second line text element
      const secondLineText = document.createElement('span');
      secondLineText.textContent = 'Chat with Us!';
      secondLineText.style.cssText = `
        font-weight: 600;
        font-size: 14px;
        color: #333;
      `;

      // Add both text lines to the container
      textContainer.appendChild(firstLineText);
      textContainer.appendChild(secondLineText);
      
      // Create WhatsApp icon
      const whatsappIcon = document.createElement('div');
      whatsappIcon.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      `;
      
      // Add a small bounce animation to the icon
      whatsappIcon.style.animation = 'bounce 2s ease infinite';
      
      // Add elements to wrapper
      customButtonWrapper.appendChild(textContainer);
      customButtonWrapper.appendChild(whatsappIcon);
      
      // Add to document
      document.body.appendChild(customButtonWrapper);
      
      // Add an initial attention-grabbing animation after 3 seconds
      setTimeout(() => {
        customButtonWrapper.style.animation = 'none';
        customButtonWrapper.style.transform = 'scale(1.2)';
        customButtonWrapper.style.boxShadow = '0 10px 25px rgba(37, 211, 102, 0.5)';
        
        setTimeout(() => {
          customButtonWrapper.style.transform = 'scale(1)';
          customButtonWrapper.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          customButtonWrapper.style.animation = 'pulse 2s infinite';
        }, 500);
      }, 3000);
      
      customButtonCreated.current = true;
      
      return customButtonWrapper;
    };    
    // Create the button immediately
    const customButton = createCustomButton();
    
    // Cleanup on unmount
    return () => {
      if (customButton && customButton.parentNode) {
        customButton.parentNode.removeChild(customButton);
      }
      customButtonCreated.current = false;
    };
  }, []);

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
