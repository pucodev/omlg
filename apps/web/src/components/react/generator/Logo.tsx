/**
 * Props for the Logo component.
 */
export interface LogoProps {
  /** Image source URL for the logo. */
  src: string
}

/**
 * Renders the project logo.
 *
 * @param props - The component props.
 * @returns The rendered image element.
 */
export default function Logo({ src }: { src: string }) {
  return (
    <figure className="image">
      <img src={src} alt="OMLG logo" />
    </figure>
  )
}
