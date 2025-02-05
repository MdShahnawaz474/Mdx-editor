import { marked, MarkedOptions } from "marked";
import { useEffect, useState } from "react";
import hljs from "highlight.js";
import 'highlight.js/styles/github-dark.css'; // Use a built-in theme
import DOMPurify from "dompurify";

interface PreviewProps {
  markdown: string;
}

interface CustomMarkedOptions extends MarkedOptions {
  highlight?: (code: string, lang: string) => string;
}

// Allow 'class' attribute for syntax highlighting
// DOMPurify.addHook('afterSanitizeAttributes', function (node) {
//   if (node.tagName === 'CODE' || node.tagName === 'PRE') {
//     node.setAttribute('class', node.getAttribute('class') || '');
//   }
// });

function Preview({ markdown }: PreviewProps) {
  const [parsed, setParsed] = useState<string>("");

  marked.setOptions({
    highlight: function (code: string, lang: string) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-', // Fix typo here
  } as CustomMarkedOptions);

  useEffect(() => {
    async function parseMarkdown() {
      const html = await marked.parse(markdown); // Wait for Promise resolution
      const sanitized = DOMPurify.sanitize(html);
    // console.log(sanitized); 
    setParsed(sanitized);
    

    }

    parseMarkdown();
  }, [markdown]);
  

  return (
    <div className="">
      <div className="w-full bg-gray-900 uppercase p-3 text-gray-400 tracking-wider">
        Preview
      </div>
      <div
        className="prose prose-invert h-screen p-6 prose-a:text-blue-500"
        dangerouslySetInnerHTML={{ __html: parsed }}
      />
    </div>
  );
}

export default Preview;