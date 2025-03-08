
import Rating from '@mui/material/Rating';

interface RatingStarProps {
    value: number;
    onChange: (newValue: number) => void;
    readonly: boolean;
  }

function RatingStar({value=0, onChange, readonly=true}:RatingStarProps) {

  return (
      <Rating 
        name="half-rating" 
        value={value} 
        precision={0.5}  
        onChange={( _event, newValue:number|null) => {
          if(newValue!=null)
          {
              onChange(newValue);
          }
        }} 
        readOnly ={readonly}
      />
  );
}

export default RatingStar;
