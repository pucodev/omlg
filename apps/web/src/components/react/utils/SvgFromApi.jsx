import DOMPurify from 'isomorphic-dompurify'
import { useEffect, useRef } from 'preact/hooks'

/**
 * SvgFromApi is a React functional component that renders an SVG string inside a Shadow DOM.
 * It sanitizes the provided SVG string using DOMPurify before injection to prevent XSS attacks.
 * The SVG is styled to take full width and a maximum height within the Shadow DOM.
 *
 * @param {object} props - The props for the SvgFromApi component.
 * @param {string} props.svgString - The SVG string content to be rendered. This string will be sanitized and injected into a Shadow DOM.
 * @returns {JSX.Element} A div element that acts as the host for the Shadow DOM containing the SVG.
 */
export default function SvgFromApi({ svgString }) {
  const hostRef = useRef(null)

  useEffect(() => {
    if (hostRef.current) {
      // create the shadow root only once
      if (!hostRef.current.shadowRoot) {
        hostRef.current.attachShadow({ mode: 'open' })
      }

      // sanitize the SVG
      const cleanSvg = DOMPurify.sanitize(svgString, {
        USE_PROFILES: { svg: true },
      })

      // inject inside the Shadow DOM
      hostRef.current.shadowRoot.innerHTML = `
      <style>
        svg {
          width: 100%;
          max-height: 200px;
        }
      </style>
      ${cleanSvg}`
    }
  }, [svgString])

  return <div className="shadow-svg" ref={hostRef} />
}
