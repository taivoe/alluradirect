// Google Places
const developmentPlacesKey = 'AIzaSyAY15oigflJTj8IkU-A1d5eCEObUjG3p-Y';
// TODO: confirm this is correct
const livePlacesKey = developmentPlacesKey;

interface Args {
  isLive: boolean;
}

export const getPlacesApiKey = ({ isLive }: Args) => {
  return isLive ? livePlacesKey : developmentPlacesKey;
};
