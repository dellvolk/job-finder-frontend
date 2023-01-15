export interface IApartment {
	id?: any;
	rooms_count: number | string;
	total_space: number | string;
	living_space: number | string;
	kitchen_space: number | string;
	floor: number | string;
	max_floor: number | string;
	wall_material: string;
	room_planning: string;
	home_renovation_type: string;
	address?: string;
	price?: number;
	url?: string;
  image_url?: string
}

export interface IUserRealty {
  id: number,
  price: number
  realty: IApartment
}

export interface IPredict {
  price: string
}

export interface IRealtyEstatesOptions {
  wall_material: string[];
  room_planning: string[];
  home_renovation_type: string[];
}
