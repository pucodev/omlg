import DOMPurify from 'isomorphic-dompurify'
import { JSDOM } from 'jsdom'

/**
 * Options for sanitizing and converting an SVG to be responsive.
 */
export interface SanitizeOptions {
  /**
   * Base font size in pixels, used to convert `em` units.
   *
   * @defaultValue 14
   */
  fontSizePx?: number

  /**
   * Average character width in pixels (`ch` unit), used to convert `ch` units.
   * For monospace fonts like Courier at 14px, 8px is a good approximation.
   *
   * @defaultValue 8
   */
  chWidthPx?: number
}

/**
 * Sanitize and converts an SVG string that uses typographic units (`ch`, `em`)
 * into a responsive SVG with a proper `viewBox` and absolute pixel coordinates.
 *
 * This function:
 * - Sanitizes the SVG using DOMPurify for security.
 * - Converts all `x`, `y`, `cx`, `cy`, etc. attributes from `ch`/`em` to absolute pixel values.
 * - Sets a `viewBox` based on original dimensions converted to pixels.
 * - Removes fixed `width` and `height` attributes for CSS responsiveness.
 *
 * @param svgString - The raw SVG string to process.
 * @param options - Configuration options for unit conversion.
 * @returns A sanitized, responsive-ready SVG string.
 * @throws Error if the SVG root element is not found.
 *
 * @example
 * ```ts
 * const responsiveSvg = sanitizeAndMakeResponsiveSvg(originalSvg, {
 *   fontSizePx: 14,
 *   chWidthPx: 8
 * });
 * ```
 */
export function sanitizeAndMakeResponsiveSvg(
  svgString: string,
  options: SanitizeOptions = {},
): string {
  const { fontSizePx = 14, chWidthPx = 8 } = options

  // ===========================
  // Sanitize SVG to prevent XSS
  // ===========================
  const cleanSvg = DOMPurify.sanitize(svgString, {
    USE_PROFILES: { svg: true },
  })

  // ===========================
  // Create virtual DOM environment using JSDOM
  // ===========================
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    contentType: 'image/svg+xml',
  })
  const parser = new dom.window.DOMParser()
  const serializer = new dom.window.XMLSerializer()

  // ===========================
  // Parse SVG string into DOM
  // ===========================
  const doc = parser.parseFromString(cleanSvg, 'image/svg+xml')
  const svg = doc.querySelector('svg')

  if (!svg) {
    throw new Error('Invalid or missing SVG root element')
  }

  // ===========================
  // Extract original dimensions (e.g., "75ch", "6em")
  // ===========================
  const originalWidthStr = svg.getAttribute('width') || '75'
  const originalHeightStr = svg.getAttribute('height') || '6'

  const originalWidthNum = parseFloat(originalWidthStr)
  const originalHeightNum = parseFloat(originalHeightStr)

  // ===========================
  // Calculate viewBox dimensions in pixels
  // ===========================
  const viewBoxWidth = originalWidthNum * chWidthPx
  const viewBoxHeight = originalHeightNum * fontSizePx

  // ===========================
  // Select all elements that may contain typographic coordinates
  // ===========================
  const elements = doc.querySelectorAll(
    'text, tspan, rect, circle, ellipse, line, polyline, polygon, path',
  )

  // ===========================
  // Convert typographic units to absolute pixel values
  // ===========================
  elements.forEach(el => {
    // Process 'x' attribute
    if (el.hasAttribute('x')) {
      const xVal = el.getAttribute('x')
      if (typeof xVal === 'string') {
        if (xVal.includes('ch')) {
          const num = parseFloat(xVal)
          el.setAttribute('x', (num * chWidthPx).toString())
        } else if (xVal.includes('em')) {
          const num = parseFloat(xVal)
          el.setAttribute('x', (num * fontSizePx).toString())
        }
      }
    }

    // Process 'y' attribute
    if (el.hasAttribute('y')) {
      const yVal = el.getAttribute('y')
      if (typeof yVal === 'string') {
        if (yVal.includes('em')) {
          const num = parseFloat(yVal)
          el.setAttribute('y', (num * fontSizePx).toString())
        } else if (yVal.includes('ch')) {
          const num = parseFloat(yVal)
          el.setAttribute('y', (num * chWidthPx).toString())
        }
      }
    }

    // Process common geometric attributes
    const attrsToProcess = ['cx', 'cy', 'r', 'width', 'height', 'dx', 'dy']
    attrsToProcess.forEach(attr => {
      if (el.hasAttribute(attr)) {
        const val = el.getAttribute(attr)
        if (typeof val === 'string') {
          if (val.includes('em')) {
            const num = parseFloat(val)
            el.setAttribute(attr, (num * fontSizePx).toString())
          } else if (val.includes('ch')) {
            const num = parseFloat(val)
            el.setAttribute(attr, (num * chWidthPx).toString())
          }
        }
      }
    })
  })

  // ===========================
  // Set viewBox and remove fixed dimensions
  // ===========================
  svg.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`)
  svg.removeAttribute('width')
  svg.removeAttribute('height')

  // ===========================
  // Serialize back to string
  // ===========================
  return serializer.serializeToString(svg)
}
