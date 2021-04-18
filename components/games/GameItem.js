import {
    Card, 
    CardImg,
    CardText,
    CardBody,
    CardTitle,
} from 'reactstrap';
import Rating from "./Rating";

import constants from '../../constants';

const GameItem = props => {

    const getGameImage = () => {
      if(!props.image){
        return null;
      }
      return <CardImg 
        top 
        width="100%" 
        src={`${constants.cdnPath}${props.image}`} 
      />
    }

    return (
      <div className="col-md-4">
        <Card className="mb-3">
          {getGameImage()}
          <CardBody>
            <div className="d-flex align-items-center mb-2">
                <Rating rating={props.rating}/>
                <CardTitle tag="h5" className="ml-3 text-truncate mb-0">{props.title}</CardTitle>
            </div>
            <CardText className="game-description">{props.description}</CardText>
            
          </CardBody>
        </Card>
      </div>
    );
  };
  
export default GameItem;