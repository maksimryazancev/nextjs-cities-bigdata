import Papa from "papaparse";

export default async function fetchCity() {
  const response = await fetch('https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv')
  const text = await response.text()
  const {data} = await Papa.parse(text);

  const citiesId = [];
  data.shift();

  return {
    cities: data.map((element, index) => {
      citiesId.push(index + 1);
      return {
        id: (index + 1),
        name: element[0],
        lat: element[1],
        lng: element[2],
        country: element[3],
        population: element[4]
      }
    }),
    citiesId: [...citiesId],
  }


}




