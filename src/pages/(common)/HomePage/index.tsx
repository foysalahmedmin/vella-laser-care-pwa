import { AffiliateSection } from "@/components/(common)/(home-page)/AffiliatesSection";
import AuthSection from "@/components/(common)/(home-page)/AuthSection";
import DoctorsSection from "@/components/(common)/(home-page)/DoctorsSection";
import FeaturesSection from "@/components/(common)/(home-page)/FeaturesSection";
import ProductsSection from "@/components/(common)/(home-page)/ProductsSection";
import TopServices from "@/components/(common)/(home-page)/ServicesSections";

const HomePage = () => {
  return (
    <main className="space-y-6">
      <AuthSection />
      <FeaturesSection />
      <DoctorsSection />
      <TopServices />
      <ProductsSection />
      <AffiliateSection />
    </main>
  );
};

export default HomePage;
