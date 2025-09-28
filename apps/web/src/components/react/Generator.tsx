import { useEffect, useRef, useState } from 'preact/hooks'

import SvgLogoText from '#assets/logo-text.svg'
import SvgLogoFilled from '#assets/logo.svg'
import {
  OMLG_BLOCKS,
  OMLG_PALLETE,
  type OmlgBlockNames,
  type OmlgPaletteITem,
  type OmlgPaletteName,
} from '#utils/omlgPallete.js'

import OmlgService, {
  type GradientDirection,
} from '../../js/services/omlg.service'
import Slider from './generator/Slider'
import SvgFromApi from './utils/SvgFromApi'

/**
 * Oh my logo generator
 *
 * @returns generator
 */
export default function Generator() {
  const [text, setText] = useState('')
  const [letterSpacing, setLetterSpacing] = useState('1')
  const [svg, setSvg] = useState('')
  const [palette, setPalette] = useState<OmlgPaletteName>(OMLG_PALLETE[0].name)
  const [filled, setFilled] = useState(true)
  const [reverseGradient, setReverseGradient] = useState(false)
  const [blockFont, setBlockFont] = useState<OmlgBlockNames>(
    OMLG_BLOCKS[0].name,
  )
  const [isLoading, setIsLoading] = useState(false)
  const filename = useRef('')

  const gradientDirectionValues: GradientDirection[] = [
    'vertical',
    'horizontal',
    'diagonal',
  ]
  const [gradientDirection, setGradientDirection] = useState<GradientDirection>(
    gradientDirectionValues[0],
  )

  useEffect(() => {
    if (text) {
      submit()
    }
  }, [
    letterSpacing,
    gradientDirection,
    palette,
    filled,
    reverseGradient,
    blockFont,
  ])

  /** Send data to API and render image */
  async function submit() {
    // TODO: Add error message
    setIsLoading(true)
    try {
      const response = await OmlgService.getSvg({
        text,
        palette,
        filled,
        letter_spacing: Number(letterSpacing),
        gradien_direction: gradientDirection,
        reverse_gradient: reverseGradient,
        block_font: blockFont,
      })
      setSvg(response.data)
      filename.current = `${text.replace('.', '')}_${palette}`
      console.log('filename = ', filename)
    } catch (error) {}
    setIsLoading(false)
  }

  /**
   * Set palette to variable
   *
   * @param palette - Palette name
   */
  function selectPalette(palette: OmlgPaletteITem) {
    setPalette(palette.name)
  }

  function downloadImage(
    svgString: string,
    fileName = 'image',
    format: 'svg' | 'png' = 'svg',
    minWidth = 800,
  ) {
    if (format === 'svg') {
      const blob = new Blob([svgString], {
        type: 'image/svg+xml;charset=utf-8',
      })
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `${fileName}.svg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      URL.revokeObjectURL(url)
    } else if (format === 'png') {
      const img = new Image()
      const svgBlob = new Blob([svgString], {
        type: 'image/svg+xml;charset=utf-8',
      })
      const url = URL.createObjectURL(svgBlob)

      img.onload = () => {
        let width = img.width
        let height = img.height

        // Scale keeping aspect ratio if less than minimum width
        if (width < minWidth) {
          const scale = minWidth / width
          width = minWidth
          height = height * scale
        }

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        canvas.width = width
        canvas.height = height

        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height)

          canvas.toBlob(blob => {
            if (blob) {
              const pngUrl = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = pngUrl
              a.download = `${fileName}.png`
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)

              URL.revokeObjectURL(pngUrl)
            }
          })

          URL.revokeObjectURL(url)
        }
      }

      img.src = url
    } else {
      console.error("Format not supported. Use 'svg' or 'png'.")
    }
  }

  return (
    <section className="pt-5 pb-8">
      <div className="container">
        <div className="card bg-gray">
          <div className="card-body">
            {/* <!-- PALLETE SLIDER --> */}
            <div className="pb-5">
              <div className="is-text-center is-font-bold mb-3">
                Choose your palette
              </div>
              <Slider onSelectPalette={selectPalette} />
            </div>

            {/* <!-- CARD OPTIONS --> */}
            <div className="generator-container">
              <div className="card is-outlined generator__mode section--mode">
                <div className="card-body">
                  {/* <!-- MODE --> */}
                  <div className="is-flex is-flex-column is-gap-3">
                    <div className="is-font-bold">Mode:</div>
                    <div className="is-flex is-gap-4">
                      <button
                        className={`card is-outlined card-omlg card-omlg--mode ${filled ? 'is-active' : ''}`}
                        onClick={() => setFilled(true)}
                      >
                        <figure className="image">
                          <img src={SvgLogoFilled.src} alt="OMLG logo" />
                        </figure>
                      </button>
                      <button
                        className={`card is-outlined card-omlg card-omlg--mode ${!filled ? 'is-active' : ''}`}
                        onClick={() => setFilled(false)}
                      >
                        <figure className="image">
                          <img src={SvgLogoText.src} alt="OMLG logo" />
                        </figure>
                      </button>
                    </div>
                  </div>

                  {/* <!-- BLOCK FONT --> */}
                  <div className="is-flex is-flex-column is-gap-3 mt-3">
                    <div className="is-font-bold">Block font:</div>
                    <div
                      className="is-flex is-flex-wrap is-gap-3"
                      style={{ overflowY: 'auto', maxHeight: '340px' }}
                    >
                      {OMLG_BLOCKS.map((item, index) => (
                        <button
                          key={index}
                          className={`card is-outlined card-omlg card-omlg--block card-omlg--block--${item.name} ${blockFont === item.name ? 'is-active' : ''}`}
                          onClick={() => setBlockFont(item.name)}
                        >
                          <div className="card-omlg--block__image">
                            <figure className="image">
                              <img src={item.img} alt={item.name} />
                            </figure>
                          </div>

                          <div className="is-text-center is-font-size-7 mt-1">
                            {item.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- PREVIEW --> */}
              <div className="card is-outlined generator__preview is-col-6 section--preview">
                <div className="card-body">
                  <div className="field">
                    <label for="omlg-text" className="label">
                      Enter your text:
                    </label>
                    <textarea
                      id="omlg-text"
                      className="textarea"
                      placeholder="Enter your text"
                      rows={2}
                      value={text}
                      onChange={e => setText(e.currentTarget.value || '')}
                    />
                  </div>
                  <button className="btn w-100 mt-2" onClick={submit}>
                    Generate
                  </button>

                  {/* <!-- PREVIEW IMAGE --> */}
                  <div class="is-font-bold mt-4">Preview:</div>
                  <div className="omlg-preview my-5">
                    <figure className="image w-100 py-4 px-3">
                      {svg ? (
                        <SvgFromApi svgString={svg} />
                      ) : (
                        <img
                          className="py-3"
                          src={SvgLogoFilled.src}
                          style={{ opacity: 0.2 }}
                        />
                      )}
                    </figure>
                    {isLoading ? (
                      <div className="loader-content">
                        <div className="loader" />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  {/* <!-- DOWNLOAD --> */}
                  <div class="is-font-bold mb-1">Download:</div>
                  <div className="is-hstack">
                    <button
                      disabled={!svg || isLoading}
                      onClick={() => downloadImage(svg, filename.current)}
                      className="btn w-100 is-outlined"
                    >
                      SVG
                    </button>
                    <button
                      disabled={!svg || isLoading}
                      onClick={() =>
                        downloadImage(svg, filename.current, 'png')
                      }
                      className="btn w-100 is-outlined"
                    >
                      PNG
                    </button>
                    {/* <button className="btn w-100 is-outlined" disabled> */}
                    {/*   URL */}
                    {/* </button> */}
                  </div>
                </div>
              </div>
              {/* <!-- OTHER OPTIONS --> */}
              <div className="card is-outlined generator__other-options section--options">
                <div className="card-body">
                  <div className="card-title">Other options</div>

                  <div className="card-content is-flex is-flex-column is-gap-3">
                    {/* <!-- LETTER SPACING --> */}
                    <div className="field">
                      <label htmlFor="letter-spacing" className="label">
                        Letter spacing:
                      </label>
                      <select
                        id="letter-spacing"
                        className="select"
                        value={letterSpacing}
                        onChange={e => setLetterSpacing(e.currentTarget.value)}
                      >
                        {[...new Array(8)].map((_i, index) => (
                          <option value={`${index}`} key={index}>
                            {index}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* <!-- GRADIENT DIRECTION --> */}
                    <div className="field">
                      <label htmlFor="gradient-direction" className="label">
                        Gradient direction:
                      </label>
                      <select
                        id="gradient-direction"
                        className="select"
                        value={gradientDirection}
                        onChange={e =>
                          setGradientDirection(
                            e.currentTarget.value as GradientDirection,
                          )
                        }
                      >
                        {gradientDirectionValues.map((v, index) => (
                          <option value={v} key={index}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="is-hstack mt-2">
                      <div className="field switch">
                        <input
                          type="checkbox"
                          role="switch"
                          id="reverse-gradient"
                          checked={reverseGradient}
                          onChange={() => setReverseGradient(prev => !prev)}
                        />
                        <label className="slider" htmlFor="reverse-gradient" />
                      </div>
                      <label htmlFor="reverse-gradient">Reverse gradient</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
