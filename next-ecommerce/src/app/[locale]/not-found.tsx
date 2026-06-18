import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-8xl font-bold text-muted-foreground/50">404</div>
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h1>
            <p className="text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
          </div>
          <div className="space-y-3">
            <Link href="/">
              <Button className="w-full">Go Home</Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" className="w-full">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
