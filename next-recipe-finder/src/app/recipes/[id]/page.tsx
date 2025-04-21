import { Suspense } from 'react';
import { notFound } from "next/navigation";
import RecipeDetailsComponent from "@/components/RecipeDetails";
import Container from "@/components/ui/Container";
import BackButton from "@/components/ui/BackButton";
import RecipeDetailSkeleton from '@/components/skeletons/RecipeDetailSkeleton';

// Cache revalidation period (1 minute = 60 seconds)
export const revalidate = 60;

interface RecipeDetailPageProps {
  params: Promise<{ id: string }>;
}

// Server component to fetch and display recipe details
export default async function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const { id } = await params;
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Container>
        <div className="mb-8">
          <BackButton variant="link" className="inline-flex items-center" />
        </div>
        
        <Suspense fallback={<RecipeDetailSkeleton />}>
          <RecipeDetailsComponent id={id} />
        </Suspense>
      </Container>
    </main>
  );
} 