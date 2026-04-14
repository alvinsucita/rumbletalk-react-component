import React, { useEffect, useEffectEvent, useState } from 'react';

declare global {
  interface Window {
    rumbletalk?: any;
  }
}

interface RumbleTalk {
  rumbleChatHash: string;
}

const API_URL: string =
  'YOUR_RUMBLETALK_CHAT_HASH_HERE';

const RumbleChat: React.FC = () => {
  const [loaded, setLoaded] = useState<RumbleTalk | null>(null);

  useEffect(() => {
    if (!loaded) {
      const fetchAndInitialize = async () => {
        try {
          const response = await fetch(API_URL);
          const data: RumbleTalk = await response.json();

          if (data.rumbleChatHash) {
            console.log('Fetched RumbleTalk hash');
            setLoaded(data);
          }
        } catch (err) {
          console.error('Failed to get RumbleTalk hash');
        }
      };

      fetchAndInitialize();
    }

    if (loaded) {
      const loadRumbleChat = () => {
        const script = document.createElement('script');
        script.id = 'rumbletalk-script';
        script.src = `https://rumbletalk.com/client/?${loaded.rumbleChatHash}`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          console.log('[RumbleChat] Script loaded successfully');
        };

        script.onerror = () => {
          console.error(
            '[RumbleChat] Failed to load RumbleTalk script from:',
            script.src
          );
          console.error(
            '[RumbleChat] Verify your hash is correct:',
            loaded.rumbleChatHash
          );
        };
        document.body.appendChild(script);
      };
      setTimeout(loadRumbleChat, 100);
    }
  }, [loaded]);

  return (
    <div
      id='YOUR_CHAT_ID'
      className='rumbletalk-container'
      data-floating='true'
      data-side='left'
      data-width='700'
      data-height='500'
      data-image='YOUR_DEFAULT_IMAGE_URL'
      data-close-image='YOUR_CLOSE_CHAT_URL'
      data-mobile-fullscreen='true'
      data-user-counter='35,12.5'
      data-user-counter-width='75'
      data-user-counter-color='#fff'
      data-message-counter='0,70'
    ></div>
  );
};

export default RumbleChat;