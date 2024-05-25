// https://codesandbox.io/p/sandbox/react-markdown-katex-latex-mathjax-forked-8cpjtt?file=%2Fsrc%2FMarkDown.js%3A1%2C1-1%2C44
import React from 'react'
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import styles from './ReactMarkdownMathjax.module.scss'

function ReactMarkdownMath(props) {
  const newProps = {
      ...props,
      remarkPlugins: [remarkMath, [remarkGfm, { singleTilde: false }]],
      rehypePlugins: [rehypeKatex],
      components: {
        math: ({ value }) => <BlockMath>{value}</BlockMath>,
        inlineMath: ({ value }) => <InlineMath>{value}</InlineMath>
      }
    }
    return (
      <ReactMarkdown {...newProps} />
    )
}

export default ReactMarkdownMath
