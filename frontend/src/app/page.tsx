import { Health_panel } from '@/features/home/components/health_panel';
import { Home_hero } from '@/features/home/components/home_hero';

export default function Home_page() {
  return (
    <div className="space-y-8">
      <Home_hero />
      <Health_panel />
    </div>
  );
}
