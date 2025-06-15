import DepartmentCard from './department-card';
import { Landmark, Bone, Droplets, Baby, Eye } from 'lucide-react';
import AnimatedWrapper from '@/components/shared/animated-wrapper';
import ToothIcon from '@/components/icons/tooth-icon'; // Added this import

const departments = [
  { name: 'Accounting', icon: <Landmark />, description: 'Managing financial health with precision and care.', slug: 'accounting', delay: 'delay-0' },
  { name: 'Dentistry', icon: <ToothIcon />, description: 'Crafting healthy smiles for all ages.', slug: 'dentistry', delay: 'delay-100' },
  { name: 'Orthopedics', icon: <Bone />, description: 'Restoring movement, improving quality of life.', slug: 'orthopedics', delay: 'delay-200' },
  { name: 'Urology', icon: <Droplets />, description: 'Expert care for urinary and reproductive health.', slug: 'urology', delay: 'delay-300' },
  { name: 'Pediatrics', icon: <Baby />, description: 'Nurturing the health of our youngest patients.', slug: 'pediatrics', delay: 'delay-400' },
  { name: 'Ophthalmology', icon: <Eye />, description: 'Clear vision for a brighter tomorrow.', slug: 'ophthalmology', delay: 'delay-500' },
];

const DepartmentDirectory = () => {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4">Our Departments</h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            Explore our specialized departments, each dedicated to providing expert care and advanced treatments tailored to your needs.
          </p>
        </AnimatedWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => (
            <DepartmentCard
              key={dept.slug}
              icon={dept.icon}
              name={dept.name}
              description={dept.description}
              slug={dept.slug}
              animationDelay={dept.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentDirectory;