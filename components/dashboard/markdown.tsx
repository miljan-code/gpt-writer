import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownProps {
  source: string;
}

export const Markdown = ({ source }: MarkdownProps) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ ...props }) => (
          <h1 className="text-lg font-heading text-foreground" {...props} />
        ),
        h2: ({ ...props }) => (
          <h1
            className="font-heading tracking-wide text-foreground"
            {...props}
          />
        ),
        p: ({ ...props }) => <p className="text-accent" {...props} />,
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              style={atomDark}
              language={match[1]}
              PreTag="div"
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      }}
      className="flex flex-col gap-3"
    >
      {source}
    </ReactMarkdown>
  );
};
