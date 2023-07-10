import ReactMarkdown from 'react-markdown';

interface MarkdownProps {
  source: string;
}

export const Markdown = ({ source }: MarkdownProps) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ ...props }) => <h1 className="text-xl" {...props} />,
      }}
      className="flex flex-col gap-3"
    >
      {source}
    </ReactMarkdown>
  );
};
