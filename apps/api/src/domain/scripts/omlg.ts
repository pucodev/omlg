import { spawn } from 'child_process'

import { applog } from '#utils/logger'
import { sanitizeAndMakeResponsiveSvg } from '#utils/sanitize-svg'

const palletes = [
  {
    name: 'grad-blue',
    gradient: ['#4ea8ff', '#7f88ff'],
  },
  {
    name: 'sunset',
    gradient: ['#ff9966', '#ff5e62', '#ffa34e'],
  },
  {
    name: 'dawn',
    gradient: ['#00c6ff', '#0072ff'],
  },
  {
    name: 'nebula',
    gradient: ['#654ea3', '#eaafc8'],
  },
  {
    name: 'mono',
    gradient: ['#f07178', '#f07178'],
  },
  {
    name: 'ocean',
    gradient: ['#667eea', '#764ba2'],
  },
  {
    name: 'fire',
    gradient: ['#ff0844', '#ffb199'],
  },
  {
    name: 'forest',
    gradient: ['#134e5e', '#71b280'],
  },
  {
    name: 'gold',
    gradient: ['#f7971e', '#ffd200'],
  },
  {
    name: 'purple',
    gradient: ['#667db6', '#0082c8', '#0078ff'],
  },
  {
    name: 'mint',
    gradient: ['#00d2ff', '#3a7bd5'],
  },
  {
    name: 'coral',
    gradient: ['#ff9a9e', '#fecfef'],
  },
  {
    name: 'matrix',
    gradient: ['#00ff41', '#008f11'],
  },
]

export interface OmlOptions {
  filled?: boolean
  gradienDirection?: 'vertical' | 'horizontal' | 'diagonal'
  blockFont?: string
  letterSpacing?: number
  reverseGradient?: boolean
}

export async function generateSvg(
  text: string,
  palette: string,
  options: OmlOptions,
) {
  return new Promise((resolve, reject) => {
    const omlOptions: string[] = []

    // Filled
    if (options.filled) {
      omlOptions.push('--filled')
    }

    // Gradien direction
    if (options.gradienDirection) {
      omlOptions.push(`-d ${options.gradienDirection}`)
    }

    // Letter spacing
    if (typeof options.letterSpacing !== 'undefined') {
      omlOptions.push(`--letter-spacing ${options.letterSpacing}`)
    }

    // Block font
    if (options.blockFont) {
      omlOptions.push(`--block-font ${options.blockFont}`)
    }

    // Reverse gradient
    if (options.reverseGradient) {
      omlOptions.push('--reverse-gradient')
    }

    // Palette
    omlOptions.push(palette)

    const child = spawn(
      'bash',
      [
        '-c',
        `oh-my-logo "${text}" --color ${omlOptions.join(' ')} | ansisvg --transparent --grid`,
      ],
      { stdio: ['ignore', 'pipe', 'pipe'] },
    )

    let output = ''

    // Capture stdout in streaming
    child.stdout.on('data', chunk => {
      output += chunk.toString()
    })

    // Manage errors
    child.stderr.on('data', data => {
      applog.error('⚠️ Stderr:', data.toString())
      reject(data.toString())
    })

    child.on('close', code => {
      if (code !== 0) {
        applog.error(`❌ Process finished with code ${code}`)
        reject(code)
        return
      }

      resolve(sanitizeAndMakeResponsiveSvg(output))
    })
  })
}
