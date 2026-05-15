
import React from 'react';

const TrustCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/5 rounded-full mb-4">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-card-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default TrustCard;
