import { useEffect, useState } from 'preact/hooks'

import SvgLogoText from '#assets/logo-text.svg'
import SvgLogoFilled from '#assets/logo.svg'
import { OMLG_BLOCKS, OMLG_PALLETE } from '#utils/omlgPallete.js'

import OmlgService from '../../js/services/omlg.service'
import Slider from './generator/Slider'
import SvgFromApi from './utils/SvgFromApi'

export default function Generator() {
  const [text, setText] = useState('')
  const [letterSpacing, setLetterSpacing] = useState('1')
  const [svg, setSvg] = useState('')
  const [palette, setPalette] = useState(OMLG_PALLETE[0].name)
  const [filled, setFilled] = useState(true)
  const [reverseGradient, setReverseGradient] = useState(false)
  const [blockFont, setBlockFont] = useState(OMLG_BLOCKS[0].name)

  const gradientDirectionValues = ['vertical', 'horizontal', 'diagonal']
  const [gradientDirection, setGradientDirection] = useState(
    gradientDirectionValues[0],
  )

  useEffect(() => {
    console.log('UPDATE IMAGE')
  }, [text, letterSpacing, gradientDirection])

  async function submit() {
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
  }

  function selectPalette(palette) {
    setPalette(palette.name)
  }

  return (
    <section className="pt-5 pb-8">
      <div className="container">
        <div className="card bg-gray">
          <div className="card-body">
            {/* <!-- PALLETE SLIDER --> */}
            <div className="pb-5">
              <Slider onSelectPalette={selectPalette} />
            </div>

            {/* <!-- CARD OPTIONS --> */}
            <div className="generator-container">
              <div className="card is-outlined generator__mode">
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
                  <div className="is-flex is-flex-column is-gap-3">
                    <div className="is-font-bold">Mode:</div>
                    <div className="is-flex is-flex-wrap is-gap-3">
                      {OMLG_BLOCKS.map((item, index) => (
                        <button
                          key={index}
                          className={`card is-outlined card-omlg card-omlg--block ${blockFont === item.name ? 'is-active' : ''}`}
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
              <div className="card is-outlined generator__preview">
                <div className="card-body">
                  <div className="field">
                    <label for="omlg-text" className="label">
                      Enter your text:
                    </label>
                    <textarea
                      id="omlg-text"
                      className="textarea"
                      placeholder="Enter your text"
                      rows="2"
                      value={text}
                      onChange={e => setText(e.target.value)}
                    />
                  </div>
                  <button className="btn w-100 mt-2" onClick={submit}>
                    Generate
                  </button>

                  {/* <!-- PREVIEW IMAGE --> */}
                  <figure className="image w-100 py-6">
                    <SvgFromApi svgString={svg} />
                  </figure>

                  {/* <!-- DOWNLOAD --> */}
                  <div className="is-hstack">
                    <button className="btn w-100 is-outlined">SVG</button>
                    <button className="btn w-100 is-outlined">PNG</button>
                    <button className="btn w-100 is-outlined" disabled>
                      URL
                    </button>
                  </div>
                </div>
              </div>
              {/* <!-- OTHER OPTIONS --> */}
              <div className="card is-outlined generator__other-options">
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
                        onChange={e => setLetterSpacing(e.target.value)}
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
                        onChange={e => setGradientDirection(e.target.value)}
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
