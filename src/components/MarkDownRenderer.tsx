import ReactMarkdown from "react-markdown";

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  return <ReactMarkdown>{content}</ReactMarkdown>;
};

export default MarkdownRenderer;
