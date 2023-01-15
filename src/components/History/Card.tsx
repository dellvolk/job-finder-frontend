import React from "react";
import styled from "styled-components";
import { IUserRealty } from "../../store/user/user.types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BedIcon, FloorIcon, PlanningIcon, RenovationIcon, SpaceIcon, WallIcon } from "../../assets/icons";

const image_plug = "https://w0.peakpx.com/wallpaper/939/963/HD-wallpaper-technology-error-404-not-found-black-white-minimalist.jpg";

interface ICardProps extends IUserRealty {

}

const CardIndex: React.FC<ICardProps> = ({
                                           id,
                                           realty: {
                                             floor,
                                             max_floor,
                                             home_renovation_type,
                                             kitchen_space,
                                             living_space,
                                             room_planning,
                                             rooms_count,
                                             url,
                                             wall_material,
                                             price,
                                             address,
                                             image_url,
                                             total_space
                                           },
                                           price: initial_price
                                         }) => {
  return (
    <div className="col-md-6 col-lg-6 col-sm-6 col-12">
      <CardStyled>
        <CardMedia
          component="img"
          height="140"
          image={image_url || image_plug}
          alt={`${id}_apartment_${address}`}
          style={{ opacity: !!image_url ? 1 : ".5" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" className="mb-0 line-through">
            {price} UAH
          </Typography>
          <Typography gutterBottom variant="h4" component="div" className="mb-0">
            {initial_price} UAH
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-3">{address}</Typography>
          <div className="row">
            <div className="col-6 mb-0">
              <div className="card-options">
                <div>
                  <BedIcon />
                  <Typography variant="body2"
                              color="text.secondary">{`${rooms_count} ${rooms_count === 1 ? "кімната" : "кімнати"}`}</Typography>
                </div>
                <div>
                  <SpaceIcon />
                  <Typography variant="body2"
                              color="text.secondary">{`${total_space} / ${living_space} / ${kitchen_space}`} м<sup>2</sup>
                  </Typography>
                </div>
                <div>
                  <FloorIcon />
                  <Typography variant="body2" color="text.secondary">{`поверх ${floor} з ${max_floor}`}</Typography>
                </div>
              </div>
            </div>
            <div className="col-6 mb-0">
              <div className="card-options">
                <div>
                  <WallIcon />
                  <Typography variant="body2" color="text.secondary">{wall_material}</Typography>
                </div>
                <div>
                  <PlanningIcon />
                  <Typography variant="body2" color="text.secondary">{room_planning}</Typography>
                </div>
                <div>
                  <RenovationIcon />
                  <Typography variant="body2" color="text.secondary">{home_renovation_type}</Typography>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardActions>
          {url && <Button size="small" color="violet" href={url} target="_blank">Детальніше</Button>}
        </CardActions>
      </CardStyled>
    </div>
  );
};

const CardStyled = styled(Card)`
  min-width: 350px;

  img {
    max-height: 200px;
  }

  //.mb-3 {
  //  margin-bottom: 0.875rem !important; 
  //}

  .card-options {
    display: flex;
    flex-direction: column;

    & > div {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    svg {
      margin-right: 12px;
      margin-top: 2.5px;
      flex-shrink: 0;
      //fill: #fff;
    }
  }
`;

export default (CardIndex);
