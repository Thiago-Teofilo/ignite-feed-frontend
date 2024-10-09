import DOMPurify from 'dompurify';

// Configurando DOMPurify para permitir apenas tags e atributos seguros
const sanitizerConfig = {
  ALLOWED_TAGS: ['a', 'p'], // Permite apenas links e parágrafos
  ALLOWED_ATTR: ['href', 'target', 'rel'], // Permite apenas atributos seguros em links
};

export function formatToContent(text: string) {
    // Regex para detectar URLs e hashtags
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const hashtagRegex = /#[a-zA-Z0-9_]+/g;

    // Quebra o texto em parágrafos
    const paragraphs = text.split(/\n+/).filter(Boolean);

    // Transforma cada parágrafo em HTML
    const formattedContent = paragraphs.map((paragraph) => {
        let content = paragraph;

        // Transformar URLs em links clicáveis
        content = content.replace(urlRegex, (url) => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
        });

        // Transformar hashtags em links clicáveis
        content = content.replace(hashtagRegex, (hashtag) => {
            const tag = hashtag.replace('#', '');
            return `<a href="https://twitter.com/hashtag/${tag}" target="_blank" rel="noopener noreferrer">${hashtag}</a>`;
        });

        // Envolver o conteúdo do parágrafo em <p>
        return `<p>${content}</p>`;
    });

    // Junta todos os parágrafos em uma única string de HTML
    const htmlContent = formattedContent.join('');

    // Sanitiza o HTML gerado usando a configuração específica
    return DOMPurify.sanitize(htmlContent, sanitizerConfig);
}
