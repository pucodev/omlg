import Glide from '@glidejs/glide'
import { useEffect, useRef, useState } from 'preact/hooks'

import { OMLG_PALLETE, type OmlgPaletteITem } from '#utils/omlgPallete'

import Logo from './Logo'

export interface SliderProps {
  onSelectPalette: (item: OmlgPaletteITem) => void
}

/**
 * Render slider to select Palette
 *
 * @param props - Props
 * @returns - Slider
 */
export default function Slider({ onSelectPalette }: SliderProps) {
  const sliderRef = useRef(null)
  const glideRef = useRef<Glide>(null)
  const items = OMLG_PALLETE
  const [selectedItem, setSelectedItem] = useState(0)
  console.log('RENDER SLIDER')

  /**
   * Handle select palette
   *
   * @param index - index of OmlPalette
   */
  function selectPalette(index: number) {
    setSelectedItem(index)

    if (typeof onSelectPalette === 'function') {
      onSelectPalette(items[index])
    }
  }

  /**
   * Go to previous palette item
   */
  function previous() {
    if (glideRef.current && glideRef.current.go) {
      glideRef.current.go('<')
    }
  }

  /**
   * Go to next palette item
   */
  function next() {
    if (glideRef.current && glideRef.current.go) {
      glideRef.current.go('>')
    }
  }

  useEffect(() => {
    if (sliderRef.current) {
      glideRef.current = new Glide(sliderRef.current, {
        type: 'slider',
        rewind: false,
        startAt: 0,
        perView: 5.5,
      })

      glideRef.current.mount()
      console.log('RENDER USEEFFECT')

      return () => glideRef.current?.destroy()
    }
  }, [])

  return (
    <div className="is-hstack mx-auto" style={{ width: '80%' }}>
      <button class="btn is-ghost btn-slider" onClick={previous}>
        <iconify-icon class="icon" icon="solar:alt-arrow-left-outline" />
      </button>

      <div className="glide slider-content" ref={sliderRef}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {items.map((item, index) => (
              <li
                className={`glide__slide card-pallete-slider ${index === selectedItem ? 'is-active' : ''}`}
                key={index}
              >
                <div
                  className={`w-100 card is-outlined card-omlg ${index === selectedItem ? 'is-active' : ''}`}
                  onClick={() => selectPalette(index)}
                >
                  <Logo src={item.img} />
                </div>
                <div className="is-text-center pallete-name mt-1 is-font-size-7">
                  {item.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button class="btn is-ghost btn-slider" onClick={next}>
        <iconify-icon class="icon" icon="solar:alt-arrow-right-outline" />
      </button>
    </div>
  )
}
