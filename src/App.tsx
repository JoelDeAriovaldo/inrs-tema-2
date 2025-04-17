import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Home,
  Menu,
  X,
} from "lucide-react";

// Definição dos tipos
type SlideContent = {
  title: string;
  subtitle?: string;
  content: (string | BulletPoint)[];
  emoji?: string;
};

type BulletPoint = {
  text: string;
  subPoints?: string[];
  emoji?: string;
};

// Dados dos slides
const slideData: SlideContent[] = [
  {
    title: "APLICAÇÕES TELEMÁTICAS E SEGURANÇA",
    subtitle: "Integração de Redes e Serviços",
    content: [""],
    emoji: "🌐",
  },
  {
    title: "OBJETIVOS",
    content: [
      { text: "Compreender o conceito de aplicações telemáticas", emoji: "🧠" },
      {
        text: "Explorar aplicações telemáticas tradicionais e emergentes",
        emoji: "🔍",
      },
      {
        text: "Aprender a configurar diferentes tipos de aplicações telemáticas",
        emoji: "⚙️",
      },
      {
        text: "Entender fundamentos de segurança em redes informáticas",
        emoji: "🔒",
      },
      {
        text: "Reconhecer a importância da segurança em ambientes de rede",
        emoji: "🛡️",
      },
    ],
  },
  {
    title: "O QUE SÃO APLICAÇÕES TELEMÁTICAS?",
    content: [
      {
        text: "Definição: Aplicações que combinam telecomunicações e informática",
        emoji: "📱💻",
      },
      {
        text: "Características:",
        subPoints: [
          "Transmissão de informação à distância",
          "Processamento automático de dados",
          "Integração de diferentes tecnologias",
        ],
        emoji: "✨",
      },
      {
        text: "Importância: Fundamentais para a sociedade da informação moderna",
        emoji: "🌍",
      },
    ],
  },
  {
    title: "APLICAÇÕES TELEMÁTICAS TRADICIONAIS",
    content: [
      {
        text: "Correio Eletrônico (E-mail)",
        subPoints: [
          "Protocolos: SMTP, POP3, IMAP",
          "Configuração de servidor SMTP e porta",
          "Configuração de servidor de recepção (POP3/IMAP)",
          "Segurança na autenticação",
        ],
        emoji: "📧",
      },
      {
        text: "File Transfer Protocol (FTP)",
        subPoints: [
          "Características: Transferência de arquivos entre sistemas",
          "Modos: Ativo e Passivo",
          "Definição de portas",
          "Permissões de usuários",
          "Diretórios virtuais",
        ],
        emoji: "📁",
      },
      {
        text: "Telnet e SSH",
        subPoints: [
          "Telnet: Acesso remoto (texto plano - inseguro)",
          "SSH: Acesso remoto seguro",
          "Geração de chaves públicas/privadas",
          "Autenticação por senha vs. chaves",
          "Túneis SSH",
        ],
        emoji: "🖥️",
      },
    ],
  },
  {
    title: "APLICAÇÕES MULTIMÍDIA",
    content: [
      {
        text: "Streaming de Áudio e Vídeo",
        subPoints: [
          "Protocolos: RTSP, RTP, RTMP",
          "Requisitos de rede: Largura de banda, Latência, Jitter",
        ],
        emoji: "🎬",
      },
      {
        text: "VoIP (Voz sobre IP)",
        subPoints: [
          "Protocolos: SIP, H.323",
          "Infraestrutura: Servidores SIP, Gateways VoIP, Terminais/Softphones",
          "Qualidade de Serviço (QoS)",
        ],
        emoji: "📞",
      },
      {
        text: "Videoconferência",
        subPoints: [
          "Tecnologias: WebRTC, plataformas dedicadas",
          "Requisitos técnicos: Largura de banda simétrica, Priorização de tráfego, Configuração de firewall",
        ],
        emoji: "📹",
      },
    ],
  },
  {
    title: "NOVAS APLICAÇÕES TELEMÁTICAS",
    content: [
      {
        text: "Internet das Coisas (IoT)",
        subPoints: [
          "Características: Dispositivos conectados, Comunicação M2M, Sensores e atuadores",
          "Protocolos: MQTT, CoAP, AMQP",
          "Desafios: Segurança, energia, escalabilidade",
        ],
        emoji: "🔌",
      },
      {
        text: "Aplicações em Nuvem (Cloud)",
        subPoints: [
          "Modelos de serviço: SaaS, PaaS, IaaS",
          "Benefícios: Elasticidade, Redundância, Acessibilidade",
          "Integrações: APIs e webhooks",
        ],
        emoji: "☁️",
      },
      {
        text: "Blockchain e Aplicações Distribuídas",
        subPoints: [
          "Características: Descentralização, Imutabilidade, Consenso distribuído",
          "Casos de uso: Contratos inteligentes, registros digitais",
        ],
        emoji: "🔗",
      },
    ],
  },
  {
    title: "CONCEITOS BÁSICOS DE SEGURANÇA EM REDES",
    content: [
      {
        text: "Princípios Fundamentais",
        subPoints: [
          "Confidencialidade: Proteção contra acesso não autorizado",
          "Integridade: Garantia de dados não alterados",
          "Disponibilidade: Sistemas acessíveis quando necessário",
          "Autenticidade: Verificação de identidade",
          "Não-repúdio: Impossibilidade de negar ações realizadas",
        ],
        emoji: "🔐",
      },
      {
        text: "Tipos de Ameaças",
        subPoints: [
          "Malware: Vírus, worms, trojans, ransomware",
          "Ataques de Rede: DoS/DDoS, man-in-the-middle, sniffing",
          "Engenharia Social: Phishing, pretexting, baiting",
          "Ameaças Internas: Colaboradores mal-intencionados",
        ],
        emoji: "⚠️",
      },
    ],
  },
  {
    title: "SEGURANÇA EM SISTEMAS VIRTUALIZADOS E CLOUD",
    content: [
      {
        text: "Desafios de Segurança",
        subPoints: [
          "Multilocação (Multi-tenancy): Isolamento entre inquilinos",
          "Hipervisor: Segurança da camada de virtualização",
          "Migração de VMs: Proteção durante transferências",
          "Controle de acesso: IAM (Identity and Access Management)",
        ],
        emoji: "🔍",
      },
      {
        text: "Melhores Práticas",
        subPoints: [
          "Segmentação de rede: Microsegmentação",
          "Criptografia de dados: Em repouso e em trânsito",
          "Monitoramento contínuo: Detecção de anomalias",
          "Automação de segurança: Security as Code",
        ],
        emoji: "✅",
      },
    ],
  },
  {
    title: "INCIDENTES E RESPOSTA A DESASTRES EM REDES",
    content: [
      {
        text: "Plano de Resposta a Incidentes",
        subPoints: [
          "Fases: Preparação, Detecção e Análise, Contenção, Erradicação, Recuperação, Lições Aprendidas",
        ],
        emoji: "🚨",
      },
      {
        text: "Plano de Continuidade de Negócios (BCP)",
        subPoints: [
          "Componentes: Análise de impacto, Estratégias de recuperação, Plano de comunicação, Testes periódicos",
        ],
        emoji: "📊",
      },
      {
        text: "Ferramentas e Técnicas",
        subPoints: [
          "SIEM (Security Information and Event Management)",
          "IDS/IPS (Intrusion Detection/Prevention Systems)",
          "Forense digital: Investigação pós-incidente",
        ],
        emoji: "🔧",
      },
    ],
  },
  {
    title: "ENCRIPTAÇÃO E AUTENTICAÇÃO",
    content: [
      {
        text: "Fundamentos de Criptografia",
        subPoints: [
          "Criptografia Simétrica: Algoritmos AES, 3DES; Chave única para cifrar e decifrar",
          "Criptografia Assimétrica: Algoritmos RSA, ECC; Par de chaves: pública e privada",
          "Funções Hash: SHA-256, MD5 (obsoleto)",
        ],
        emoji: "🔑",
      },
      {
        text: "Sistemas de Autenticação",
        subPoints: [
          "Fatores de Autenticação: Conhecimento (senha), Posse (token), Inerência (biometria)",
          "MFA/2FA: Autenticação multi-fator",
          "SSO: Single Sign-On",
        ],
        emoji: "👤",
      },
    ],
  },
  {
    title: "SEGURANÇA EM COMUNICAÇÃO",
    content: [
      {
        text: "Protocolos Seguros",
        subPoints: [
          "TLS/SSL: Handshake e estabelecimento de sessão, Certificados digitais, Versões e vulnerabilidades",
          "HTTPS: Web segura",
          "SFTP/FTPS: Transferência segura de arquivos",
          "S/MIME: E-mail seguro",
        ],
        emoji: "🔒",
      },
      {
        text: "Segurança de Rede Física",
        subPoints: [
          "Segurança de Portas: 802.1X",
          "Segurança Wi-Fi: WPA3, autenticação empresarial",
          "Segmentação de Rede: VLANs, zonas desmilitarizadas (DMZ)",
        ],
        emoji: "📡",
      },
    ],
  },
  {
    title: "REDES PRIVADAS VIRTUAIS (VPNs)",
    content: [
      {
        text: "Tipos de VPNs",
        subPoints: [
          "Site-to-Site: Interconexão de redes",
          "Remote Access: Acesso remoto individual",
          "VPNs baseadas em SSL: Acesso via navegador",
        ],
        emoji: "🔗",
      },
      {
        text: "Protocolos VPN",
        subPoints: [
          "IPsec: Segurança na camada 3 (rede)",
          "OpenVPN: Solução de código aberto",
          "WireGuard: Nova geração, alta performance",
        ],
        emoji: "📋",
      },
      {
        text: "Configuração de VPN",
        subPoints: [
          "Autenticação: Certificados, senhas, tokens",
          "Túneis e Encapsulamento: Modo de transporte vs. túnel",
          "Split Tunneling: Roteamento seletivo de tráfego",
        ],
        emoji: "⚙️",
      },
    ],
  },
  {
    title: "PRÁTICA: CONFIGURANDO SEGURANÇA",
    content: [
      {
        text: "Demonstração 1: Configuração de Firewall",
        subPoints: [
          "Definição de regras de acesso",
          "Filtragem de pacotes",
          "NAT e Port Forwarding",
        ],
        emoji: "🛡️",
      },
      {
        text: "Demonstração 2: Implementação de VPN",
        subPoints: [
          "Instalação e configuração de servidor VPN",
          "Criação de certificados",
          "Teste de conexão cliente",
        ],
        emoji: "🔌",
      },
      {
        text: "Laboratório: Detecção de Vulnerabilidades",
        subPoints: [
          "Uso de ferramentas de escaneamento",
          "Identificação de riscos",
          "Implementação de correções",
        ],
        emoji: "🔍",
      },
    ],
  },
  {
    title: "AVALIAÇÃO E PRÓXIMOS PASSOS",
    content: [
      {
        text: "Recursos Adicionais",
        subPoints: [
          "Documentação técnica",
          "Cursos especializados",
          "Ferramentas recomendadas",
        ],
        emoji: "📚",
      },
      {
        text: "Tendências Futuras",
        subPoints: [
          "Zero Trust Security",
          "DevSecOps",
          "Segurança para Edge Computing",
          "IA aplicada à segurança",
        ],
        emoji: "🚀",
      },
    ],
  },
  {
    title: "OBRIGADO!",
    subtitle: "Perguntas?",
    content: [""],
    emoji: "🙏",
  },
];

// Componente principal
const PresentationApp = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [slideIn, setSlideIn] = useState(true);
  const [direction, setDirection] = useState("right");

  // Handle fullscreen functionality
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error(
            `Error attempting to enable fullscreen: ${err.message}`
          );
        });
    } else {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => {
            setIsFullscreen(false);
          })
          .catch((err) => {
            console.error(
              `Error attempting to exit fullscreen: ${err.message}`
            );
          });
      }
    }
  }, []);

  // Navigation functions
  const goToSlide = useCallback(
    (slideIndex: number) => {
      if (slideIndex < 0 || slideIndex >= slideData.length) return;

      setSlideIn(false);
      setDirection(slideIndex > currentSlide ? "right" : "left");

      setTimeout(() => {
        setCurrentSlide(slideIndex);
        setSlideIn(true);
      }, 300);
    },
    [currentSlide]
  );

  const goToNext = useCallback(() => {
    if (currentSlide < slideData.length - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, goToSlide]);

  const goToPrevious = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  const goToHome = useCallback(() => {
    goToSlide(0);
  }, [goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "Home") {
        goToHome();
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNext, goToPrevious, goToHome, toggleFullscreen]);

  // Progress bar calculation
  const progressPercentage = ((currentSlide + 1) / slideData.length) * 100;

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center p-2 bg-blue-950 shadow-md">
        <div className="flex items-center space-x-2">
          <button
            onClick={goToHome}
            className="p-2 rounded-full hover:bg-blue-700 transition-colors"
            aria-label="Início"
          >
            <Home size={20} />
          </button>
          <span className="hidden md:inline text-sm">
            Aplicações Telemáticas e Segurança
          </span>
        </div>

        <div className="flex items-center">
          <div className="hidden md:flex space-x-2 mr-2">
            <button
              onClick={goToPrevious}
              disabled={currentSlide === 0}
              className={`p-2 rounded-full ${
                currentSlide === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              } transition-colors`}
              aria-label="Slide anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm">
              {currentSlide + 1} / {slideData.length}
            </span>
            <button
              onClick={goToNext}
              disabled={currentSlide === slideData.length - 1}
              className={`p-2 rounded-full ${
                currentSlide === slideData.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              } transition-colors`}
              aria-label="Próximo slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full hover:bg-blue-700 transition-colors"
            aria-label="Alternar tela cheia"
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-blue-700 transition-colors"
            aria-label="Menu mobile"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-900 p-4 shadow-lg animate-fade-in">
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={goToPrevious}
              disabled={currentSlide === 0}
              className={`p-2 rounded-full ${
                currentSlide === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              } transition-colors`}
              aria-label="Slide anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <span className="flex items-center">
              {currentSlide + 1} / {slideData.length}
            </span>
            <button
              onClick={goToNext}
              disabled={currentSlide === slideData.length - 1}
              className={`p-2 rounded-full ${
                currentSlide === slideData.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              } transition-colors`}
              aria-label="Próximo slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {slideData.map((slide, index) => (
              <button
                key={index}
                onClick={() => {
                  goToSlide(index);
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2 text-left text-xs truncate rounded ${
                  currentSlide === index ? "bg-blue-600" : "hover:bg-blue-800"
                } transition-colors`}
              >
                {index + 1}. {slide.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="h-1 bg-blue-800">
        <div
          className="h-full bg-blue-400 transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Main Slide Content */}
      <div className="flex-1 flex justify-center items-center p-4 overflow-hidden">
        <div
          className={`w-full max-w-4xl bg-gradient-to-br from-blue-800 to-indigo-800 rounded-lg shadow-2xl p-6 md:p-8 transform transition-all duration-300 ease-in-out ${
            slideIn
              ? "translate-x-0 opacity-100"
              : direction === "right"
              ? "translate-x-full opacity-0"
              : "-translate-x-full opacity-0"
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {slideData[currentSlide].title}
              </h1>
              {slideData[currentSlide].subtitle && (
                <h2 className="text-lg md:text-xl text-blue-200 mb-4">
                  {slideData[currentSlide].subtitle}
                </h2>
              )}
            </div>
            {slideData[currentSlide].emoji && (
              <span className="text-4xl md:text-5xl">
                {slideData[currentSlide].emoji}
              </span>
            )}
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[60vh]">
            {slideData[currentSlide].content.map((item, index) => {
              if (typeof item === "string") {
                return (
                  <p key={index} className="text-lg">
                    {item}
                  </p>
                );
              } else {
                return (
                  <div
                    key={index}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-start space-x-2 mb-2">
                      {item.emoji && (
                        <span className="text-xl">{item.emoji}</span>
                      )}
                      <h3 className="text-lg font-semibold text-blue-200">
                        {item.text}
                      </h3>
                    </div>

                    {item.subPoints && (
                      <ul className="ml-8 space-y-1">
                        {item.subPoints.map((subPoint, subIndex) => (
                          <li
                            key={subIndex}
                            className="list-disc text-sm md:text-base animate-fade-in"
                            style={{
                              animationDelay: `${
                                index * 150 + (subIndex + 1) * 100
                              }ms`,
                            }}
                          >
                            {subPoint}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Controls */}
      <div className="p-4 flex justify-between">
        <button
          onClick={goToPrevious}
          disabled={currentSlide === 0}
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg ${
            currentSlide === 0
              ? "opacity-50 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-600 active:bg-blue-800"
          } transition-colors`}
          aria-label="Slide anterior"
        >
          <ChevronLeft size={16} />
          <span className="hidden md:inline">Anterior</span>
        </button>

        <button
          onClick={goToNext}
          disabled={currentSlide === slideData.length - 1}
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg ${
            currentSlide === slideData.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-600 active:bg-blue-800"
          } transition-colors`}
          aria-label="Próximo slide"
        >
          <span className="hidden md:inline">Próximo</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default PresentationApp;
