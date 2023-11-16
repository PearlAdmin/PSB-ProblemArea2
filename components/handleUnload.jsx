import { useEffect } from 'react';

const HandleWindowUnload = () => {
  useEffect(() => {
    const handleUnload = () => {
      // Remove the 'user' cookie by setting its maxAge to a negative value
      document.cookie = 'user=; Max-Age=-1; Path=/;';
    };

    // Attach both beforeunload and unload event listeners
    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('unload', handleUnload);

    // Clean up the event listeners when the component is unmounted
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []); // The empty dependency array ensures the effect runs once when the component mounts

};

export default HandleWindowUnload;
