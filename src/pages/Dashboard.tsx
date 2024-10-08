import { parseCookies } from "nookies";
import React, { useEffect, useRef } from "react";

const Dashboard = () => {
  // Defina o tipo do useRef como HTMLIFrameElement
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const { token: savedToken } = parseCookies();

  useEffect(() => {
    const sendTokenToIframe = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          { token: savedToken }, // Adicione o nome da propriedade 'token' para o postMessage
          "http://localhost:8501" // Troque pelo seu domínio Streamlit
        );
      }
    };

    // Ouve o evento de carregamento do iframe
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener("load", sendTokenToIframe);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", sendTokenToIframe);
      }
    };
  }, [savedToken]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h1>Meu Dashboard React</h1>
      <iframe
        ref={iframeRef}
        src="http://localhost:8501/dashboard" // URL do Streamlit
        width="100%"
        height="100%"
        title="Streamlit Dashboard"
      />
    </div>
  );
};

export default Dashboard;
