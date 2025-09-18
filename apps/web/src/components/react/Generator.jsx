import { useEffect, useState } from 'preact/hooks'

import OmlgService from '../../js/services/omlg.service'
import Logo from './generator/Logo'
import Slider from './generator/Slider'
import SvgFromApi from './utils/SvgFromApi'

export default function Generator() {
  const [text, setText] = useState('')
  const [letterSpacing, setLetterSpacing] = useState('1')
  const [svg, setSvg] = useState('')

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
      palette: 'sunset',
    })
    console.log('response', response.data)
    setSvg(response.data)
  }

  return (
    <section className="pt-5 pb-8">
      <div className="container">
        <div className="card bg-gray">
          <div className="card-body">
            {/* <!-- PALLETE SLIDER --> */}
            <div className="pb-5">
              <Slider />
            </div>

            {/* <!-- CARD OPTIONS --> */}
            <div className="generator-container">
              <div className="card is-outlined generator__mode">
                <div className="card-body">
                  {/* <!-- MODE --> */}
                  <div className="is-flex is-flex-column is-gap-3">
                    <div className="is-font-bold">Mode:</div>
                    <div className="is-flex is-gap-4">
                      <div className="card is-outlined card--omlg-preview">
                        <div className="card-body">
                          <Logo />
                        </div>
                      </div>
                      <div className="card is-outlined card--omlg-preview">
                        <div className="card-body">
                          <Logo />
                        </div>
                      </div>
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
                    {/* <img src={logo.src} alt="OMLG logo" /> */}
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
                        {[...new Array(5)].map((_i, index) => (
                          <option value={`${index + 1}`} key={index}>
                            {index + 1}
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
