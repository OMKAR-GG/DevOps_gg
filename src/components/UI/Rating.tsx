import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  max?: number;
  size?: number;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 16,
  className = '',
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(max)].map((_, index) => {
        const isFilled = index < Math.floor(value);
        const isHalfFilled = index === Math.floor(value) && value % 1 >= 0.5;
        
        return (
          <div key={index} className="relative">
            <Star
              fill={isFilled || isHalfFilled ? '#FFA500' : 'none'}
              stroke={isFilled || isHalfFilled ? '#FFA500' : '#CBD5E0'}
              strokeWidth={1.5}
              size={size}
              className="mr-0.5"
            />
            {isHalfFilled && (
              <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
                <Star
                  fill="#FFA500"
                  stroke="#FFA500"
                  strokeWidth={1.5}
                  size={size}
                  className="mr-0.5"
                />
              </div>
            )}
          </div>
        );
      })}
      <span className="ml-1 text-sm text-gray-600">{value.toFixed(1)}</span>
    </div>
  );
};

export default Rating;