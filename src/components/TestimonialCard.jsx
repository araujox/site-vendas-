
import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ name, photo, rating, comment, location }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={photo} 
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-card-foreground">{name}</h4>
          {location && <p className="text-sm text-muted-foreground">{location}</p>}
        </div>
      </div>
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-card-foreground leading-relaxed">{comment}</p>
    </div>
  );
};

export default TestimonialCard;
