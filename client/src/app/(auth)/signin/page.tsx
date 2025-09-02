// app/signup/page.tsx
import Providers from "../Providers";
import Auth from "../authProvider";

export default function Page() {
  return (
    <Providers>
      <Auth />
    </Providers>
  );
}
