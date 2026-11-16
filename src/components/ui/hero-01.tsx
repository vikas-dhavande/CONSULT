import HeroSection from "@/components/ui/hero-01-utils/hero";
import BrandSlider, {
  BrandList,
} from "@/components/ui/hero-01-utils/brand-slider";
import type { AvatarList } from "@/components/ui/hero-01-utils/hero";

export const defaultAvatarList: AvatarList[] = [
  { name: "Vikas" },
  { name: "Sarah" },
  { name: "Alexander" },
  { name: "Elena" },
];

export const defaultBrandList: BrandList[] = [
  {
    image: "/brands/brand-1.svg",
    lightimg: "/brands/brand-1-light.svg",
    name: "Brand 1",
  },
  {
    image: "/brands/brand-2.svg",
    lightimg: "/brands/brand-2-light.svg",
    name: "Brand 2",
  },
  {
    image: "/brands/brand-3.svg",
    lightimg: "/brands/brand-3-light.svg",
    name: "Brand 3",
  },
  {
    image: "/brands/brand-4.svg",
    lightimg: "/brands/brand-4-light.svg",
    name: "Brand 4",
  },
  {
    image: "/brands/brand-5.svg",
    lightimg: "/brands/brand-5-light.svg",
    name: "Brand 5",
  },
];

export default function AgencyHeroSection({
  avatarList = defaultAvatarList,
  brandList = defaultBrandList,
}: {
  avatarList?: AvatarList[];
  brandList?: BrandList[];
} = {}) {
  return (
    <div className="relative">
      <HeroSection avatarList={avatarList} />
      <BrandSlider brandList={brandList} />
    </div>
  );
}

export { HeroSection, BrandSlider };
