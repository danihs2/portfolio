import type { ReactNode } from "react";

type MarkdownContentProps = {
  content: string;
};

function safeHref(value: string) {
  const href = value.trim();
  if (
    href.startsWith("/") ||
    href.startsWith("#") ||
    href.startsWith("https://") ||
    href.startsWith("http://") ||
    href.startsWith("mailto:")
  ) {
    return href;
  }

  return "#";
}

function renderInline(value: string, keyPrefix: string): ReactNode[] {
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = pattern.exec(value)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(value.slice(lastIndex, match.index));
    }

    const key = `${keyPrefix}-${index}`;
    if (match[2] && match[3]) {
      nodes.push(
        <a
          key={key}
          href={safeHref(match[3])}
          className="font-black underline underline-offset-4"
          target={match[3].startsWith("http") ? "_blank" : undefined}
          rel={match[3].startsWith("http") ? "noreferrer noopener" : undefined}
        >
          {renderInline(match[2], `${key}-link`)}
        </a>,
      );
    } else if (match[4]) {
      nodes.push(
        <strong key={key} className="font-black">
          {renderInline(match[4], `${key}-strong`)}
        </strong>,
      );
    } else if (match[5]) {
      nodes.push(
        <em key={key} className="italic">
          {renderInline(match[5], `${key}-em`)}
        </em>,
      );
    } else if (match[6]) {
      nodes.push(
        <code
          key={key}
          className="border-2 border-black bg-muted px-1 py-0.5 font-mono text-sm"
        >
          {match[6]}
        </code>,
      );
    }

    lastIndex = pattern.lastIndex;
    index += 1;
  }

  if (lastIndex < value.length) {
    nodes.push(value.slice(lastIndex));
  }

  return nodes;
}

function collectList(
  lines: string[],
  startIndex: number,
  ordered: boolean,
): { node: ReactNode; nextIndex: number } {
  const items: ReactNode[] = [];
  let index = startIndex;
  const matcher = ordered ? /^\d+\.\s+(.+)$/ : /^[-*]\s+(.+)$/;

  while (index < lines.length) {
    const match = lines[index]?.match(matcher);
    if (!match) {
      break;
    }

    items.push(
      <li key={`li-${index}`} className="pl-1">
        {renderInline(match[1], `li-${index}`)}
      </li>,
    );
    index += 1;
  }

  const className = ordered
    ? "ml-6 list-decimal space-y-2"
    : "ml-6 list-disc space-y-2";

  return {
    node: ordered ? (
      <ol key={`ol-${startIndex}`} className={className}>
        {items}
      </ol>
    ) : (
      <ul key={`ul-${startIndex}`} className={className}>
        {items}
      </ul>
    ),
    nextIndex: index,
  };
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const nodes: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index] ?? "";
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      nodes.push(<hr key={`hr-${index}`} className="border-2 border-black" />);
      index += 1;
      continue;
    }

    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const text = renderInline(heading[2], `heading-${index}`);
      if (heading[1].length === 1) {
        nodes.push(
          <h2 key={`h1-${index}`} className="font-display text-3xl uppercase">
            {text}
          </h2>,
        );
      } else if (heading[1].length === 2) {
        nodes.push(
          <h3 key={`h2-${index}`} className="font-display text-2xl uppercase">
            {text}
          </h3>,
        );
      } else {
        nodes.push(
          <h4 key={`h3-${index}`} className="font-display text-xl uppercase">
            {text}
          </h4>,
        );
      }
      index += 1;
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const list = collectList(lines, index, false);
      nodes.push(list.node);
      index = list.nextIndex;
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const list = collectList(lines, index, true);
      nodes.push(list.node);
      index = list.nextIndex;
      continue;
    }

    if (trimmed.startsWith("> ")) {
      nodes.push(
        <blockquote
          key={`quote-${index}`}
          className="border-l-4 border-black bg-muted px-4 py-3 font-black"
        >
          {renderInline(trimmed.slice(2), `quote-${index}`)}
        </blockquote>,
      );
      index += 1;
      continue;
    }

    const paragraphLines = [trimmed];
    index += 1;
    while (index < lines.length) {
      const next = lines[index]?.trim() ?? "";
      if (
        !next ||
        /^(#{1,3})\s+/.test(next) ||
        /^[-*]\s+/.test(next) ||
        /^\d+\.\s+/.test(next) ||
        next.startsWith("> ") ||
        /^---+$/.test(next)
      ) {
        break;
      }
      paragraphLines.push(next);
      index += 1;
    }

    nodes.push(
      <p key={`p-${index}`} className="leading-relaxed">
        {renderInline(paragraphLines.join(" "), `p-${index}`)}
      </p>,
    );
  }

  if (nodes.length === 0) {
    return <p className="font-medium text-muted-foreground">No content yet.</p>;
  }

  return <div className="space-y-5 font-medium leading-relaxed">{nodes}</div>;
}
