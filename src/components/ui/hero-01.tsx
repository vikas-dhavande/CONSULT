import HeroSection from "@/components/ui/hero-01-utils/hero";
import type { NavigationSection } from "@/components/ui/hero-01-utils/header";
import Header from "@/components/ui/hero-01-utils/header";
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

export const defaultNavigationData: NavigationSection[] = [
  {
    title: "Home",
    href: "#",
    isActive: true,
  },
  {
    title: "About us",
    href: "#",
  },
  {
    title: "Services",
    href: "#",
  },
  {
    title: "Team",
    href: "#",
  },
  {
    title: "Pricing",
    href: "#",
  },
  {
    title: "Awards",
    href: "#",
  },
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
  navigationData = defaultNavigationData,
  brandList = defaultBrandList,
}: {
  avatarList?: AvatarList[];
  navigationData?: NavigationSection[];
  brandList?: BrandList[];
} = {}) {
  return (
    <div className="relative">
      <Header navigationData={navigationData} />
      <main>
        <HeroSection avatarList={avatarList} />
        <BrandSlider brandList={brandList} />
      </main>
    </div>
  );
}

export { HeroSection, BrandSlider };
