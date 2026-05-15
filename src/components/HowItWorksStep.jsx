
import React from 'react';

const HowItWorksStep = ({ number, icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-6">
        <div className="text-8xl font-bold text-primary/10 font-accent absolute -top-6 left-1/2 -translate-x-1/2">
          {number}
        </div>
        <div className="relative z-10 inline-flex items-center justify-center w-20 h-20 bg-primary text-primary-foreground rounded-full mt-8">
          <Icon className="h-10 w-10" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed max-w-xs">{description}</p>
    </div>
  );
};

export default HowItWorksStep;
