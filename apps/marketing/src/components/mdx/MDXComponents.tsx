import React from "react";

type MDXProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

function Anchor(
  props: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) {
  return (
    <a
      {...props}
      className={[
        "text-accent-600 hover:text-accent-700 underline-offset-4",
        "decoration-accent-300 hover:decoration-accent-500",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

function H1(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  return (
    <h1
      {...props}
      className={[
        "text-4xl md:text-5xl font-bold tracking-tight text-brand-900 mb-8",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

function H2(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  return (
    <h2
      {...props}
      className={[
        "text-3xl md:text-4xl font-semibold tracking-tight text-brand-900 mt-12 mb-6",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

function H3(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  return (
    <h3
      {...props}
      className={[
        "text-2xl md:text-3xl font-semibold text-brand-900 mt-8 mb-4",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

function Paragraph(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >
) {
  return (
    <p
      {...props}
      className={[
        "text-lg leading-relaxed text-surface-700 mb-6",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

function UL(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  >
) {
  return (
    <ul
      {...props}
      className={["list-disc pl-6 my-6", props.className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

function OL(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLOListElement>,
    HTMLOListElement
  >
) {
  return (
    <ol
      {...props}
      className={["list-decimal pl-6 my-6", props.className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

function LI(
  props: React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  >
) {
  return (
    <li
      {...props}
      className={["text-lg text-surface-700 mb-2", props.className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

function InlineCode(
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
) {
  return (
    <code
      {...props}
      className={[
        "text-accent-700 bg-surface-100 px-2 py-1 rounded",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

function Pre(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLPreElement>,
    HTMLPreElement
  >
) {
  return (
    <pre
      {...props}
      className={[
        "bg-surface-100 border border-surface-200 rounded-lg p-4 overflow-x-auto",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

function Blockquote(
  props: React.DetailedHTMLProps<
    React.BlockquoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement
  >
) {
  return (
    <blockquote
      {...props}
      className={[
        "border-l-4 border-accent-300 pl-4 italic text-surface-700 my-6",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

function HR(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHRElement>,
    HTMLHRElement
  >
) {
  return (
    <hr
      {...props}
      className={["my-12 border-surface-200", props.className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

function Img(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) {
  return (
    <img
      {...props}
      className={["rounded-lg border border-surface-200", props.className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export const MDXComponents = {
  a: Anchor,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
  ) => (
    <h4
      {...props}
      className={[
        "text-xl md:text-2xl font-semibold text-brand-900 mt-6 mb-3",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  ),
  h5: (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
  ) => (
    <h5
      {...props}
      className={[
        "text-lg md:text-xl font-medium text-brand-900 mt-4 mb-2",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  ),
  h6: (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
  ) => (
    <h6
      {...props}
      className={[
        "text-base md:text-lg font-medium text-brand-900 mt-3 mb-2",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  ),
  p: Paragraph,
  ul: UL,
  ol: OL,
  li: LI,
  code: InlineCode,
  pre: Pre,
  blockquote: Blockquote,
  hr: HR,
  img: Img,
  table: (
    props: React.DetailedHTMLProps<
      React.TableHTMLAttributes<HTMLTableElement>,
      HTMLTableElement
    >
  ) => (
    <table
      {...props}
      className={[
        "w-full text-left border-collapse my-6",
        "border border-surface-200 rounded-lg overflow-hidden",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  ),
  thead: (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLTableSectionElement>,
      HTMLTableSectionElement
    >
  ) => (
    <thead
      {...props}
      className={["bg-surface-50", props.className].filter(Boolean).join(" ")}
    />
  ),
  th: (
    props: React.DetailedHTMLProps<
      React.ThHTMLAttributes<HTMLTableCellElement>,
      HTMLTableCellElement
    >
  ) => (
    <th
      {...props}
      className={[
        "px-4 py-3 text-sm font-semibold text-brand-900 border-b border-surface-300",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  ),
  td: (
    props: React.DetailedHTMLProps<
      React.TdHTMLAttributes<HTMLTableCellElement>,
      HTMLTableCellElement
    >
  ) => (
    <td
      {...props}
      className={[
        "px-4 py-3 text-sm text-surface-700 border-b border-surface-200 align-top",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  ),
};

export type MDXComponentsType = typeof MDXComponents;
