import Image from 'next/image';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const nonTechnicalGigs = [
  {
    id: 1,
    title: 'Event Planning',
    description: 'Professional event planners to organize and manage your events seamlessly.',
    imageUrl: '/event-planning.png',
  },
  {
    id: 2,
    title: 'Graphic Design',
    description: 'Creative graphic designers to help you with branding and design needs.',
    imageUrl: '/graphics-design.png',
  },
  {
    id: 3,
    title: 'Photography',
    description: 'Experienced photographers to capture your moments beautifully.',
    imageUrl: '/photography.png',
  },
  // Add more gigs as needed
];

const Services = () => {
  const heading = useRef(null);
  const cardRefs = useRef([]); // Array of refs for each card

  useEffect(() => {
    gsap.fromTo(
      heading.current,
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 2,
        scrollTrigger: {
          trigger: heading.current,
          start: 'top 250px',
          end: 'top 250px',
          scrub: 1,
        },
      }
    );

    // Animate each card individually
    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 2,
          delay: index * 0.3, // Add delay for stagger effect
          scrollTrigger: {
            trigger: card,
            start: 'top 300px',
            end: 'top 250px',
            scrub: 1,
          },
        }
      );
    });
  }, []);

  return (
    <section className="py-36 bg-gray-100">
      <div className="max-w-8xl mx-auto px-4">
        <h2 ref={heading} className="text-5xl font-semibold text-center mb-12">Explore Our Non-Technical Services</h2>
        <div className="flex flex-wrap gap-12 justify-center">
          {nonTechnicalGigs.map((gig, index) => (
            <div
              ref={(el) => (cardRefs.current[index] = el)} // Assign unique ref to each card
              key={gig.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden w-full  sm:w-80"
            >
              <Image
                src={gig.imageUrl}
                alt={gig.title}
                width={300}
                height={200}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{gig.title}</h3>
                <p className="text-gray-600">{gig.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
