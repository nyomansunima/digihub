import { FC } from 'react'

interface DynamicLogoProps {
  height?: number
  widhth?: number
}

/**
 * ## DynamicLogo
 *
 * Renders a dynamic logo SVG component.
 *
 * @return {ReactElement} The rendered dynamic logo SVG component.
 */
const DynamicLogo: FC<DynamicLogoProps> = ({ height = 40, widhth = 40 }) => {
  return (
    <svg
      width={widhth}
      height={height}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="207.721"
        y="40.2212"
        width="175.818"
        height="159.031"
        rx="69.6483"
        transform="rotate(90.2 207.721 40.2212)"
        stroke="black"
        strokeWidth="16.5"
      />
      <mask
        id="mask0_2_4814"
        maskUnits="userSpaceOnUse"
        x="40"
        y="59"
        width="176"
        height="166"
      >
        <rect
          x="215.902"
          y="60.2124"
          width="164.106"
          height="175.531"
          rx="82.0529"
          transform="rotate(90.2 215.902 60.2124)"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_2_4814)">
        <path
          d="M90.0751 209.993C79.2669 191.253 92.7984 167.841 114.432 167.851L142.399 167.863C164.033 167.873 177.543 191.298 166.718 210.028L152.723 234.242C141.898 252.973 114.856 252.96 104.048 234.22L90.0751 209.993Z"
          stroke="black"
          strokeWidth="16.5"
        />
      </g>
      <circle
        cx="148.141"
        cy="134.726"
        r="10.9058"
        transform="rotate(90.2 148.141 134.726)"
        fill="black"
      />
      <circle
        cx="147.944"
        cy="100.944"
        r="10.9058"
        transform="rotate(90.2 147.944 100.944)"
        fill="black"
      />
    </svg>
  )
}

export default DynamicLogo
