import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AnimatedWrapper from '@/components/shared/animated-wrapper';

interface DepartmentCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  slug: string;
  animationDelay?: string;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ icon, name, description, slug, animationDelay = 'delay-0' }) => {
  return (
    <AnimatedWrapper delay={animationDelay}>
      <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl border-primary/20 hover:border-primary/40 bg-white">
        <CardHeader className="items-center text-center pt-8">
          <div className="mb-4 text-primary p-3 bg-primary/10 rounded-full inline-block">
            {React.cloneElement(icon as React.ReactElement, { className: "h-10 w-10" })}
          </div>
          <CardTitle className="text-2xl font-semibold text-foreground">{name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between text-center px-6 pb-6">
          <CardDescription className="text-muted-foreground mb-6 text-base">
            {description}
          </CardDescription>
          <Button variant="outline" asChild className="mt-auto border-primary text-primary hover:bg-primary/80 hover:text-white group">
            <Link href={`/departments/${slug}`}>
              Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </AnimatedWrapper>
  );
};

export default DepartmentCard;
