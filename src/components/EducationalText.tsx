import { Fragment } from 'react';
import { renderToString } from 'katex';

// A small, safe renderer for the headings, lists and emphasis used in our guides.
// Text remains escaped; only KaTeX output with trust disabled becomes HTML.
function math(expression: string, displayMode = false) {
  return <span className={displayMode ? 'block overflow-x-auto py-2' : undefined} dangerouslySetInnerHTML={{ __html: renderToString(expression, { displayMode, output: 'mathml', throwOnError: false, trust: false, maxExpand: 1000 }) }} />;
}
function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`|\$[^$]+\$)/g).map((part, i) =>
    part.startsWith('$') ? <Fragment key={i}>{math(part.slice(1, -1))}</Fragment>
      : part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part.startsWith('`') ? <code key={i}>{part.slice(1, -1)}</code>
      : <Fragment key={i}>{part}</Fragment>);
}

export default function EducationalText({ text }: { text: string }) {
  const blocks: React.ReactNode[] = [];
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    if (line.startsWith('$$') && line.endsWith('$$')) {
      blocks.push(<Fragment key={i}>{math(line.slice(2, -2), true)}</Fragment>);
      continue;
    }
    const heading = line.match(/^#{1,6}\s+(.+)$/);
    if (heading) {
      blocks.push(<h4 key={i} className="font-bold text-base mt-5">{inline(heading[1])}</h4>);
      continue;
    }
    const bullet = line.match(/^[-*]\s+(.+)$/);
    const numbered = line.match(/^\d+\.\s+(.+)$/);
    if (bullet || numbered) {
      const start = i;
      const items = [];
      const pattern = bullet ? /^[-*]\s+(.+)$/ : /^\d+\.\s+(.+)$/;
      while (i < lines.length) {
        const item = lines[i].trim().match(pattern);
        if (!item) break;
        items.push(<li key={i}>{inline(item[1])}</li>);
        i++;
      }
      i--;
      blocks.push(bullet ? <ul key={start} className="list-disc pl-6 space-y-2">{items}</ul>
        : <ol key={start} className="list-decimal pl-6 space-y-2">{items}</ol>);
      continue;
    }
    const start = i;
    const paragraph = [line];
    while (i + 1 < lines.length && lines[i + 1].trim() && !/^(#{1,6}\s|[-*]\s|\d+\.\s|\$\$)/.test(lines[i + 1].trim())) paragraph.push(lines[++i].trim());
    blocks.push(<p key={start}>{inline(paragraph.join(' '))}</p>);
  }
  return <div className="space-y-4 leading-relaxed">{blocks}</div>;
}
