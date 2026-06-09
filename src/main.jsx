import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Code2,
  Compass,
  Copy,
  Database,
  ExternalLink,
  Filter,
  Info,
  Layers3,
  Link2,
  Search,
  ServerCrash,
  Zap
} from "lucide-react";
import { statusCodes, groups } from "./statusCodes";
import "./styles.css";

const iconMap = {
  "1xx": Info,
  "2xx": CheckCircle2,
  "3xx": Compass,
  "4xx": AlertTriangle,
  "5xx": ServerCrash
};

const visualStories = [
  {
    group: "1xx",
    code: "100",
    title: "Sinal recebido",
    text: "A conexao ainda esta em andamento. O servidor confirma o primeiro contato e deixa o cliente seguir.",
    path: "M12 48 C 58 16, 86 82, 132 38"
  },
  {
    group: "2xx",
    code: "200",
    title: "Fluxo aprovado",
    text: "A rota responde como esperado, os dados chegam limpos e a interface pode continuar sem atrito.",
    path: "M10 62 C 42 60, 52 26, 80 28 C 106 30, 104 64, 136 58"
  },
  {
    group: "3xx",
    code: "301",
    title: "Nova direcao",
    text: "A requisicao encontra outro caminho. O navegador segue a trilha e chega ao destino atualizado.",
    path: "M12 72 C 38 22, 70 96, 94 42 C 104 20, 118 26, 136 34"
  },
  {
    group: "4xx",
    code: "404",
    title: "Pedido fora do mapa",
    text: "O cliente pediu algo que nao esta disponivel, esta protegido ou nao bate com as regras da API.",
    path: "M12 36 C 38 70, 58 16, 82 54 C 104 90, 118 40, 136 70"
  },
  {
    group: "5xx",
    code: "503",
    title: "Servidor em turbulencia",
    text: "O problema esta do outro lado da ponte: overload, manutencao ou alguma dependencia falhando.",
    path: "M12 66 C 42 18, 54 84, 78 42 C 96 12, 118 78, 136 28"
  }
];

function App() {
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState("all");
  const [selectedCode, setSelectedCode] = useState(statusCodes.find((item) => item.code === 200));
  const [copied, setCopied] = useState(false);

  const filteredCodes = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return statusCodes.filter((item) => {
      const matchesGroup = activeGroup === "all" || item.group === activeGroup;
      const searchable = `${item.code} ${item.title} ${item.summary} ${item.category} ${item.when}`.toLowerCase();
      return matchesGroup && (!normalized || searchable.includes(normalized));
    });
  }, [activeGroup, query]);

  const stats = useMemo(
    () =>
      groups.map((group) => ({
        ...group,
        total: statusCodes.filter((item) => item.group === group.id).length
      })),
    []
  );

  function copyExample() {
    navigator.clipboard?.writeText(selectedCode.example).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    });
  }

  return (
    <main className="app-shell">
      <section className="hero-section">
        <img className="hero-image" src="/assets/status-code-hero.png" alt="" />
        <div className="hero-overlay" />
        <nav className="topbar" aria-label="Navegacao principal">
          <a className="brand" href="#top" aria-label="Status Code Explorer">
            <span className="brand-mark">
              <Code2 size={21} />
            </span>
            <span>Status Code Explorer</span>
          </a>
          <div className="topbar-actions">
            <a className="icon-link" href="#explorer" aria-label="Explorar status">
              <Search size={18} />
            </a>
            <a className="icon-link" href="#stories" aria-label="Ver historias visuais">
              <BookOpen size={18} />
            </a>
          </div>
        </nav>

        <div id="top" className="hero-content">
          <p className="eyebrow">
            <Zap size={16} />
            Dev tool para consultas rapidas
          </p>
          <h1>Status Code Explorer</h1>
          <p className="hero-copy">
            Busque codigos HTTP por numero, significado, categoria ou contexto e veja exemplos praticos
            para usar em APIs, front-end e debugging.
          </p>

          <div className="search-panel" id="explorer">
            <label className="search-box">
              <Search size={21} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar 404, cache, sucesso, redirect..."
                aria-label="Buscar codigo HTTP"
              />
            </label>
            <div className="pulse-line" aria-hidden="true">
              {stats.map((group) => (
                <span key={group.id} className={`pulse-dot group-${group.id}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="workspace" aria-label="Explorador de codigos HTTP">
        <aside className="filters-panel">
          <div className="panel-heading">
            <Filter size={18} />
            <span>Categorias</span>
          </div>
          <button
            className={`filter-chip ${activeGroup === "all" ? "active" : ""}`}
            onClick={() => setActiveGroup("all")}
          >
            <Layers3 size={17} />
            <span>Todos</span>
            <strong>{statusCodes.length}</strong>
          </button>
          {stats.map((group) => {
            const Icon = iconMap[group.id];
            return (
              <button
                key={group.id}
                className={`filter-chip group-${group.id} ${activeGroup === group.id ? "active" : ""}`}
                onClick={() => setActiveGroup(group.id)}
              >
                <Icon size={17} />
                <span>{group.label}</span>
                <strong>{group.total}</strong>
              </button>
            );
          })}
        </aside>

        <section className="results-panel">
          <div className="section-title">
            <div>
              <p>{filteredCodes.length} resultados</p>
              <h2>Codigos encontrados</h2>
            </div>
            <span className="live-pill">
              <span />
              HTTP reference
            </span>
          </div>

          <div className="code-grid">
            {filteredCodes.map((item) => (
              <button
                key={item.code}
                className={`code-card group-${item.group} ${selectedCode.code === item.code ? "selected" : ""}`}
                onClick={() => setSelectedCode(item)}
              >
                <span className="code-number">{item.code}</span>
                <span className="code-title">{item.title}</span>
                <span className="code-summary">{item.summary}</span>
                <span className="code-category">{item.category}</span>
              </button>
            ))}
          </div>
        </section>

        <aside className={`detail-panel group-${selectedCode.group}`}>
          <div className="detail-top">
            <span className="status-badge">{selectedCode.group}</span>
            <span>{selectedCode.category}</span>
          </div>
          <div className="detail-code">
            <span>{selectedCode.code}</span>
            <h2>{selectedCode.title}</h2>
          </div>
          <p className="detail-summary">{selectedCode.summary}</p>

          <div className="context-list">
            <div>
              <Database size={18} />
              <p>
                <strong>Quando aparece</strong>
                {selectedCode.when}
              </p>
            </div>
            <div>
              <Link2 size={18} />
              <p>
                <strong>Contexto de uso</strong>
                {selectedCode.context}
              </p>
            </div>
          </div>

          <div className="example-box">
            <div className="example-header">
              <span>Exemplo</span>
              <button onClick={copyExample} aria-label="Copiar exemplo">
                <Copy size={16} />
                {copied ? "Copiado" : "Copiar"}
              </button>
            </div>
            <pre>{selectedCode.example}</pre>
          </div>

          <a
            className="docs-link"
            href={`https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status/${selectedCode.code}`}
            target="_blank"
            rel="noreferrer"
          >
            Abrir referencia MDN
            <ExternalLink size={16} />
          </a>
        </aside>
      </section>

      <section className="stories-section" id="stories">
        <div className="section-title">
          <div>
            <p>Historias visuais</p>
            <h2>Entenda cada familia em segundos</h2>
          </div>
        </div>
        <div className="story-grid">
          {visualStories.map((story) => {
            const Icon = iconMap[story.group];
            return (
              <article className={`story-card group-${story.group}`} key={story.group}>
                <div className="story-visual" aria-hidden="true">
                  <span className="story-code">{story.code}</span>
                  <svg viewBox="0 0 148 104" role="img">
                    <path d={story.path} />
                  </svg>
                  <span className="story-node story-node-a" />
                  <span className="story-node story-node-b" />
                  <span className="story-node story-node-c" />
                </div>
                <div className="story-copy">
                  <span className="story-family">
                    <Icon size={17} />
                    {story.group}
                  </span>
                  <h3>{story.title}</h3>
                  <p>{story.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
