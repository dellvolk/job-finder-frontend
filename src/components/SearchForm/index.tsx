import React from "react";
import styled from "styled-components";
import {Chip, Divider, TextField} from "@mui/material";
import Input from "../Input";
import useAuth from "../../app/hooks/useAuth";
import useAppDispatch from "../../app/hooks/useAppDispatch";
import {setAuthModalType} from "../../store/auth/auth.slice";

interface ISearchFormProps {

}

const SearchForm = ({}: ISearchFormProps) => {
  const auth = useAuth()
  const dispatch = useAppDispatch()
  const [link, setLink] = React.useState("");
  const [data, setData] = React.useState<any>({
    rooms_count: "",
    total_space: 0,
    living_space: "",
    kitchen_space: "",
    floor: "",
    max_floor: "",
    wall_material: "",
    room_planning: "",
    home_renovation_type: "",
    address: "м. Київ",
    // "url": "string",
    // "image_url": "string"
  });

  const handleSearch = () => {
    // getDataByLink(link);
  };

  const handleChange = (v: string, key: string) => {
    setData(prev => ({ ...prev, [key]: v }));
  };

  console.log(data);

  const handleClick = () => {
    if (!auth) {
      dispatch(setAuthModalType({type: "login"}))
      return void 0;
    }

    const body = {
      ...data,
      total_space: Number(data.living_space!) + Number(data.kitchen_space!),
      rooms_count: Number(data.rooms_count),
      living_space: Number(data.living_space),
      kitchen_space: Number(data.kitchen_space),
      floor: Number(data.floor),
      max_floor: Number(data.max_floor),

    };

  };

  return (
    <SearchFormStyled>
      <Divider textAlign="left">Find at RIELTOR.UA</Divider>
      <div className="scraper-container">
        <p className="mb-3.5">
          You can insert a link to the apartment from the <b><em><a href="https://rieltor.ua/" className="text-blue-300"
                                                             target="_blank">rieltor.ua</a></em></b> website so that the data is
          automatically substituted
        </p>
        <div className="form-search d-flex align-bottom items-end">
          <TextField
            label="URL"
            variant="standard"
            // @ts-ignore
            color="violet"
            value={link}
            onChange={e => setLink(e.target.value)}
            placeholder="https://rieltor.ua/flats-rent/view/10552873/"
            // error={isError}
            // helperText={isError ? "Invalid link" : ""}
          />
          {/*<Button*/}
          {/*  size="small"*/}
          {/*  onClick={handleSearch}*/}
          {/*  // loadingIndicator="Loading…"*/}
          {/*  color="violet"*/}
          {/*  variant="outlined"*/}
          {/*  className="ml-3.5"*/}
          {/*  // disabled={isLoading}*/}
          {/*>*/}
          {/*  /!*{isLoading ? "Searching..." : "Search apartment"}*!/*/}
          {/*</Button>*/}
        </div>
      </div>
      <Divider>
        <Chip label="Settings" />
      </Divider>
      <div className="settings">
        <div className="row">
          <div className="col-12">
            <Input value={data.address!} onChange={v => handleChange(v, "address")} type="text" label="Адреса" disabled />
          </div>
        </div>
        <div className="row">
          {/*<div className="col-4">*/}
          {/*  <Select options={options?.wall_material} onChange={v => handleChange(v, "wall_material")}*/}
          {/*          label="Матеріал стін" value={data.wall_material} />*/}
          {/*</div>*/}
          {/*<div className="col-4">*/}
          {/*  <Select options={options?.room_planning} onChange={v => handleChange(v, "room_planning")}*/}
          {/*          label="Планування" value={data.room_planning} />*/}
          {/*</div>*/}
          {/*<div className="col-4">*/}
          {/*  <Select options={options?.home_renovation_type} onChange={v => handleChange(v, "home_renovation_type")}*/}
          {/*          label="Ремонт" value={data.home_renovation_type} />*/}
          {/*</div>*/}
        </div>
        <div className="row">
          <div className="col-4">
            <Input value={data.rooms_count} onChange={v => handleChange(v, "rooms_count")} label="Rooms count" />
          </div>
          <div className="col-4">
            <Input value={data.kitchen_space} onChange={v => handleChange(v, "kitchen_space")} label="Площа кухні"
                   endAdornment={<>m<sup>2</sup></>} />
          </div>
          <div className="col-4">
            <Input value={data.living_space} onChange={v => handleChange(v, "living_space")} label="Площа кімнат"
                   endAdornment={<>m<sup>2</sup></>} />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <Input value={data.floor} onChange={v => handleChange(v, "floor")} label="Поверх" />
          </div>
          <div className="col-4">
            <Input value={data.max_floor} onChange={v => handleChange(v, "max_floor")} label="Максимальний поверх" />
          </div>
        </div>
        <div className="flex items-center justify-center mt-3.5">
          {/*<Button color="white" variant="contained" disabled={isLoadingPredict} onClick={handleClick}>Визначити ціну</Button>*/}
        </div>
      </div>
      {/*{result && <>*/}
      {/*  <Divider>*/}
      {/*    <Chip label="Result" />*/}
      {/*  </Divider>*/}
      {/*  <div className="flex items-center justify-center p-4">*/}
      {/*    <Typography variant="h2" component="h2" className="text-white text-center font-bold uppercase">{result.price}</Typography>*/}
      {/*  </div>*/}
      {/*</>}*/}
    </SearchFormStyled>
  );
};

const SearchFormStyled = styled.div`
  position: relative;
  //background-color: #2d2d2d;
  background-color: rgba(0, 0, 0, .5);
  //background-color: rgba(45, 45, 45, .8);
  border-radius: 15px;
  padding: 15px 0;
  //border: 1px solid rgba(0, 0, 0, 0.12);
  //box-shadow: inset 0 -1px 0 0 hsl(0deg 0% 100% / 10%);
  backdrop-filter: saturate(180%) blur(5px);
  backface-visibility: hidden;
  z-index: 2;
  
  &::before {
    position: absolute;
    content: "";
    top: 0; left: 0; right: 0; bottom: 0;
    border: 1px solid transparent;
    background-image: linear-gradient(#000,#000),linear-gradient(calc(3.729rad),#f81ce5 0,#7928ca 20%,rgba(121,40,202,0) 80%);
    background-clip: padding-box,border-box;
    background-origin: border-box;
    z-index: -1;
    opacity: .5;
    border-radius: 15px;
  }

  .scraper-container {
    padding: 15px;

    .form-search > .MuiFormControl-root {
      width: 50%;
      margin-right: 15px;
    }
  }

  .settings {
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .MuiFormControl-root {
      width: 100% !important;
    }
  }

  * {
    color: #fff;
  }
`;

export default (SearchForm);
