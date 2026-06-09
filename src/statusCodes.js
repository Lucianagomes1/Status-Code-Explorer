export const groups = [
  {
    id: "1xx",
    label: "Informativos"
  },
  {
    id: "2xx",
    label: "Sucesso"
  },
  {
    id: "3xx",
    label: "Redirecionamento"
  },
  {
    id: "4xx",
    label: "Erro do cliente"
  },
  {
    id: "5xx",
    label: "Erro do servidor"
  }
];

export const statusCodes = [
  {
    code: 100,
    group: "1xx",
    title: "Continue",
    category: "Informativo",
    summary: "O servidor recebeu os headers e o cliente pode continuar enviando o corpo.",
    when: "Comum em requests grandes, antes do envio completo do payload.",
    context: "Ajuda a evitar upload desnecessario quando o servidor ja sabe que rejeitaria a requisicao.",
    example: "HTTP/1.1 100 Continue\n\nPUT /videos/demo.mp4"
  },
  {
    code: 101,
    group: "1xx",
    title: "Switching Protocols",
    category: "Mudanca de protocolo",
    summary: "O servidor aceitou trocar o protocolo da conexao.",
    when: "Aparece em upgrade para WebSocket.",
    context: "Usado quando cliente e servidor combinam abandonar HTTP comum e seguir outro protocolo.",
    example: "HTTP/1.1 101 Switching Protocols\nUpgrade: websocket\nConnection: Upgrade"
  },
  {
    code: 200,
    group: "2xx",
    title: "OK",
    category: "Sucesso padrao",
    summary: "A requisicao foi processada com sucesso.",
    when: "GETs, PUTs ou PATCHes que retornam conteudo.",
    context: "E a resposta mais conhecida para operacoes bem-sucedidas.",
    example: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{ "status": "online" }'
  },
  {
    code: 201,
    group: "2xx",
    title: "Created",
    category: "Criacao",
    summary: "Um novo recurso foi criado com sucesso.",
    when: "Depois de POSTs que criam usuarios, pedidos, posts ou arquivos.",
    context: "Normalmente acompanha um header Location apontando para o novo recurso.",
    example: "HTTP/1.1 201 Created\nLocation: /api/users/42"
  },
  {
    code: 204,
    group: "2xx",
    title: "No Content",
    category: "Sucesso sem corpo",
    summary: "A operacao deu certo, mas nao ha conteudo para retornar.",
    when: "DELETEs bem-sucedidos ou updates que nao precisam devolver JSON.",
    context: "Mantem a resposta leve quando a interface so precisa saber que deu certo.",
    example: "HTTP/1.1 204 No Content"
  },
  {
    code: 301,
    group: "3xx",
    title: "Moved Permanently",
    category: "Redirect permanente",
    summary: "O recurso mudou definitivamente para outra URL.",
    when: "Migracao de rotas, mudanca de dominio ou ajustes de SEO.",
    context: "Browsers e buscadores passam a preferir a nova URL.",
    example: "HTTP/1.1 301 Moved Permanently\nLocation: https://example.com/new-page"
  },
  {
    code: 302,
    group: "3xx",
    title: "Found",
    category: "Redirect temporario",
    summary: "O recurso esta temporariamente em outra URL.",
    when: "Fluxos de login, campanhas, testes A/B e paginas temporarias.",
    context: "Indica que a URL original ainda deve continuar sendo considerada valida.",
    example: "HTTP/1.1 302 Found\nLocation: /login?next=/dashboard"
  },
  {
    code: 304,
    group: "3xx",
    title: "Not Modified",
    category: "Cache",
    summary: "O recurso nao mudou desde a ultima versao em cache.",
    when: "Quando o browser valida ETag ou Last-Modified.",
    context: "Economiza banda e acelera carregamentos sem reenviar o mesmo conteudo.",
    example: "HTTP/1.1 304 Not Modified\nETag: \"ui-v18\""
  },
  {
    code: 400,
    group: "4xx",
    title: "Bad Request",
    category: "Requisicao invalida",
    summary: "O servidor nao conseguiu entender ou validar a requisicao.",
    when: "JSON malformado, parametros invalidos ou payload incompleto.",
    context: "Bom para erros genericos de entrada antes de regras de negocio especificas.",
    example: 'HTTP/1.1 400 Bad Request\n\n{ "error": "invalid_payload" }'
  },
  {
    code: 401,
    group: "4xx",
    title: "Unauthorized",
    category: "Autenticacao",
    summary: "A requisicao precisa de autenticacao valida.",
    when: "Token ausente, expirado ou invalido.",
    context: "Apesar do nome, fala mais de login/autenticacao do que permissao.",
    example: "HTTP/1.1 401 Unauthorized\nWWW-Authenticate: Bearer"
  },
  {
    code: 403,
    group: "4xx",
    title: "Forbidden",
    category: "Permissao",
    summary: "O servidor entendeu a requisicao, mas recusou o acesso.",
    when: "Usuario autenticado tentando acessar area sem permissao.",
    context: "Use quando a identidade existe, mas o recurso nao pode ser liberado.",
    example: 'HTTP/1.1 403 Forbidden\n\n{ "error": "insufficient_scope" }'
  },
  {
    code: 404,
    group: "4xx",
    title: "Not Found",
    category: "Nao encontrado",
    summary: "O recurso solicitado nao foi encontrado.",
    when: "Rotas inexistentes, ids apagados ou slugs incorretos.",
    context: "Tambem pode ser usado para nao revelar se um recurso protegido existe.",
    example: 'HTTP/1.1 404 Not Found\n\n{ "message": "Projeto nao encontrado" }'
  },
  {
    code: 409,
    group: "4xx",
    title: "Conflict",
    category: "Conflito",
    summary: "A requisicao conflita com o estado atual do recurso.",
    when: "E-mail duplicado, versao antiga de documento ou corrida de atualizacao.",
    context: "Muito util para APIs que precisam explicar conflito de estado.",
    example: 'HTTP/1.1 409 Conflict\n\n{ "field": "email", "reason": "already_exists" }'
  },
  {
    code: 422,
    group: "4xx",
    title: "Unprocessable Content",
    category: "Validacao",
    summary: "A sintaxe esta correta, mas as regras de validacao falharam.",
    when: "Formulario com campos validos em formato, mas invalidos para a regra.",
    context: "Diferencia problema semantico de erro bruto de payload.",
    example: 'HTTP/1.1 422 Unprocessable Content\n\n{ "password": "too_short" }'
  },
  {
    code: 429,
    group: "4xx",
    title: "Too Many Requests",
    category: "Rate limit",
    summary: "O cliente excedeu o limite de requisicoes permitido.",
    when: "APIs publicas, login, webhooks e protecao anti-abuso.",
    context: "Normalmente vem com Retry-After para orientar quando tentar novamente.",
    example: "HTTP/1.1 429 Too Many Requests\nRetry-After: 60"
  },
  {
    code: 500,
    group: "5xx",
    title: "Internal Server Error",
    category: "Erro inesperado",
    summary: "O servidor encontrou uma falha inesperada.",
    when: "Excecoes nao tratadas, bugs ou falhas de integracao.",
    context: "E um fallback; em producao, evite expor detalhes internos.",
    example: 'HTTP/1.1 500 Internal Server Error\n\n{ "error": "unexpected_error" }'
  },
  {
    code: 502,
    group: "5xx",
    title: "Bad Gateway",
    category: "Gateway",
    summary: "Um servidor intermediario recebeu resposta invalida de outro servidor.",
    when: "Proxy, CDN ou gateway falando com um upstream com problema.",
    context: "Ajuda a separar erro da aplicacao de erro na camada de gateway.",
    example: "HTTP/1.1 502 Bad Gateway"
  },
  {
    code: 503,
    group: "5xx",
    title: "Service Unavailable",
    category: "Indisponibilidade",
    summary: "O servico esta temporariamente indisponivel.",
    when: "Manutencao, overload, filas cheias ou dependencia fora do ar.",
    context: "Pode incluir Retry-After para indicar quando tentar novamente.",
    example: "HTTP/1.1 503 Service Unavailable\nRetry-After: 120"
  },
  {
    code: 504,
    group: "5xx",
    title: "Gateway Timeout",
    category: "Timeout",
    summary: "Um gateway esperou demais por resposta de outro servidor.",
    when: "Consultas lentas, APIs externas demoradas ou rede instavel.",
    context: "Sinaliza que a cadeia de servicos nao respondeu a tempo.",
    example: "HTTP/1.1 504 Gateway Timeout"
  }
];
