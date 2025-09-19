// Import Blocks
import Block3dSvg from '#assets/block/3d.svg'
import BlockBlockSvg from '#assets/block/block.svg'
import BlockChromeSvg from '#assets/block/chrome.svg'
import BlockGridSvg from '#assets/block/grid.svg'
import BlockHugeSvg from '#assets/block/huge.svg'
import BlockPalletSvg from '#assets/block/pallet.svg'
import BlockShadeSvg from '#assets/block/shade.svg'
import BlockSimple3dSvg from '#assets/block/simple3d.svg'
import BlockSimpleSvg from '#assets/block/simple.svg'
import BlockSimpleBlockSvg from '#assets/block/simpleBlock.svg'
import BlockSlickSvg from '#assets/block/slick.svg'
import BlockTinySvg from '#assets/block/tiny.svg'
// Imports de los SVGs
import CoralSvg from '#assets/pallete/omlg-coral.svg'
import DawnSvg from '#assets/pallete/omlg-dawn.svg'
import FireSvg from '#assets/pallete/omlg-fire.svg'
import ForestSvg from '#assets/pallete/omlg-forest.svg'
import GoldSvg from '#assets/pallete/omlg-gold.svg'
import GradBlueSvg from '#assets/pallete/omlg-grad-blue.svg'
import MatrixSvg from '#assets/pallete/omlg-matrix.svg'
import MintSvg from '#assets/pallete/omlg-mint.svg'
import MonoSvg from '#assets/pallete/omlg-mono.svg'
import NebulaSvg from '#assets/pallete/omlg-nebula.svg'
import OceanSvg from '#assets/pallete/omlg-ocean.svg'
import PurpleSvg from '#assets/pallete/omlg-purple.svg'
import SunsetSvg from '#assets/pallete/omlg-sunset.svg'

export const OMLG_BLOCKS = [
  { name: 'block', img: BlockBlockSvg.src },
  { name: 'tiny', img: BlockTinySvg.src },
  { name: 'shade', img: BlockShadeSvg.src },
  { name: 'grid', img: BlockGridSvg.src },
  { name: 'chrome', img: BlockChromeSvg.src },
  { name: 'pallet', img: BlockPalletSvg.src },
  { name: 'huge', img: BlockHugeSvg.src },
  { name: 'slick', img: BlockSlickSvg.src },
  { name: 'simple', img: BlockSimpleSvg.src },
  { name: 'simpleBlock', img: BlockSimpleBlockSvg.src },
  { name: 'simple3d', img: BlockSimple3dSvg.src },
  { name: '3d', img: Block3dSvg.src },
] as const

export type OmlgBlockNames = (typeof OMLG_BLOCKS)[number]['name']

export const OMLG_PALLETE = [
  {
    name: 'ocean',
    gradient: ['#667eea', '#764ba2'],
    img: OceanSvg.src,
  },
  {
    name: 'grad-blue',
    gradient: ['#4ea8ff', '#7f88ff'],
    img: GradBlueSvg.src,
  },
  {
    name: 'sunset',
    gradient: ['#ff9966', '#ff5e62', '#ffa34e'],
    img: SunsetSvg.src,
  },
  {
    name: 'dawn',
    gradient: ['#00c6ff', '#0072ff'],
    img: DawnSvg.src,
  },
  {
    name: 'nebula',
    gradient: ['#654ea3', '#eaafc8'],
    img: NebulaSvg.src,
  },
  {
    name: 'mono',
    gradient: ['#f07178', '#f07178'],
    img: MonoSvg.src,
  },
  {
    name: 'fire',
    gradient: ['#ff0844', '#ffb199'],
    img: FireSvg.src,
  },
  {
    name: 'forest',
    gradient: ['#134e5e', '#71b280'],
    img: ForestSvg.src,
  },
  {
    name: 'gold',
    gradient: ['#f7971e', '#ffd200'],
    img: GoldSvg.src,
  },
  {
    name: 'purple',
    gradient: ['#667db6', '#0082c8', '#0078ff'],
    img: PurpleSvg.src,
  },
  {
    name: 'mint',
    gradient: ['#00d2ff', '#3a7bd5'],
    img: MintSvg.src,
  },
  {
    name: 'coral',
    gradient: ['#ff9a9e', '#fecfef'],
    img: CoralSvg.src,
  },
  {
    name: 'matrix',
    gradient: ['#00ff41', '#008f11'],
    img: MatrixSvg.src,
  },
] as const

export type OmlgPaletteName = (typeof OMLG_PALLETE)[number]['name']
export type OmlgPaletteITem = (typeof OMLG_PALLETE)[number]
