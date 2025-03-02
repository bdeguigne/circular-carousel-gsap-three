import React from "react";

export default function CurvedText({ text, fontSize = 12 }) {
  return (
    // Svg d'une simple courbe génerée avec Figma (100x100)
    <svg
      viewBox="0 0 100 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      {/* Le <defs> permets de masquer la courbe */}
      <defs>
        <path
          id="circlePath"
          d="M-8.43914e-07 10.4999C38.3657 -2.45859 60.2008 -2.28276 100 10.4999"
          stroke="none"
        />
      </defs>

      <text
        id="text"
        fontFamily="Satoshi"
        fontSize={fontSize}
        fontWeight="bold"
        fill="black"
      >
        {/* C'est là que la magie opère, on créee un text avec le href lié au <path>, le texte suivra cette courbe */}
        <textPath
          id="textPath"
          href="#circlePath"
          startOffset="50%"
          textAnchor="middle"
        >
          {text}
        </textPath>
      </text>
    </svg>
  );
}
